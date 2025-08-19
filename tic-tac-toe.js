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
                return true;
            }
        }
    }

    const printBoard = () => {
        console.log(allValues());
    }

    const markBoard = (row, column, player) => {
        const spot = board[row][column];
        if (spot.getValue() === 0) {
            spot.addMark(player);
        } else {
            return;
        }
    }

    const getBoard = () => board;

    return { checkForWinner, printBoard, getBoard, markBoard };
}

//function for each spot in the tic tac toe board
function Mark() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addMark, getValue };
}

function Gamecontroller(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const players = [
        {
            name: playerOneName,
            mark: 1
        },
        {
            name: playerTwoName,
            mark: 2
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

        if (game.checkForWinner()) {
            console.log(`${getActivePlayer().name} wins!`);
            game.printBoard();
            return;
        }

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { playRound };
}

function Screencontroller() {
    // todo
}

const game = Gamecontroller();
game.playRound(1,1);
game.playRound(2,1);
game.playRound(0,0);
game.playRound(2,0);
game.playRound(2,2);