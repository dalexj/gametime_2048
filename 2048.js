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
  push(true, true);
}

function pushRight() {
  push(true, false)
}
function pushDown() {
  push(false, false)
}
function pushUp() {
  push(false, true)
}

function push(horizontal, increasing) {
  var changed = true;
  var tiles = initializeTiles();
  while(changed) {
    changed = false;
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 3; col++) {
        var currentIndex = horizontal ? row*4 + col : col*4 + row;
        var direction    = horizontal ? 1 : 4;
        var destinationIndex = increasing ? (currentIndex + direction) : setDirection(currentIndex, direction);

        var currentTile = tiles[currentIndex];
        var nextTile    = tiles[destinationIndex];
        if (currentTile.score === 0 && nextTile.score != 0) {
          tiles[currentIndex]     = nextTile;
          tiles[destinationIndex] = currentTile;
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

function setDirection(currentIndex, direction) {
  if (direction === 4 && currentIndex < 4 || currentIndex > 11) {
    return currentIndex
  } else if (direction === 1 && currentIndex === 0)  {
    return currentIndex
  } else {
    return currentIndex - direction
  }
}

function initializeTiles() {
  var tile_objects = []
  for (var i = 0; i < scores.length; i++) {
    tile_objects.push( { score: scores[i], combined: false } );
  }
  return tile_objects
}

$(document).ready(function() {
  resetScores();
  restartGame();
});
