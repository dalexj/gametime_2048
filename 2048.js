'use strict';

var scores = [];
for(var i = 0; i < 16; i++) {
  scores.push(0);
}

function drawSquares() {
  $('.game-square').each(function(index, ele) {
    $(ele).text(scores[index] === 0 ? '' : scores[index]);
  });
}

function restartGame() {
  var firstPlacementIndexes = twoDifferentRandomSquareIndexes();
  for (var i = 0; i < scores.length; i++) {
    if(firstPlacementIndexes.indexOf(i) >= 0) {
      scores[i] = generateTwoOrFour();
    } else {
      scores[i] = 0;
    }
  }
  drawSquares();
}

$(document).ready(function() {
  restartGame();
});
