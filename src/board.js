

// START Board Class        --------------------
export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex == 'B']) {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles++;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {

    const neighborOffSets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffSets.forEach( offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          this._numberOfBombs++;
        }
      }

    });

    return this._numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //NOTE This does NOT seem to be corect!
  print() {
    console.log(this._playerBoard.map(row =>
      row.join('|')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }

      board.push(row);
    }

    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }

      board.push(row);
    }


    let numberOfBombsPlaced = 0;

    // TODO The code in the while loop has the potential to place bombs on top of already existing bombs.
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }

}
// END Board Class          --------------------
