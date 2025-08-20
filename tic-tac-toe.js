function Gameboard() {
    const rows = 3;
    const columns = 3;
    board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Mark());
        }
    }

    const allValues = () => board.map(rows => rows.map(mark => mark.getValue()));

    const checkForWinner = () => {
        const all = allValues();
        // put all values together to find winning combos
        const concatArray = all[0].concat(all[1], all[2]);

        const winningCombos = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal from top-left
            [2, 4, 6]  // diagonal from top-right
        ];

        for (const [a,b,c] of winningCombos) {
            if (concatArray[a] &&
                concatArray[a] === concatArray[b] &&
                concatArray[b] === concatArray[c] 
            ) {
                return 1;
            } else if (!(concatArray.includes(''))) {
                return 2;
            }
        }
    }


    const printBoard = () => {
        console.log(allValues());
    }

    const markBoard = (row, column, player) => {
        const spot = board[row][column];
        if (spot.getValue() === "") {
            spot.addMark(player);
        } else {
            markBoard(row, column, player);
        }
    }

    const getBoard = () => board;

    return { checkForWinner, printBoard, getBoard, markBoard };
}

//function for each spot in the tic tac toe board
function Mark() {
    let value = "";

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addMark, getValue };
}

// controls the game
function Gamecontroller(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const players = [
        {
            name: playerOneName,
            mark: "O"
        },
        {
            name: playerTwoName,
            mark: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    //log player's moves
    const game = Gameboard();

    const printNewRound = () => {
        game.printBoard();
        console.log(`It's ${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        game.markBoard(row, column, getActivePlayer().mark);

        if (game.checkForWinner() === 1) {
            alert(`${getActivePlayer().name} wins!`);
            game.printBoard();
            return;
        } else if (game.checkForWinner() === 2) {
            alert('Game ends in a tie!')
            return;
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    };
    

    printNewRound();

    return { playRound, getBoard: game.getBoard, getActivePlayer };
}

// controls the game from DOM
function Screencontroller() {
    const game = Gamecontroller();
    const playerTurnHeader = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();

        playerTurnHeader.textContent = `${game.getActivePlayer().name}'s turn`;
        
        board.forEach((row, rowIndex) => row.forEach((mark, colIndex) => {
            const markButton = document.createElement('button');
            markButton.classList.add('mark');
            markButton.textContent = mark.getValue();
            boardDiv.appendChild(markButton);

            markButton.addEventListener('click', (e) => {
                game.playRound(rowIndex, colIndex);
                updateScreen();
            });
        }));
    };

    updateScreen();

}

Screencontroller();