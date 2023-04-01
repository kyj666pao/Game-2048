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
  randomGenerate();
  randomGenerate();
  updateBoard();
}

function updateBoard() {
  sqrEls.forEach((e, idx) => {
    let sqrContent = document.createElement("p");
    board[idx] == 0
      ? ((sqrContent.innerHTML = " "), e.append(sqrContent))
      : ((sqrContent.innerHTML = board[idx]), e.append(sqrContent));
  });
}

function randomGenerate() {
  //   console.log(board);
  //  create a list for index of square of blank
  let blankList = [];
  board.forEach((e, idx) => {
    e == 0 ? blankList.push(idx) : "";
  });
  //   console.log(blankList);
  // pick a square randomly to generate the number
  let whereGenerate = blankList[Math.floor(Math.random() * blankList.length)];
  //   console.log(`whereGenerate: ${whereGenerate}`);

  let probability = Math.floor(Math.random() * 10);
  //   console.log(`probability: ${probability}`);

  board[whereGenerate] = probability < 9 ? 2 : 4;

  //   let sqrContent = document.createElement("p");
  //   Num = probability < 9 ? 2 : 4;
  //   console.log(Num);
  //   sqrContent.innerHTML = Num;
  //   let sqr = document.querySelector(`#sq${whereGenerate}`);
  //   sqr.append(sqrContent);
  //   console.log(board);
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
