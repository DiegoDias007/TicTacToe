"use strict";

const allSquares = document.querySelectorAll(".square");
const playerTurnText = document.querySelector(".player-turn");

let playerTurn = 1;
let symbol = "X";

let playerChoices = {
	1: [],
	2: [],
};

allSquares.forEach((square) => {
  square.addEventListener("click", (e) => {
    const squareClicked = e.target;
    const squareId = squareClicked.getAttribute("id");

    if (squareClicked.textContent === "") {
      
      const currentPlayer = playerTurn

      updateGlobalVariables();
      updatePlayerHashMap(squareId);
      changeText(squareClicked);

      if (isGameOver(playerChoices) || isGameTied()) {
        alert(`Player ${currentPlayer} wins!`);
        restartGame();
      }
    
    } else {
      alert("You cannot click on this square.");
    }
  });
});

function updateGlobalVariables() {
  symbol = playerTurn === 1 ? "X" : "O";
  playerTurn = playerTurn === 1 ? 2 : 1;
}

function changeText(square) {
	playerTurnText.textContent = `Player ${playerTurn} Turn!`;
	square.textContent = symbol;
  if (symbol === "X") {
    square.style.color = "#fff"
  } else {
    square.style.color = "#547059"
  }
}

function updatePlayerHashMap(squareId) {
	const x = squareId % 3;
	const y = Math.floor(squareId / 3);
	playerChoices[playerTurn].push([x, y]);
}

function isGameOver(playerChoices) {
	const winningCombinations = [
		[
			[0, 0],
			[0, 1],
			[0, 2],
		],
		[
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[2, 0],
			[2, 1],
			[2, 2],
		],
		[
			[0, 0],
			[1, 0],
			[2, 0],
		],
		[
			[0, 1],
			[1, 1],
			[2, 1],
		],
		[
			[0, 2],
			[1, 2],
			[2, 2],
		],
		[
			[0, 0],
			[1, 1],
			[2, 2],
		],
		[
			[0, 2],
			[1, 1],
			[2, 0],
		],
	];

	for (const combination of winningCombinations) {
		if (isWinningCombination(playerChoices[playerTurn], combination)) {
			return true;
		}
	}

	return false;
}

function isGameTied() {
  const count = playerChoices[1].length + playerChoices[2].length
  if (count === 9) {
    restartGame()
    alert("It's a tie! Restarting the Game.")
  }
}

function isWinningCombination(playerMoves, combination) {
	return combination.every((coord) =>
		playerMoves.some((move) => areCoordinatesEqual(move, coord))
	);
}

function areCoordinatesEqual(coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function restartGame() {
  playerTurn = 1;
  symbol = "X";

  allSquares.forEach((square) => {
    square.textContent = "";
  });

  playerChoices = {
    1: [],
    2: [],
  };

  playerTurnText.textContent = `Player ${playerTurn} Turn!`;
}