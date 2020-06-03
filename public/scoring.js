var score1 = 0;
var score2 = 0;
var p1 = 0;
var p2 = 0;
var reset = 0;
var bull = 5;

var song = new Audio();
song.src = './media/shot.wav';

//Schot soundeffect
function gunSFX(){
    song.play();
}


function addScore1() {
    score1 = score1 + 1;
    bull++;
    gunSFX();

    //animaties en kogelgaten
    document.getElementById("score1").innerHTML = score1;
    document.getElementById("player1").src="./media/cowboy.gif";
    document.getElementById("bull" + bull).style.opacity = "1";

    //checkt of je gewonnen hebt
    if(score1 >= 5) {
        document.getElementById("score").innerHTML = "RED <br> WINS!";
    }
    p1 = 0;
}

function addScore2() {
    score2 = score2 + 1;
    gunSFX();

    //animaties en kogelgaten
    document.getElementById("score2").innerHTML = score2;
    document.getElementById("player2").src="./media/cowboy.gif";
    document.getElementById("bull" + score2).style.opacity = "1";

    //checkt of je gewonnen hebt
    if(score2 >= 5) {
        document.getElementById("score").innerHTML = "BLUE <br> WINS!";
    }
    p2 = 0;
}

//reset ronde of het hele spel
function resetGame() {
    //reset ronde
    document.getElementById("player1").src="./media/cowboy.png";
    document.getElementById("player2").src="./media/cowboy.png";
    if(score1 >= 5 || score2 >= 5) {
        //reset alles nadat iemand heeft gewonnen
        score1 = 0;
        score2 = 0;
        document.getElementById("score").innerHTML = "<span id='score1'>0</span> <span id='dash'>-</span> <span id='score2''>0</span>";
        document.getElementById("bull1").style.opacity = "0";
        document.getElementById("bull2").style.opacity = "0";
        document.getElementById("bull3").style.opacity = "0";
        document.getElementById("bull4").style.opacity = "0";
        document.getElementById("bull5").style.opacity = "0";
        document.getElementById("bull6").style.opacity = "0";
        document.getElementById("bull7").style.opacity = "0";
        document.getElementById("bull8").style.opacity = "0";
        document.getElementById("bull9").style.opacity = "0";
        document.getElementById("bull10").style.opacity = "0";
    }
    reset = 0;
}


window.onload = function(){
    var socket = io();
    //wanneer speler1 scoort
    socket.on('p1', function(player1){
        p1 = player1;
        if(p1 == 1) {
            addScore1()
        }
    })

    //wanneer speler2 scoort
    socket.on('p2', function(player2){
        p2 = player2;
        if(p2 == 1) {
            addScore2();
        }
    })

    //wanneer er op reset wordt gedrukt
    socket.on('reset', function(gameReset){
        reset = gameReset;
        if(reset == 1) {
            resetGame();
        }
    })
}
