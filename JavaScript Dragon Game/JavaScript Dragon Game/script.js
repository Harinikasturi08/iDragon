let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('highScoreCont').innerText = "High Score: " + highScore;
});

score = 0;
cross = true;


document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 103 && offsetY < 103) {
        gameOver.innerHTML = "Game Over";
obstacle.classList.remove('obstacleAni');
document.getElementById("restartBtn").style.display = "block";

if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById('highScoreCont').innerText = "High Score: " + highScore;
}

       
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}

function restartGame() {
    score = 0;
    updateScore(score);
    document.querySelector(".obstacle").classList.add("obstacleAni");
    document.querySelector(".dino").style.left = "52px";
    document.querySelector(".gameOver").innerHTML = "Welcome to iDragon Adventures";
    document.getElementById("restartBtn").style.display = "none";
}


