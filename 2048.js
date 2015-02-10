'use strict';

$(document).ready(function() {
  restartGame();
});

function generateTwoOrFour() {
  var r = Math.random();
  return r < 0.70 ? 2 : 4;
}

function twoDifferentRandomSquareIndexes() {
  var num1 = Math.floor(Math.random() * 16);
  var num2 = num1;
  while(num1 === num2) {
    num2 = Math.floor(Math.random() * 16);
  }
  return [num1, num2];
}

function restartGame() {
  var firstPlacementIndexes = twoDifferentRandomSquareIndexes();
  $('.game-square').each(function(index, ele) {
    console.log(firstPlacementIndexes);
    if(firstPlacementIndexes.indexOf(index) >= 0) {
      ele.innerText = generateTwoOrFour();
    } else {
      ele.innerText = '';
    }
  });
}
