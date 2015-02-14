//  0  1  2  3
//  4  5  6  7
//  8  9 10 11
// 12 13 14 15
'use strict';
var scores = [];
var jeffTiles = false;

function useJeff() {
  jeffTiles = true;
  [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].forEach(function(num) {
    var numClass = 'tile-' + num;
    var jeffClass = 'tile-' + num + '-jeff';
    $('.' + numClass).removeClass(numClass).addClass(jeffClass);
  });
}

function useNums() {
  jeffTiles = false;
  [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].forEach(function(num) {
    var numClass = 'tile-' + num;
    var jeffClass = 'tile-' + num + '-jeff';
    $('.' + jeffClass).removeClass(jeffClass).addClass(numClass);
  });
}

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
      var tileType = 'tile-' + scores[i] + (jeffTiles ? '-jeff' : '');
      $('#tiles').append(['<div class="game-tile col-', col, ' row-', row, ' ', tileType, '"></div>'].join(''));
    }
  }
}

function restartGame() {
  resetScores();
  placeRandomSquare();
  placeRandomSquare();
  drawSquares();
}

function pushLeft(testOverride) {
  push(true, true, testOverride);
  return false;
}

function pushRight(testOverride) {
  push(true, false, testOverride);
  return false;
}

function pushDown(testOverride) {
  push(false, false, testOverride);
  return false;
}

function pushUp(testOverride) {
  push(false, true, testOverride);
  return false;
}

function push(horizontal, increasing, testOverride) {
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
  var thereWereChanges = !tiles.every(function(tile, i) { return tile.beforeIndex === i && !tile.combined; });
  if (!testOverride && thereWereChanges) placeRandomSquare();
  animateTiles(tiles, horizontal, increasing);
}

function animateTiles(tiles, horizontal, increasing) {
  for (var i = 0; i < tiles.length; i++) {
    var nowRow = Math.floor(i / 4) + 1;
    var nowCol = (i % 4) + 1;
    var beforeRow = Math.floor(tiles[i].beforeIndex / 4) + 1;
    var beforeCol = (tiles[i].beforeIndex % 4) + 1;

    // this is for handling combining of squares
    var mergedWith = tiles[i].mergedWith;
    if(mergedWith !== undefined) {
      nowRow = Math.floor(tiles[mergedWith].beforeIndex / 4) + 1;
      nowCol = (tiles[mergedWith].beforeIndex % 4) + 1;
    }

    var moved = horizontal ? beforeCol - nowCol : beforeRow - nowRow;
    var animateAmount = 125 * moved;
    if (increasing) animateAmount *= -1;
    var animateOptions = {};
    animateOptions[horizontal ? "left" : "top"] = (increasing ? "+" : "-") + '=' + animateAmount;

    var tileOnBoard = $(['.row-', beforeRow, '.col-', beforeCol].join(''));
    tileOnBoard.animate(animateOptions, { duration: 200, complete: drawSquares });
  }
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
    nextTile.mergedWith = currIndex;
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
    tileObjects.push( { score: scores[i], combined: false, beforeIndex: i } );
  }
  return tileObjects;
}

function drawInitialBoard() {
  var board = $('#2048-board');
  for (var i = 0; i < 16; i++) {
    board.append('<div class="game-square"></div>');
  }
  board.append('<div style="clear:both;"></div>');
  board.append('<div id="tiles"></div>');
}

$(document).ready(function() {
  drawInitialBoard();
  restartGame();

  Mousetrap.bind("up",    function() { pushUp();    });
  Mousetrap.bind("down",  function() { pushDown();  });
  Mousetrap.bind("left",  function() { pushLeft();  });
  Mousetrap.bind("right", function() { pushRight(); });

  Mousetrap.bind("1", useNums);
  Mousetrap.bind("2", useJeff);

});
