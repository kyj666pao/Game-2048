console.log("Hello World");
/*-------------------------------- Constants --------------------------------*/
const numSqr = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const sqrEls = document.querySelectorAll(".sqr");
const currentScore = document.querySelector(".current-score");
const body = document.querySelector("body");
/*---------------------------- Variables (state) ----------------------------*/
let board, win, failed;

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener("keydown", handleKeyDown);

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  let allSqr = document.querySelectorAll(".sqr p");
  allSqr.forEach((e) => e.remove());
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  win = false;
  failed = false;
  updateBoard();
}

function updateBoard() {
  sqrEls.forEach((e, idx) => {
    let sqr = document.createElement("p");
    board[idx] == 0
      ? ((sqr.innerHTML = " "), e.append(sqr))
      : ((sqr.innerHTML = board[idx]), e.append(sqr));
  });
}

function handleKeyDown(e) {
  //   if (e.key === "ArrowUp") {
  //     console.log("Up Key pressed!");
  //   }
  //   if (e.key === "ArrowDown") {
  //     console.log("Down Key pressed!");
  //   }
  //   if (e.key === "ArrowLeft") {
  //     console.log("Left Key pressed!");
  //   }
  //   if (e.key === "ArrowRight") {
  //     console.log("Right Key pressed!");
  //   }

  switch (e.key) {
    case "ArrowLeft":
      console.log("Left Key pressed!");
      break;
    case "ArrowRight":
      console.log("Right Key pressed!");
      break;
    case "ArrowUp":
      console.log("Up Key pressed!");
      break;
    case "ArrowDown":
      console.log("Down Key pressed!");
      break;
  }
}
// credit: detecting-the-pressed-arrow-key
// https://www.geeksforgeeks.org/javascript-detecting-the-pressed-arrow-key/
