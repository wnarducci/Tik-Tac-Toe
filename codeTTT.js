// Setting up the variables and the game
let canvas = document.getElementById('ttt'),
    ctx = canvas.getContext('2d'),
    msg = document.getElementById('message'),
    mouse = {
      x: -1,
      y: -1,
    },
    cellSize = 180;
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8],
    xPlayer = "X",
    oPlayer = "O",
    iter = 0,
    round = 0,
    currentPlayer = xPlayer,
    gameOver = false;
canvas.width = canvas.height = 3*cellSize;
ctx.lineCap = "round";

canvas.addEventListener('mouseout', function() {
  mouse.x = mouse.y = -1;
});

canvas.addEventListener('mousemove', function(e){
  let x = e.pageX - canvas.offsetLeft,
      y = e.pageY - canvas.offsetTop;

  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener('click', function(e) {
  x = Math.floor(mouse.x/180);
  y = Math.floor(mouse.y/180);
  play(x+y*3);
});

// Functions required for gameplay
function play(cell){
  if(checkForWin())
    gameOver=true;
      if(gameOver) return;
  if(board[cell]=="X") return;
  if(board[cell]=="O") return;
  board[cell] = currentPlayer;
  if(currentPlayer=="X"){
    currentPlayer="O";
  }
else{
currentPlayer="X";
}
}
function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

function draw () {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBoard();
  fillBoard();

  function drawBoard() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, canvas.height);
    ctx.stroke();

    ctx.moveTo(2*cellSize, 0);
    ctx.lineTo(2*180, canvas.height);
    ctx.stroke();

    ctx.moveTo(0, cellSize);
    ctx.lineTo(canvas.width, cellSize);
    ctx.stroke();

    ctx.moveTo(0, 2*180);
    ctx.lineTo(canvas.width, 2*180);
    ctx.stroke();
  }

  function fillBoard () {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 25;
    for(let i = 0; i < board.length; i++){
      let coords = getCellCoords(i);

      ctx.save();
      ctx.translate(coords.x + cellSize/2, coords.y + cellSize/2);
      if(board[i] == "X"){
        ctx.strokeStyle = 'pink';
        drawX();
      }
      if(board[i] == "O"){
        ctx.strokeStyle = 'gold';
        drawO();
      }
      ctx.restore();
    }
  }

  function drawX(){
    let lineLength = cellSize/3
    ctx.beginPath();
    ctx.moveTo(-lineLength, -lineLength);
    ctx.lineTo(lineLength, lineLength);
    ctx.moveTo(lineLength, -lineLength);
    ctx.lineTo(-lineLength, lineLength);
    ctx.stroke();
  }

  function drawO() {
    ctx.beginPath();
    ctx.arc(0, 0, cellSize/3, 0, Math.PI*2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

function getCellCoords(cell){
  let x = (cell % 3) * cellSize;
      y = Math.floor(cell/3) * cellSize;

  return {
      'x' : x,
      'y' : y,
  };
}
function checkForWin(){
  if(checkCols==true){
    gameOver=true;
  }
else{
gameOver=false;
}
if(checkRows==true){
  gameOver=true;
}
else{
gameOver=false;
}
if(checkDiag==true){
  gameOver=true;
}
else{
gameOver=false;
}
return checkRows()||checkCols()||checkDiag();
}
function checkRows(){
if(board[0]==board[1] && board[1]==board[2] && board[0]==board[2]){
  return true;
}
if(board[3]==board[4] && board[4]==board[5] && board[3]==board[5]){
  return true;
}
if(board[6]==board[7] && board[7]==board[8] && board[6]==board[8]){
  return true;
}
return false
}
function checkCols(){
if(board[0]==board[3] && board[3]==board[6] && board[0]==board[6]){
  return true;
}
if(board[1]==board[4] && board[4]==board[7] && board[1]==board[7]){
  return true;
}
if(board[2]==board[5] && board[5]==board[8] && board[2]==board[8]){
  return true;
}
return false
}
function checkDiag(){
if(board[0]==board[4] && board[4]==board[8] && board[0]==board[8]){
  return true;
}
if(board[2]==board[4] && board[4]==board[6] && board[2]==board[6]){
  return true;
}
return false
}
draw();
