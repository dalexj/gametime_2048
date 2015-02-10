//  0  1  2  3
//  4  5  6  7
//  8  9 10 11
// 12 13 14 15
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

function pushLeft() {
  var changed = true;
  var x = 0;
  while(changed) {
    changed = false;
    for(var row = 0; row < 4; row++) {
      for(var col = 0; col < 3; col++) {
        var current = scores[row*4 + col];
        var next    = scores[row*4 + col + 1];
        if(current === 0 && next != 0) {
          scores[row*4 + col + 1] = current;
          scores[row*4 + col]     = next;
          changed = true;
        } else if(current != 0 && current === next) {
          scores[row*4 + col]     = current * 2;
          scores[row*4 + col + 1] = 0;
          changed = true;
        }
      }
    }
  }
  drawSquares();
}

$(document).ready(function() {
  restartGame();
});
