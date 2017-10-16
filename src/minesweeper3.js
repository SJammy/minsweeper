
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];

  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }

    board.push(row);
  }

  return board;
};


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced++;
  }

  return board;
};

const printBoard = (board) => {
  console.log(board.map(row =>
    row.join('|')).join('\n'));
};


let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('This is the Player Board:');

printBoard(playerBoard);
printBoard(bombBoard);
