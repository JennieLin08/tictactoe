

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
let savedMoveOne = [];
let savedMoveTwo = [];

let PlayerX = "X";
let playing = false;

initGame()
function initGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  messageStatus.textContent = `Player ${PlayerX} is playing. `;
  playing = true;
  nextbtn.setAttribute("hidden", true);
  prevbtn.setAttribute("hidden", true);

}
function cellClicked() {
  const cellID = this.getAttribute("cellID");
  if (cellArr[cellID] != "" || !playing) {
    return;
  }

  cellUpdate(this, cellID);
  isWinner();
}

function cellUpdate(cell, id) {
  cellArr[id] = PlayerX;
  cell.textContent = PlayerX;
  let getMove = {
    cID: id,
    player: PlayerX
  }
  savedMoveOne.push(getMove);

}

function playerO() {
  PlayerX = (PlayerX == "X") ? "O" : "X";
  messageStatus.textContent = `Player ${PlayerX} is playing. `;

}

function isWinner() {
  let playWin = false;
  for (let i = 0; i < winPattern.length; i++) {
    const win = winPattern[i];

    const x = cellArr[win[0]];
    const y = cellArr[win[1]];
    const z = cellArr[win[2]];

    if (x == "" || y == "" || z == "") {
      continue;
    }
    if (x == y && y == z) {
      playWin = true;
      break;
    }

  }

  if (playWin) {
    messageStatus.textContent = `Player ${PlayerX} Won! `;
    playing = false;
    nextbtn.removeAttribute("hidden");
    prevbtn.removeAttribute("hidden");
  } else if (!cellArr.includes("")) {
    messageStatus.textContent = `Draw! `;
    playing = false;
    nextbtn.removeAttribute("hidden");
    prevbtn.removeAttribute("hidden");
  } else {
    playerO();
  }
}

function restartGame() {
  PlayerX = "X";
  cellArr = ["", "", "",
    "", "", "",
    "", "", ""];
  savedMove = [];
  messageStatus.textContent = `Player ${PlayerX} is playing. `;
  cells.forEach(cell => cell.textContent = "");
  playing = true;
  nextbtn.setAttribute("hidden", true);
  prevbtn.setAttribute("hidden", true);

}


prevbtn.addEventListener('click', prev)
function prev() {

  let getLastMove = savedMoveOne.pop();
  document.querySelector(`[cellID='${getLastMove.cID}']`).textContent = "";
  savedMoveTwo.push(getLastMove);


}

nextbtn.addEventListener('click', next)
function next() {

  if (savedMoveTwo.length > 0) {
    let getLast = savedMoveTwo.pop();
    document.querySelector(`[cellID='${getLast.cID}']`).textContent = `${getLast.player}`;
    savedMoveOne.push(getLast);
  }

}



