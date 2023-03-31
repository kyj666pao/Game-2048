const numSqr = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const sqrEls = document.querySelectorAll(".sqr");
const currentScore = document.querySelector(".current-score");

/*---------------------------- Variables (state) ----------------------------*/
let board, win, failed;
