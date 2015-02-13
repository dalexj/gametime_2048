function generateTwoOrFour() {
  // 0.925 chance it's a 2, otherwise its a 4
  var r = Math.random();
  return r < 0.925 ? 2 : 4;
}

function randomNumberNotIn(numbers) {
  var num = Math.floor(Math.random() * 16);
  while(numbers.indexOf(num) >= 0) {
    num = Math.floor(Math.random() * 16);
  }
  return num;
}
