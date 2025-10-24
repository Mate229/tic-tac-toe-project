let isCellChoosen = false;

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
            isCellChoosen = true;
            return;
        } else {
            board[row][column] = mark;
            isCellChoosen = false;
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
    let score = 0;

    return {getPlayerName, getPlayerMark, score};
};

// GameFlow Module
function GameFlow() {

    // Set a new game;
    const newGame = Gameboard();

    // Create the two players for the game;
    const playerOne = createPlayer(prompt("Enter first player name: "), "O");
    const playerTwo = createPlayer(prompt("Enter second player name: "), "X");

    // This function will allow me to get the cell in which each player want to draw his mark;
    // function getPlayerCell(player) {
    //     const row = prompt(`${player}, choose your cell row: `);
    //     const col = prompt(`${player}, choose your cell column: `);

    //     return {player, row, col}
    // };

    // I declare this variable to kepp track of the active player(to know which player's turn it's);
    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    // This function will change the active player after each round;
    function switchPlayerTurn() {
        if (activePlayer === playerOne) {
            return activePlayer = playerTwo;
        } else {
            return activePlayer = playerOne;
        }
    };

    // The gameround here;
    function playRound(row, col) {

        // We're playing in the console for now, so i need to let each player knows his turn;
        // alert(`It's ${activePlayer.getPlayerName()}'s turn`);

        // Active player choose his cell;
        // const playerCell = getPlayerCell(activePlayer.getPlayerName());

        // The gameboard is updated with the player's choice;
        newGame.setMark(row, col, activePlayer.getPlayerMark());

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
            alert(`Game Over! ${activePlayer.getPlayerName()} wins`);
            activePlayer.score++;
            newGame.resetBoard();
        } else if (newGame.getBoard().flat().every((item) => item !== "") ) {
            // the flat() function here will make the board to one big array ( each row of the board will turn to 3 items inside the big board);
            alert(`Game Over! It's a draw`);
            newGame.resetBoard();
        } else {
            if (isCellChoosen === true) {
                return;
            } else {
                switchPlayerTurn();
            }
        };
    };

    // playRound(); // First round is starting here...

    return {
        playRound,
        getBoard: newGame.getBoard,
        getActivePlayer,
        playerOne,
        playerTwo
    };
};

// const game = GameFlow();

// const container = document.querySelector("#container");

// for (let i = 0; i < 9; i++) {
//         const square = document.createElement("div");
//         container.appendChild(square);
//     };

function DisplayGame() {
    // Initialize the game
    const game = GameFlow();

    const container = document.querySelector("#container");

    function updateScreen() {
        container.innerHTML = ""; // Cleans the container before reprinting the board;

        const board = game.getBoard(); // Get board state of the game;

        const activePlayer = game.getActivePlayer(); // Calls the active player to come

        const status = document.querySelector("#status");
        status.textContent = `${activePlayer.getPlayerName()}'s turn`; // Tells the active player it's his turn to play..

        const scoreOne = document.querySelector("#score-one");
        scoreOne.textContent = `${game.playerOne.getPlayerName()}: ${game.playerOne.score}`

        const scoreTwo = document.querySelector("#score-two");
        scoreTwo.textContent = `${game.playerTwo.getPlayerName()}: ${game.playerTwo.score}`

        

        // Draw the board as it's presently on the display..
        for (let row of board) {
            for (let i = 0; i < row.length; i++) {
                const square = document.createElement("div");

                // These two attributes are set on each div to know their exact position in the board;
                // They will be used to call the playround function as param, so the plaround will know
                // which cell each player is chosing; 
                square.setAttribute("board-row", board.indexOf(row));
                square.setAttribute("board-col", i);
                square.classList.add("square");

                square.textContent = row[i]; // Update cell on screen with player sign.

                // The magic happens here. The listener is attached before appending the square
                // to its parent, in order to keep th event after an sreenupdate.
                square.addEventListener("click", () => {
                    const row = square.getAttribute("board-row");
                    const col = square.getAttribute("board-col");

                    game.playRound(row, col);
                    updateScreen();
                });

                container.appendChild(square);
            }
        };
    };


    // const cells = document.querySelectorAll(".square");
    // cells.forEach(cell => {
    //     cell.addEventListener("click", () => {
    //         const row = cell.getAttribute("board-row");
    //         const col = cell.getAttribute("board-col");

    //         game.playRound(row, col);
    //         updateScreen();
    //     });
    // });

    updateScreen(); // The game starts here now..
}

const startGame = document.querySelector(".start");
startGame.addEventListener("click", DisplayGame);
