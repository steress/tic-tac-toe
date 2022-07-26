const buttons = document.querySelectorAll(".click");
const restartBtn = document.querySelector(".restart");
const message = document.querySelector("span");

const playerFactory = (name, symbol) => {
    
    return {name, symbol};
};

const gameBoard = (() => {

    let board = ["","","","","","","","",""];

    const getBoard = () => {
        return board
    };

    const resetBoard = () => {
        board = [];
        board.push("","","","","","","","","")
        return board;
    };
    
    const renderBoard = () => {
        board.splice(position, 1, activePlayer.symbol);
        buttons[position].innerText = (`${board[position]}`);
        _colorSymbol();
    };

    const _colorSymbol = () => {
        activePlayer.symbol == "x" ? buttons[position].classList.add("x") : buttons[position].classList.add("O")
    };

    return {getBoard, resetBoard, renderBoard};

})();


const game = (() => {
    const player1 = playerFactory("player1", "x");
    const player2 = playerFactory("player2", "o");

    let round = 0;
    
    let board = gameBoard.getBoard();

    function _handleClick(e) {
            round ++;
            position = e.target.id -1;
            _switchPlayer();
            gameBoard.renderBoard();
            _playerTurn();
            _winning();    
        };
    
    const _winning = () => {
        i = board.map((e, i) => e === 'x' ? i : []);
        q = board.map((e, q) => e === 'o' ? q : []);
        
        winX = winConditions.filter(a => a.reduce((r, x) => r + i.includes(x), 0)==3);
        winO = winConditions.filter(a => a.reduce((r, o) => r + q.includes(o), 0)==3);

        if (winX.length == 1) {
            _removeEvents();
            message.innerText = "Winner is X!";
        } else if (winO.length == 1) {
            _removeEvents();
            message.innerText = "Winner is O!";
        } else if (winX.length == 2) {
            message.innerText = "Winner is X";
        } else if (round == 9 && winX.length == 0) {
            message.innerText = "It's a Draw";
        }
    };
    
    const _switchPlayer = () => {
            round % 2 == 0 ? activePlayer = player2 : activePlayer = player1; 
        };

    const _playerTurn = () => {
            round <= 8 && activePlayer == player2 ? message.innerText = `Player X's turn` : message.innerText = `Player O's turn`
        };
        
    const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

    const _removeClass = () => {
        Array.from(buttons).forEach((element) => element.classList.remove("x"));
        Array.from(buttons).forEach((element) => element.classList.remove("O"));
    };

    const _addEvents = () => {
        Array.from(buttons).forEach((element) => element.addEventListener("click", _handleClick, {once : true}));
    };

    const _removeEvents = () => {
        Array.from(buttons).forEach((element) => element.removeEventListener("click", _handleClick, {once : true}));
    };

    const restart = () => {
            _removeEvents();
            _removeClass();
            _addEvents();
            Array.from(buttons).forEach((element) => element.innerText = "");
            gameBoard.resetBoard()
            round = 0;
            board = gameBoard.getBoard();
            message.innerText = "Player X's turn"
            };

    buttons.forEach(button => {
                button.addEventListener("click", _handleClick, {once : true});
            });

    restartBtn.addEventListener("click", restart);

})();

