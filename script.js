// Gameboard module;
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Draw a 2D array with empty cell;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "";
        };
    };

    // Check board state;
    const getBoard = () => board;

    // Print choices on the board;
    function setMark(row, column, mark) {

        if (board[row][column] !== "") {
            return;
        } else {
            board[row][column] = mark;
        };
    };

    function resetBoard() {
        for (let row of board) {
            for (let i = 0; i < row.length; i++) {
                row[i] = ""
            };
        };
    }


    return {getBoard, setMark, resetBoard};
};

// Player Module
function createPlayer(name, mark) {
    const getPlayerName = () => name;
    const getPlayerMark = () => mark;

    return {getPlayerName, getPlayerMark};
};

// GameFlow Module
function GameFlow() {

    // Set a new game;
    const newGame = Gameboard();

    // Create the two players for the game;
    const playerOne = createPlayer("playerOne", "O");
    const playerTwo = createPlayer("playerTwo", "X");

    // This function will allow me to get the cell in which each player want to draw his mark;
    function getPlayerCell(player) {
        const row = prompt(`${player}, choose your cell row: `);
        const col = prompt(`${player}, choose your cell column: `);

        return {player, row, col}
    };

    // I declare this variable to kepp track of the active player(to know which player's turn it's);
    let activePlayer = playerOne;

    // This function will change the active player after each round;
    function switchPlayerTurn() {
        if (activePlayer === playerOne) {
            return activePlayer = playerTwo;
        } else {
            return activePlayer = playerOne;
        }
    };

    // The gameround here;
    function playRound() {

        // We're playing in the console for now, so i need to let each player knows his turn;
        alert(`It's ${activePlayer.getPlayerName()}'s turn`);

        // Active player choose his cell;
        const playerCell = getPlayerCell(activePlayer.getPlayerName());

        // The gameboard is updated with the player's choice;
        newGame.setMark(playerCell.row, playerCell.col, activePlayer.getPlayerMark());

        checkWinner();
    };

    function checkWinner() {
        if (
            // Rows win Conditions
            newGame.getBoard()[0].every((item) => item === newGame.getBoard()[0][0] && item !== "") ||
            newGame.getBoard()[1].every((item) => item === newGame.getBoard()[1][0] && item !== "") ||
            newGame.getBoard()[2].every((item) => item === newGame.getBoard()[2][0] && item !== "") ||

            // Columns win Conditions
            ((newGame.getBoard()[0][0] !== "") && (newGame.getBoard()[0][0] === newGame.getBoard()[1][0]) && (newGame.getBoard()[0][0] === newGame.getBoard()[2][0])) ||
            ((newGame.getBoard()[0][1] !== "") && (newGame.getBoard()[0][1] === newGame.getBoard()[1][1]) && (newGame.getBoard()[0][1] === newGame.getBoard()[2][1])) ||
            ((newGame.getBoard()[0][2] !== "") && (newGame.getBoard()[0][2] === newGame.getBoard()[1][2]) && (newGame.getBoard()[0][2] === newGame.getBoard()[2][2])) ||

            // Diagonal win conditions
            ((newGame.getBoard()[0][0] !== "") && (newGame.getBoard()[0][0] === newGame.getBoard()[1][1]) && (newGame.getBoard()[0][0] === newGame.getBoard()[2][2])) ||
            ((newGame.getBoard()[0][2] !== "") && (newGame.getBoard()[0][2] === newGame.getBoard()[1][1]) && (newGame.getBoard()[0][2] === newGame.getBoard()[2][2]))
        ) {
            console.log(`Game Over! ${activePlayer.getPlayerName()} wins`);
            newGame.resetBoard();
        } else if (newGame.getBoard().flat().every((item) => item !== "") ) {
            // the flat() function here will make the board to one big array ( each row of the board will turn to 3 items inside the big board);
            console.log(`Game Over! It's a draw`);
            newGame.resetBoard();
        } else {
            switchPlayerTurn();
            playRound();
        };
    };

    playRound(); // First round is starting here...
};

const game = GameFlow();
