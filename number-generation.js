function generateTwoOrFour() {
  // 0.70 chance it's a 2, otherwise its a 4
  var r = Math.random();
  return r < 0.70 ? 2 : 4;
}

function twoDifferentRandomSquareIndexes() {
  var num1 = Math.floor(Math.random() * 16);
  var num2 = num1;
  while(num1 === num2) {
    num2 = Math.floor(Math.random() * 16);
  }
  return [num1, num2];
}
