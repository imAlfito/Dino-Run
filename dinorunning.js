const char = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const road = document.getElementById("road");
const palyerscore = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const box = document.querySelector(".box");

let score = 0;
let interval = null;
let gameStarted = false;

let jumlascore = () => {
  score++;
  palyerscore.innerHTML = `Score : ${score}`;
};

let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.innerHTML = `High Score: ${highScore}`;

function startGame() {
  document.body.classList.add("running");
  score = 0;
  interval = setInterval(jumlascore, 100);
  gameStarted = true;
}

function jump() {
  if (!char.classList.contains("animate")) {
    char.classList.add("animate");
  }
  setTimeout(function () {
    char.classList.remove("animate");
  }, 500);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!gameStarted) {
      startGame();
    }
    jump();
  }
});

const ifHitCactus = setInterval(function () {
  const charTop = parseInt(
    window.getComputedStyle(char).getPropertyValue("top")
  );

  const cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  if (cactusLeft < 90 && cactusLeft > 0 && charTop >= 60) {
    document.body.classList.remove("running");
    clearInterval(interval);

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.innerHTML = `High Score: ${highScore}`;
    }

    if (confirm("You Lose, play again?")) {
      startGame();
    } else {
      window.location.reload();
    }
  }
}, 10);
