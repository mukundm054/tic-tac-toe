const cells = document.querySelectorAll(".grid-cell");
const btn = document.getElementById("btn");

let currentPlayer = "X";
let gameOver = false;

const winnerPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
];

function checkWinner() {
  for (let pattern of winnerPattern) {
    const [a, b, c] = pattern;

    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      // Highlight winning cells
      cells[a].style.background = "green";
      cells[b].style.background = "green";
      cells[c].style.background = "green";

      setTimeout(() => {
        alert(`Player ${cells[a].innerText} wins!`);
      }, 100);

      gameOver = true;
      return true;
    }
  }
  return false;
}

function checkDraw() {
  let allFilled = [...cells].every(cell => cell.innerText !== "");

  if (allFilled && !gameOver) {
    setTimeout(() => {
      alert("Game is a Draw!");
    }, 100);
    gameOver = true;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "" || gameOver) return;

    cell.innerText = currentPlayer;

    if (!checkWinner()) {
      checkDraw();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

btn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.background = "lightslategray";
  });

  currentPlayer = "X";
  gameOver = false;
});