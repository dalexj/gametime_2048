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
  push(true, false);
}
function pushDown() {
  push(false, false);
}
function pushUp() {
  push(false, true);
}

function push(horizontal, increasing) {
  var changed = true;
  var tiles = initializeTiles();
  while(changed) {
    changed = false;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        // var currentIndex = horizontal ? row*4 + col : col*4 + row;
        // var direction    = horizontal ? 1 : 4;
        // var nextIndex = increasing ? (currentIndex + direction) : setDirection(currentIndex, direction);
        var currentIndex = calculateCurrentIndex(i, j, horizontal);
        var nextIndex    = calculateNextIndex(currentIndex, horizontal, increasing);
        changed = swapOrCombineTiles(tiles, currentIndex, nextIndex) || changed;
      }
    }
  }
  scores = tiles.map( function(ele) { return ele.score; } );
  drawSquares();
}

function calculateNextIndex(currentIndex, horizontal, increasing) {
  return "herbert do this";
}

function calculateCurrentIndex(i, j, horizontal) {
  var row = horizontal ? i : j;
  var col = horizontal ? j : i;
  return "herbert do this";
}

function swapOrCombineTiles(tiles, currIndex, nextIndex) {
  var currTile = tiles[currIndex];
  var nextTile = tiles[nextIndex];
  if (currTile.score === 0 && nextTile.score !== 0) {
    tiles[currIndex] = nextTile;
    tiles[nextIndex] = currTile;
    return true;
  } else if(currTile.score !== 0 && currTile.score === nextTile.score && !currTile.combined && !nextTile.combined) {
    currTile.score   *= 2;
    nextTile.score    = 0;
    currTile.combined = true;
    return true;
  }
  return false;
}

function placeRandomSquare() {
  var indexesThatHaveSquares = [];
  for (var i = 0; i < scores.length; i++) {
    if(scores[i] !== 0) indexesThatHaveSquares.push(i);
  }
  if(indexesThatHaveSquares.length === 16) return;
  scores[randomNumberNotIn(indexesThatHaveSquares)] = generateTwoOrFour();
}

function setDirection(currentIndex, direction) {
  if (direction === 4 && currentIndex < 4 || currentIndex > 11) {
    return currentIndex;
  } else if (direction === 1 && currentIndex === 0)  {
    return currentIndex;
  } else {
    return currentIndex - direction;
  }
}

function initializeTiles() {
  var tileObjects = [];
  for (var i = 0; i < scores.length; i++) {
    tileObjects.push( { score: scores[i], combined: false } );
  }
  return tileObjects;
}

$(document).ready(function() {
  resetScores();
  restartGame();
});
