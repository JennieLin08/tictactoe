

const cells = document.querySelectorAll(".cell");
const messageStatus = document.querySelector(".messageStatus");
const restartBtn = document.getElementById("restartBtn");
const nextbtn = document.getElementById("nextbtn");
const prevbtn = document.getElementById("prevbtn");


const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let cellArr = ["", "", "", "", "", "", "", "", ""];
// board = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ]


let savedMoveOne = [];
let savedMoveTwo = [];
let PlayerX = "X";
let inGame = false;



initBoard();
function initBoard() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  messageStatus.textContent = `Start Player ${PlayerX}. `;
  nextbtn.setAttribute("hidden", true);
  prevbtn.setAttribute("hidden", true);
  inGame = true;
}

function cellClicked() {
  const cellID = this.getAttribute("cellID");
  if (cellArr[cellID] != "" || !inGame) {
    return;
  }

  cellArr[cellID] = PlayerX;
  this.textContent = PlayerX;

  let getMove = {
    cID: cellID,
    player: PlayerX
  }
  savedMoveOne.push(getMove);
  // console.log(savedMoveOne);
  isWinner();

}


function PlayerChange() {
  PlayerX = (PlayerX == "X") ? "O" : "X";
  messageStatus.textContent = `Player ${PlayerX} is playing. `;
}

function isWinner() {
  let gameWin = false;

  for (i = 0; i < winPattern.length; i++) {

    let x = cellArr[winPattern[i][0]];
    let y = cellArr[winPattern[i][1]];
    let z = cellArr[winPattern[i][2]];
    // console.log(x, y, z, PlayerX);

    if (x == PlayerX && y == PlayerX && z == PlayerX) {
      gameWin = true;
      break;
    }
  }

  if (gameWin) {
    messageStatus.textContent = `Player ${PlayerX} Wins! `;
    nextbtn.removeAttribute("hidden");
    prevbtn.removeAttribute("hidden");
    nextbtn.style.background = "gray";
    nextbtn.setAttribute("disabled", "true");
    inGame = false;

  } else if (!cellArr.includes("")) {
    messageStatus.textContent = `Draw! `;
    nextbtn.removeAttribute("hidden");
    prevbtn.removeAttribute("hidden");
    nextbtn.style.background = "gray";
    nextbtn.setAttribute("disabled", "true");
    inGame = false;
  } else {
    PlayerChange();
  }
}

restartBtn.addEventListener('click', restartGame);
function restartGame() {
  PlayerX = "X";
  cellArr = ["", "", "",
    "", "", "",
    "", "", ""];
  savedMove = [];
  messageStatus.textContent = `Please start Player ${PlayerX}. `;
  cells.forEach(cell => cell.textContent = "");
  inGame = true;
  nextbtn.setAttribute("hidden", true);
  prevbtn.setAttribute("hidden", true);

}

prevbtn.addEventListener('click', prev)
function prev() {
  if (!savedMoveOne.length) {
    console.log(savedMoveOne.length);
    prevbtn.setAttribute("disabled", "true");
    prevbtn.style.background = "gray";
  } else {
    nextbtn.removeAttribute("disabled");
    nextbtn.style.background = "black";
    let getLastMove = savedMoveOne.pop();
    document.querySelector(`[cellID='${getLastMove.cID}']`).textContent = "";
    savedMoveTwo.push(getLastMove);
  }

}

nextbtn.addEventListener('click', next)
function next() {

  if (savedMoveTwo.length) {
    prevbtn.removeAttribute("disabled");
    prevbtn.style.background = "black";
    let getLast = savedMoveTwo.pop();
    document.querySelector(`[cellID='${getLast.cID}']`).textContent = `${getLast.player}`;
    savedMoveOne.push(getLast);
  } else {
    console.log(savedMoveTwo.length)
    nextbtn.setAttribute("disabled", "true");
    nextbtn.style.background = "gray";
  }

}