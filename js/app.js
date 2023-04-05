/*-------------------------------- Constants --------------------------------*/
/*---------------------------- Variables (state) ----------------------------*/
let board, win, failed, sizeN, score, topScore, infinityMode;

/*------------------------ Cached Element References ------------------------*/
const sqrEls = document.querySelectorAll(".sqr");
const body = document.querySelector("body");

const curScoreBar = document.querySelector("#score");
const scorePoint = document.querySelector("#score-point");
const topPoint = document.querySelector("#top-score-in-storage");

const restartBtn = document.querySelectorAll(".restart");
const menuBtn = document.querySelector("#menu");
const ruleBtn = document.querySelector(".ruleBtn");
const ruleCloseBtn = document.querySelector(".rule button");
const menuModal = document.querySelector(".menu-modal-container");
const closeMenuBtn = document.querySelectorAll(".menu-modal button");
const lightBtn = document.querySelector("#light");
const rainbowBtn = document.querySelector("#rainbow");

const winModal = document.querySelector(".win-modal-container");
const winModalBtn = document.querySelectorAll(".win-modal-container button");
const infinityBtn = document.querySelector("#infinityMode");

const failedModal = document.querySelector(".failed-modal-container");
const failedModalBtn = document.querySelector(".failed-modal-container button");

const ruleModal = document.querySelector(".rule-modal");
/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener("keydown", handleKeyDown);

restartBtn.forEach((e) => {
  e.addEventListener("click", init);
});

menuBtn.addEventListener("click", () => {
  menuModal.classList.add("show");
});

ruleBtn.addEventListener("click", () => {
  ruleModal.classList.add("show");
});

ruleCloseBtn.addEventListener("click", () => {
  ruleModal.classList.remove("show");
});

closeMenuBtn.forEach((e) => {
  e.addEventListener("click", () => {
    menuModal.classList.remove("show");
  });
});
lightBtn.addEventListener("click", LightDark);
rainbowBtn.addEventListener("click", rainbow);

winModalBtn.forEach((e) => {
  e.addEventListener("click", () => {
    winModal.classList.remove("show");
  });
});

infinityBtn.addEventListener("click", () => {
  infinityMode = true;
});

failedModalBtn.addEventListener("click", () => {
  failedModal.classList.remove("show");
});

/*-------------------------------- Functions --------------------------------*/
init();
function init() {
  sizeN = 4;
  board = [];
  for (let i = 0; i < sizeN * sizeN; i++) {
    board[i] = 0;
  }

  score = 0;
  topScore = localStorage.getItem("top-score");
  if (topScore == null) {
    topScore = 0;
    localStorage.setItem("top-score", topScore);
  }

  curScoreBar.style.width = "0";
  win = false;
  failed = false;
  infinityMode = false;
  scorePoint.innerHTML = "0 : Now";
  topPoint.innerHTML = `Top: ${topScore}`;
  randomGenerate();
  randomGenerate();
  updateBoard();
}

function updateBoard() {
  let allSqr = document.querySelectorAll(".sqr p");
  allSqr.forEach((e) => e.remove());
  sqrEls.forEach((e, idx) => {
    let sqrContent = document.createElement("p");
    let sqrDiv = document.querySelector(`#sq${idx}`);
    board[idx] == 0
      ? ((sqrContent.innerHTML = " "),
        sqrDiv.setAttribute("class", "sqr"),
        sqrDiv.classList.add("num0"),
        e.append(sqrContent))
      : ((sqrContent.innerHTML = board[idx]),
        sqrDiv.setAttribute("class", "sqr"),
        sqrDiv.classList.add(`num${board[idx]}`),
        e.append(sqrContent));
  });
}

function randomGenerate() {
  //  create a list for index of square of blank
  let blankList = [];
  board.forEach((e, idx) => {
    e == 0 ? blankList.push(idx) : "";
  });
  // pick a square randomly to generate the number
  let whereGenerate = blankList[Math.floor(Math.random() * blankList.length)];
  let probability = Math.floor(Math.random() * 10);
  board[whereGenerate] = probability < 9 ? 2 : 4;
}

