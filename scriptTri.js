

const cells = document.querySelectorAll(".cell");
const messageStatus = document.querySelector(".messageStatus");
const restartBtn = document.getElementById("restartBtn");
const nextbtn = document.getElementById("nextbtn");
const prevbtn = document.getElementById("prevbtn");

let cellArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]



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
  for (i = 0; i < cellArr.length; i++) {
    for (x = 0; x < 3; x++) {
      if (cellArr[i][x] == cellID) {
        if (isNaN(cellArr[i][x]) || !inGame) {
          return;
        }

        cellArr[i][x] = PlayerX;
        this.textContent = PlayerX

        let getMove = {
          cID: cellID,
          player: PlayerX
        }
        savedMoveOne.push(getMove);

        isWinner();
        // console.log(cellArr)
        // console.log(savedMoveOne);
      }

    }
  }


}


function PlayerChange() {
  PlayerX = (PlayerX == "X") ? "O" : "X";
  messageStatus.textContent = `Player ${PlayerX} is playing. `;
}

function isWinner() {
  let gameWin = false;


  // Check rows
  for (let row = 0; row < 3; row++) {
    if (cellArr[row][0] === PlayerX && cellArr[row][1] === PlayerX && cellArr[row][2] === PlayerX) {
      gameWin = true;
      if (row == 0) {
        cells[0].style.background = "rgba(240,178,57,.3)";
        cells[1].style.background = "rgba(240,178,57,.3)";
        cells[2].style.background = "rgba(240,178,57,.3)";
      }
      if (row == 1) {
        cells[3].style.background = "rgba(240,178,57,.3)";
        cells[4].style.background = "rgba(240,178,57,.3)";
        cells[5].style.background = "rgba(240,178,57,.3)";
      }

      if (row == 2) {
        cells[6].style.background = "rgba(240,178,57,.3)";
        cells[7].style.background = "rgba(240,178,57,.3)";
        cells[8].style.background = "rgba(240,178,57,.3)";
      }
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (cellArr[0][col] === PlayerX && cellArr[1][col] === PlayerX && cellArr[2][col] === PlayerX) {
      gameWin = true;
      if (col == 0) {
        cells[0].style.background = "rgba(240,178,57,.3)";
        cells[3].style.background = "rgba(240,178,57,.3)";
        cells[6].style.background = "rgba(240,178,57,.3)";
      }
      if (col == 1) {
        cells[1].style.background = "rgba(240,178,57,.3)";
        cells[4].style.background = "rgba(240,178,57,.3)";
        cells[7].style.background = "rgba(240,178,57,.3)";
      }
      if (col == 2) {
        cells[2].style.background = "rgba(240,178,57,.3)";
        cells[5].style.background = "rgba(240,178,57,.3)";
        cells[8].style.background = "rgba(240,178,57,.3)";
      }
    }
  }

  // Check diagonals
  if (
    (cellArr[0][0] === PlayerX && cellArr[1][1] === PlayerX && cellArr[2][2] === PlayerX)
  ) {
    gameWin = true;
    cells[0].style.background = "rgba(240,178,57,.3)";
    cells[4].style.background = "rgba(240,178,57,.3)";
    cells[8].style.background = "rgba(240,178,57,.3)";
  }

  if (

    (cellArr[0][2] === PlayerX && cellArr[1][1] === PlayerX && cellArr[2][0] === PlayerX)
  ) {
    gameWin = true;
    cells[2].style.background = "rgba(240,178,57,.3)";
    cells[4].style.background = "rgba(240,178,57,.3)";
    cells[6].style.background = "rgba(240,178,57,.3)";
  }



  if (gameWin) {
    messageStatus.textContent = `Player ${PlayerX} Wins! `;
    nextbtn.removeAttribute("hidden");
    prevbtn.removeAttribute("hidden");
    nextbtn.style.background = "gray";
    nextbtn.setAttribute("disabled", "true");
    inGame = false;

  } else if (!(/\d/.test(cellArr[0])) && !(/\d/.test(cellArr[1])) && !(/\d/.test(cellArr[2]))) {

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
  // window.location.reload()
  PlayerX = "X";
  cellArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]
  savedMoveOne = [];
  savedMoveTwo = [];

  cells[0].style.background = "none";
  cells[1].style.background = "none";
  cells[2].style.background = "none";
  cells[3].style.background = "none";
  cells[4].style.background = "none";
  cells[5].style.background = "none";
  cells[6].style.background = "none";
  cells[7].style.background = "none";
  cells[8].style.background = "none";


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
    nextbtn.style.background = "#192a32";
    let getLastMove = savedMoveOne.pop();
    document.querySelector(`[cellID='${getLastMove.cID}']`).textContent = "";
    savedMoveTwo.push(getLastMove);
  }

}

nextbtn.addEventListener('click', next)
function next() {

  if (savedMoveTwo.length) {
    prevbtn.removeAttribute("disabled");
    prevbtn.style.background = "#192a32";
    let getLast = savedMoveTwo.pop();
    document.querySelector(`[cellID='${getLast.cID}']`).textContent = `${getLast.player}`;
    savedMoveOne.push(getLast);
  } else {
    console.log(savedMoveTwo.length)
    nextbtn.setAttribute("disabled", "true");
    nextbtn.style.background = "gray";
  }

}