function testTheory() {
  var currentIndex = 0;
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 3; col++) {
      currentIndex += 1;
      console.log('Row: ' + row + '\nCol: ' + col + '\nCurrent Index: ' + currentIndex);
    }
  }
}

// only runs 12 times

function rightWay() {
  var currentIndex = 0;

  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      currentIndex += 1;
      console.log('Row: ' + row + '\nCol: ' + col + '\nCurrent Index: ' + currentIndex);
    }
  }

  return currentIndex;
}
