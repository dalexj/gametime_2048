//  0  1  2  3
//  4  5  6  7
//  8  9 10 11
// 12 13 14 15
'use strict';

var scores = [];

function resetScores() {
  scores = [];
  for(var i = 0; i < 16; i++) {
    scores.push(0);
  }
}

function drawSquares() {
  $('.game-square').each(function(index, ele) {
    $(ele).text(scores[index] === 0 ? '' : scores[index]);
  });
}

function restartGame() {
  resetScores();
  placeRandomSquare();
  placeRandomSquare();
  drawSquares();
}

function pushLeft() {
  var changed = true;
  var tiles = [];
  for (var i = 0; i < scores.length; i++) {
    tiles.push( {score: scores[i], combined: false} );
  }
  var x = 0;
  while(changed) {
    changed = false;
    for(var row = 0; row < 4; row++) {
      for(var col = 0; col < 3; col++) {
        var currentTile = tiles[row*4 + col];
        var nextTile    = tiles[row*4 + col + 1];
        if(currentTile.score === 0 && nextTile.score != 0) {
          tiles[row*4 + col]     = nextTile;
          tiles[row*4 + col + 1] = currentTile;
          changed = true;
        } else if(currentTile.score != 0 && currentTile.score === nextTile.score && !currentTile.combined && !nextTile.combined) {
          currentTile.score   *= 2;
          nextTile.score       = 0;
          currentTile.combined = true
          changed = true;
        }
      }
    }
  }
  scores = tiles.map( function(ele) { return ele.score; } );
  drawSquares();
}

function placeRandomSquare() {
  var indexesThatHaveSquares = [];
  for (var i = 0; i < scores.length; i++) {
    if(scores[i] != 0) indexesThatHaveSquares.push(i);
  }
  if(indexesThatHaveSquares.length === 16) return;
  scores[randomNumberNotIn(indexesThatHaveSquares)] = generateTwoOrFour();
}

$(document).ready(function() {
  resetScores();
  restartGame();
});
