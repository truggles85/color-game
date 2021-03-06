var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 =document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var easyBtn = document.querySelector('#easyBtn')
var hardBtn = document.querySelector('#hardBtn')
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  //mode buttons event listeners
  for (var i=0; i<modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      //figure out how many squares to show
      if (this.textContent === 'Easy') {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      reset();
    });
  }
}

function setupSquares() {
  for (var i=0; i<squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener('click', function() {
      //grab color of clicked squares
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        changeColors(clickedColor);
        messageDisplay.textContent = 'Correct';
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = 'Play Again?'
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
  reset();
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  messageDisplay.textContent = '';
  colorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = 'steelblue';
  resetButton.textContent = 'New Colors'
  //change colors of squares
  for (var i=0; i<squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

resetButton.addEventListener('click', function() {
  reset();
});

//for when you win
function changeColors(color) {
  //loop through all squares
  for (var i=0; i<squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

//picks one of the rgb values to be the winning color
function pickColor() {
  var random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

//creates array for var colors
function generateRandomColors(num) {
  //make an array
  var arr = [];
  //repeat num times
  for (var i=0; i<num; i++) {
    //get random color and push into array
    arr.push(randomColor());
  }
  //return array
  return arr;
}

//generate random rgb color value
function randomColor() {
  //pick a 'red' from 0-255
  var r = Math.floor(Math.random() * 256);
  //pick a 'green' from 0-255
  var g = Math.floor(Math.random() * 256);
  //pick a 'blue' from 0-255
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
