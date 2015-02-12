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
  push(true, false);
}

function pushRight() {
  push(true, true);
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

    var currentIndex = 0;
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        var nextIndex = calculateNextIndex(currentIndex, horizontal, increasing);
        changed = swapOrCombineTiles(tiles, currentIndex, nextIndex) || changed;
        currentIndex += 1;
      }
    }
  }
  scores = tiles.map( function(ele) { return ele.score; } );
  drawSquares();
}

function calculateNextIndex(currentIndex, horizontal, increasing) {
  var nextIndex = 0;
  var herbertIsDumb = false;

  var left  = horizontal  && !increasing;
  var right = horizontal  && increasing;
  var up    = !horizontal && increasing;
  var down  = !horizontal && !increasing;

  left    ? nextIndex = calculateLeft(currentIndex)   :
  right   ? nextIndex = calculateRight(currentIndex)  :
  up      ? nextIndex = calculateUp(currentIndex)     :
  down    ? nextIndex = calculateDown(currentIndex)   :
  herbertIsDumb = true;

  if (herbertIsDumb) return "Damn, Herbert's dumb..."; else  return nextIndex;
}

function calculateLeft(currentIndex) {
  var result = 0;

  currentIndex ===  0 ? result = currentIndex :
  currentIndex ===  4 ? result = currentIndex :
  currentIndex ===  8 ? result = currentIndex :
  currentIndex === 12 ? result = currentIndex :
  result = currentIndex - 1;

  return result;
}

function calculateRight(currentIndex) {
  var result = 0;

  currentIndex ===  3 ? result = currentIndex :
  currentIndex ===  7 ? result = currentIndex :
  currentIndex === 11 ? result = currentIndex :
  currentIndex === 15 ? result = currentIndex :
  result = currentIndex + 1;

  return result;
}

function calculateUp(currentIndex) {
  var result = 0;

  currentIndex === 0 ? result = currentIndex :
  currentIndex === 1 ? result = currentIndex :
  currentIndex === 2 ? result = currentIndex :
  currentIndex === 3 ? result = currentIndex :
  result = currentIndex - 4;

  return result;
}

function calculateDown(currentIndex) {
  var result = 0;

  currentIndex === 12 ? result = currentIndex :
  currentIndex === 13 ? result = currentIndex :
  currentIndex === 14 ? result = currentIndex :
  currentIndex === 15 ? result = currentIndex :
  result = currentIndex + 4;

  return result;
}

function swapOrCombineTiles(tiles, currIndex, nextIndex) {
  var result = 0;

  var currTile = tiles[currIndex];
  var nextTile = tiles[nextIndex];
  if (currTile.score !== 0 && nextTile.score === 0) {
    tiles[currIndex] = nextTile;
    tiles[nextIndex] = currTile;
    return true;
  } else if (nextTile.score !== 0) {
    tiles[currIndex] = currTile;
  } else if (currTile.score !== 0 && currTile.score === nextTile.score && !currTile.combined && !nextTile.combined) {
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
