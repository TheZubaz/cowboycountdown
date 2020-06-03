const five = require("johnny-five");
const board = new five.Board();
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile('index.html');
});
  
//checkt if arduino aangesloten is
board.on("ready", () => {
	io.on('connection', function(socket){
	
	var player1 = 0; //pin2
	var player2 = 0; //pin4
	var readyShoot = 0;

	//Lampjes laten zien of je wint of verliest
	const p1dead = new five.Led(13);
	const p1alive = new five.Led(12);
	const p2dead = new five.Led(5);
	const p2alive = new five.Led(6);
	
	const shootsignal = new five.Led(8);
	
	var buttons = new five.Buttons({
    pins: [2,4,7],
	invert: true
  });
  
  // Als je op pin7 drukt(reset) dan start het spel
  buttons.on("press", function(button) {
	  if(button.pin == 7)
	  {
		   	player1 = 0;
			player2 = 0;
			p1dead.off();
			p1alive.off();
			p2dead.off();
			p2alive.off();
			readyShoot = 0;
			shootsignal.off();
			socket.emit('reset', 1);
			console.log("Pressed: ", button.pin);

			//random interval die bepaald hoelang het duurt voordat het piepje komt
			myVar = setInterval(function() {
				readyShoot = 1;
				shootsignal.on();
				clearInterval(myVar);
			}, (((Math.random()+1) * 11)*150))
					return;
			}
			if(readyShoot == 0 )
			{
				
				return;
			}
			if(player1 == 0 && player2 == 0)
			{
				//speler2 drukt eerst(win) 
				if(button.pin == 2) 
				{
					player1 = 1;
					console.log("player1 shoots");
					p1alive.on();
					p2dead.on();
					shootsignal.off();
					socket.emit('p1', 1);
				//speler2 drukt eerst(win) 
				}else{ 
					console.log("player2 shoots");
					player2 = 1;
					p1dead.on();
					p2alive.on();
					shootsignal.off();
					socket.emit('p2', 1);
					
				}
			}else{
				//do nothing
				console.log("Pressed: ", button.pin);
			}
			
		});
	});
});

//webserver draait op pport 8080
http.listen(8080, function(){
	console.log('listening on *:8080');
  });
