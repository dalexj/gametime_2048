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
  $('#tiles').text('');
  for (var i = 0; i < scores.length; i++) {
    if(scores[i] !== 0) {
      var row = Math.floor(i/4) + 1;
      var col = (i%4) + 1;
      $('#tiles').append(['<div class="game-tile col-', col, ' row-', row, ' tile-', scores[i], '">', scores[i], '</div>'].join(''));
    }
  }
}

function restartGame() {
  resetScores();
  placeRandomSquare();
  placeRandomSquare();
  drawSquares();
}

function pushLeft(noNewTile) {
  push(true, true, noNewTile);
}

function pushRight(noNewTile) {
  push(true, false, noNewTile);
}
function pushDown(noNewTile) {
  push(false, false, noNewTile);
}
function pushUp(noNewTile) {
  push(false, true, noNewTile);
}

function push(horizontal, increasing, noNewTile) {
  var changed = true;
  var tiles = initializeTiles();
  while(changed) {
    changed = false;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        var currentIndex = calculateCurrentIndex(i, j, horizontal, increasing);
        var nextIndex    = calculateNextIndex(currentIndex, horizontal, increasing);
        changed = swapTiles(tiles, currentIndex, nextIndex) || changed;
        if(!changed) {
          changed = combineTiles(tiles, currentIndex, nextIndex) || changed;
        }
      }
    }
  }
  scores = tiles.map( function(ele) { return ele.score; } );
  if(!noNewTile) placeRandomSquare();
  drawSquares();
}

function calculateCurrentIndex(i, j, horizontal, increasing) {
  var row = horizontal ? i : j;
  var col = horizontal ? j : i;
  if(!increasing) {
    row = 3 - row;
    col = 3 - col;
  }
  return row*4 + col;
}

function calculateNextIndex(currentIndex, horizontal, increasing) {
  var toAdd = horizontal ? 1 : 4;
  if(!increasing) toAdd *= -1;

  return currentIndex + toAdd;
}

function swapTiles(tiles, currIndex, nextIndex) {
  var currTile = tiles[currIndex];
  var nextTile = tiles[nextIndex];
  if (currTile.score === 0 && nextTile.score !== 0) {
    tiles[currIndex] = nextTile;
    tiles[nextIndex] = currTile;
    return true;
  }
  return false;
}

function combineTiles(tiles, currIndex, nextIndex) {
  var currTile = tiles[currIndex];
  var nextTile = tiles[nextIndex];
  if (currTile.score !== 0 && currTile.score === nextTile.score && !currTile.combined && !nextTile.combined) {
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

  Mousetrap.bind("up",    pushUp);
  Mousetrap.bind("down",  pushDown);
  Mousetrap.bind("left",  pushLeft);
  Mousetrap.bind("right", pushRight);

});
