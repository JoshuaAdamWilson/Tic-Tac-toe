

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerXSelections = [];
let playerOSelections = [];
let matches = 0;
let xPlayer = 0;
let oPlayer = 0;
const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];


const handleClick = function (event) {
    const cell = event.target;
    cell.innerHTML = currentPlayer;
    if (currentPlayer === 'X') {
        playerSelections = playerXSelections;
        nextPlayer = 'O';
    } else {
        playerSelections = playerOSelections;
        nextPlayer = 'X';
    }
    playerSelections.push(Number(cell.id));
    if (checkWinner(playerSelections)) {
        alert('Player ' + currentPlayer + ' wins!');
        resetGame();
    }
    if (checkDraw()) {
        alert('Draw!');
        resetGame();
    }
    // Swap players
    currentPlayer = nextPlayer;
}

const cells = document.querySelectorAll('td');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

function checkWinner(player) {
    for (let i of winningCombinations) {
        let win = i.every(val => player.indexOf(val) !== -1)
        if (win) {
            matches++
            if (currentPlayer === 'X') {
                xPlayer++
            } else {
                oPlayer++
            }
            resetGame()
        }
        if (matches === 3) {
            matches = 0
            if (xPlayer > oPlayer) {
                currentPlayer = "X"
            } else {
                currentPlayer = "O"
            }
            xPlayer = 0
            oPlayer = 0
            return true
        }
    }

}

function checkDraw() {
    return (playerOSelections.length + playerXSelections.length) >= cells.length;
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    let divMatch = document.getElementById("matches")
    divMatch.innerHTML = "<h1>Matches: " + matches + "<br>X-Player: " + xPlayer + "<br>O-Player: " + oPlayer + "</h1>";
    document.body.appendChild(divMatch)
}

