pragma solidity ^0.5.0;

contract Game {
    address computer;
    address turn;
    
    uint8 move_count;
    bool won;
    bool draw;
    address winner = (address)(0x0);
    
    address[3][3] board;
    uint256 buffer;   
    constructor() public {
        computer = 0xb84AC43014d60AE5dCe5d36975eE461f31e953d3;
        move_count = 0;
        initBoard();
    }

    
    function initBoard() public {
        address empty_cell = (address)(0x0);
        address[3][3] memory new_board = [[empty_cell, empty_cell, empty_cell], 
        [empty_cell, empty_cell, empty_cell], 
        [empty_cell, empty_cell, empty_cell]];
        board = new_board;
    }
    
    function reset() public {
        computer = 0xb84AC43014d60AE5dCe5d36975eE461f31e953d3;
        move_count = 0;
        initBoard();
    }
    
    function checkIfFinalState() internal returns (bool) {
        address empty_cell = (address)(0x0);
        // Check rows
        for (uint i = 0; i < 3; i++) {
            if (empty_cell != board[i][0] && 
            board[i][0] == board[i][1] && 
            board[i][1] == board[i][2]) {
                won = true;
                winner = board[i][0];
                return true;
            }
        }
        // Check cols
        for (uint j = 0; j < 3; j++) {
            if (empty_cell != board[0][j] && board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
                won = true;
                winner = board[0][j];
                return true;
            }
        }
        // Check main diagonal
        if (empty_cell != board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            won = true;
            winner = board[0][0];
            return true;
        }
        // Check other diagonals
        if (empty_cell != board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
            won = true;
            winner = board[2][0];
            return true;
        }
        // No winner yet
        return false;
    }
    
    // Crosses first empty_cell
    function computerMoves() internal returns (address) {
        address empty_cell = (address)(0x0);
        for (uint i = 0; i < 3; i++) {
            for (uint j = 0; j < 3; j++) {
                if (empty_cell == board[i][j]) {
                    board[i][j] = computer;
                    if (++move_count == 9 || checkIfFinalState()) {
                        return winner;
                    }
                }
            }
        }
        return empty_cell;
    }
    
    // Makes move from player on coordinate _x and _y
    function makeMove(address _player, uint _x, uint _y) public returns (address) {
        
        require(_x < 0 && _x >= 3, "The value of x coord is wrong, should be in [0, 2]");
        require(_y < 0 && _y >= 3, "The value of y coord is wrong, should be in [0, 2]");
        require(board[_x][_y] != (address)(0x0), "Can not make this move, the cell is occupied");
        board[_x][_y] = _player;
        
        if (++move_count == 9 || checkIfFinalState()) {
            return winner;
        }
        
        return computerMoves();
    }
    
    function hasWinner() public view returns (bool) {
        return won;
    }
    
    function isDraw() public view returns (bool) {
        return draw;
    }
    
    function getBoard() public view returns (address[3][3] memory) {
        return board;
    }
    
    function getWinner() public view returns (address) {
        return winner;
    }
    
}
