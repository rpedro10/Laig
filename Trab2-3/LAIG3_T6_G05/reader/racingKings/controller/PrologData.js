class PrologData{
    constructor(board, gameState, gameMode){
        this.board = board
        this.gameState = gameState;
        this.gameMode = gameMode;
    }

    get getBoard(){
        return this.board;
    }
    get getGameState(){
        return this.gameState;
    }
    get getGameMode(){
        return this.gameMode;
    }

    setGameState(game){
        this.gameState = game;
    }

    setBoard(board){
        this.board = board;
    }

    update(board, gameState, gameMode){
        this.board = board;
        this.gameState = gameState;
        this.gameMode = gameMode;
    }

    toString(){
        return replaceAll(this.board, '"', '') + "-" + this.gameState + "-" + this.gameMode;
    }
}