// -------------------Handle the direction key pressed-------------------
function handleKeyDown(e) {
  let dirOfBoard;
  let boardTemp = board.map((e) => e);

  switch (e.key) {
    case "ArrowLeft":
      dirOfBoard = moveLeft();
      break;
    case "ArrowRight":
      dirOfBoard = moveRight();
      break;
    case "ArrowUp":
      dirOfBoard = moveUp();
      break;
    case "ArrowDown":
      dirOfBoard = moveDown();
      break;
  }

  moveSqr(dirOfBoard);
  mergeSqr(dirOfBoard);
  moveSqr(dirOfBoard);

  board = [];

  switch (e.key) {
    case "ArrowLeft":
      convertBackLeft(dirOfBoard);
      break;
    case "ArrowRight":
      convertBackRight(dirOfBoard);
      break;
    case "ArrowUp":
      convertBackUp(dirOfBoard);
      break;
    case "ArrowDown":
      convertBackDown(dirOfBoard);
      break;
  }

  isWin();

  isFailed(board);
  if (failed) {
    return;
  }

  // --if all the squares are at the edge of direction of key pressed, the function end and won't generate a number ----
  if (arrayEquals(board, boardTemp)) {
    return;
  }

  scorePoint.innerHTML = `${score} : Now`;
  score >= topScore ? (topScore = score) : "";

  topPoint.innerHTML = `Top: ${topScore}`;
  localStorage.setItem("top-score", topScore);
  curScoreBar.style.width = `${((score / topScore) * 100).toFixed(0)}%`;
  randomGenerate();
  updateBoard();
}

// --------reshape the board array to 2D array of key pressed direction---------
//--------------------------left key-----------------------------
function moveLeft() {
  // arr1 is 2d array of array
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < 16; i += 4) {
    for (let j = 0; j < 4; j++) {
      arr2[j] = board[i + j];
    }
    arr1.push(arr2.map((e) => e));
  }
  return arr1;
}

function convertBackLeft(arr1) {
  board = arr1.flatMap((e) => e);
}

//--------------------------right key-----------------------------
function moveRight() {
  let reverseBoard = board.map((e) => e).reverse();
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < 16; i += 4) {
    for (let j = 0; j < 4; j++) {
      arr2[j] = reverseBoard[i + j];
    }
    arr1.push(arr2.map((e) => e));
  }
  return arr1;
}

function convertBackRight(arr1) {
  let reverseBoard = arr1.flatMap((e) => e);
  board = reverseBoard.reverse();
}

//-----------------------------up key--------------------------------
function moveUp() {
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j += 4) {
      arr2[j / 4] = board[i + j];
    }
    arr1.push(arr2.map((e) => e));
  }
  return arr1;
}

function convertBackUp(arr1) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board.push(arr1[j][i]);
    }
  }
}

//-----------------------------down key--------------------------------
function moveDown() {
  let reverseBoard = board.map((e) => e).reverse();
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j += 4) {
      arr2[j / 4] = reverseBoard[i + j];
    }

    arr1.push(arr2.map((e) => e));
  }
  return arr1;
}

function convertBackDown(arr1) {
  for (let i = 4 - 1; i >= 0; i--) {
    for (let j = 4 - 1; j >= 0; j--) {
      board.push(arr1[j][i]);
    }
  }
}

//---------move the square to the direction of key  pressed------------
function moveSqr(arr1) {
  arr1.forEach((row) => {
    for (let idx = row.length; idx >= 0; idx--) {
      row[idx] == 0 ? (row.splice(idx, 1), row.push(0)) : "";
    }
  });
}

function mergeSqr(arr1) {
  arr1.forEach((row) => {
    if (row[0] == row[1] && row[0]) {
      row[0] += row[1];
      row[1] = 0;
      score += row[0];
      if (row[2] == row[3] && row[2]) {
        row[2] += row[3];
        row[3] = 0;
        score += row[2];
      }
    } else if (row[1] == row[2] && row[1]) {
      row[1] += row[2];
      row[2] = 0;
      score += row[1];
      if (sizeN == 5 && row[3] == row[4] && row[3]) {
        row[3] += row[4];
        row[4] = 0;
        score += row[3];
      }
    } else if (row[2] == row[3] && row[2]) {
      row[2] += row[3];
      row[3] = 0;
      score += row[2];
    }
  });
}

function isWin() {
  if (!infinityMode) {
    board.forEach((e) => {
      e == 2048 ? ((win = true), winModal.classList.add("show")) : "";
    });
  }
}

function isFailed(a) {
  for (let i = 0; i < a.length; i++) {
    if (i % sizeN == sizeN - 1) {
      if (a[i] == a[i + sizeN]) {
        return;
      }
    } else {
      if (a[i] == a[i + 1] || a[i] == a[i + sizeN]) {
        return;
      }
    }
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] == 0) {
      return;
    }
  }

  failed = true;
  failedModal.classList.add("show");
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function LightDark() {
  body.className == "light-mode"
    ? body.removeAttribute("class")
    : body.setAttribute("class", "light-mode");
}

function rainbow() {
  body.className == "rainbow-mode"
    ? body.removeAttribute("class")
    : body.setAttribute("class", "rainbow-mode");
}

// ----------------------credit--------------------------
// detecting-the-pressed-arrow-key
// https://www.geeksforgeeks.org/javascript-detecting-the-pressed-arrow-key/

// cerate 2D empty array
// https://code.likeagirl.io/create-an-array-of-empty-arrays-7ec77edea546

// check two array is equal
// https://flexiple.com/javascript/javascript-array-equality/
