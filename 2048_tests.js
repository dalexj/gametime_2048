module('number generation')

QUnit.test('gets either a 2 or 4', function( assert ) {
  var nums = [];
  for(var i = 0; i < 100; i++) nums.push(generateTwoOrFour());

  assert.ok(nums.every(function(ele) {
    return ele === 2 || ele === 4;
  }), 'These all should be either a 2 or 4' );

});

QUnit.test('gets a number not in the numbers given', function( assert ) {
  var nums = [];
  for(var i = 0; i < 100; i++) nums.push(randomNumberNotIn([1, 4, 5]));

  assert.ok(nums.every(function(num) {
    return num != 1 && num != 4 && num != 5;
  }), 'These all should be either 2 numbers between 0 and 15 and be different' );

});

QUnit.test('resetScores() starts with all scores empty', function( assert ) {
  resetScores();

  assert.ok(scores.every(function(ele) { return ele === 0; }), 'All Squares should be 0' );

});


//
module('pushing and combining numbers to the left')
//

QUnit.test('can push empty spots to the left', function( assert ) {
  scores = [
  0,0,4,2,
  0,4,2,0,
  4,0,2,0,
  2,0,0,4
  ];
  pushLeft();
  var expectedScores = [
  4,2,0,0,
  4,2,0,0,
  4,2,0,0,
  2,4,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the left' );

});

QUnit.test('can combine empty spots to the left', function( assert ) {
  scores = [
  2,2,4,4,
  0,4,4,4,
  4,2,2,4,
  2,2,0,4
  ];
  pushLeft();
  var expectedScores = [
  4,8,0,0,
  8,4,0,0,
  4,4,4,0,
  4,4,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the left' );

});

QUnit.test('can combine more empty spots to the left', function( assert ) {
  scores = [
  4,4,4,4,
  2,0,0,2,
  2,2,2,4,
  0,0,0,0
  ];
  pushLeft();
  var expectedScores = [
  8,8,0,0,
  4,0,0,0,
  4,2,4,0,
  0,0,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the left' );

});

//
module('pushing and combining numbers to the right')
//

QUnit.test('can push empty spots to the right', function( assert ) {
  scores = [
  2,4,0,0,
  0,2,4,0,
  0,2,0,4,
  4,0,0,2
  ];
  pushRight();
  var expectedScores = [
  0,0,2,4,
  0,0,2,4,
  0,0,2,4,
  0,0,4,2
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the right' );

});

QUnit.test('can combine empty spots to the right', function( assert ) {
  scores = [
  4,4,2,2,
  4,4,4,0,
  4,2,2,4,
  4,0,2,2
  ];
  pushRight();
  var expectedScores = [
  0,0,8,4,
  0,0,4,8,
  0,4,4,4,
  0,0,4,4
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the right' );

});

QUnit.test('can combine more empty spots to the right', function( assert ) {
  scores = [
  4,4,4,4,
  2,0,0,2,
  4,2,2,2,
  0,0,0,0
  ];
  pushRight();
  var expectedScores = [
  0,0,8,8,
  0,0,0,4,
  0,4,2,4,
  0,0,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows to the right' );

});

//
module('pushing and combining numbers up')
//

QUnit.test('can push empty spots up', function( assert ) {
  scores = [
  0,0,4,2,
  0,4,0,0,
  4,2,2,0,
  2,0,0,4
  ];
  pushUp();
  var expectedScores = [
  4,4,4,2
  2,2,2,4,
  0,0,0,0,
  0,0,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows up' );

});

QUnit.test('can combine empty spots up', function( assert ) {
  scores = [
  4,4,4,4,
  4,4,2,0,
  2,4,2,2,
  2,0,4,2
  ];
  pushUp();
  var expectedScores = [
  4,8,4,4,
  8,4,4,4,
  0,0,4,0,
  0,0,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows up' );

});

QUnit.test('can combine more empty spots up', function( assert ) {
  scores = [
  4,2,4,0,
  4,0,2,0,
  4,0,2,0,
  4,2,2,0
  ];
  pushUp();
  var expectedScores = [
  8,4,4,0,
  8,0,2,0,
  0,0,4,0,
  0,0,0,0
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows up' );

});

//
module('pushing and combining numbers down')
//

QUnit.test('can push empty spots down', function( assert ) {
  scores = [
  2,0,0,4
  4,2,2,0,
  0,4,0,0,
  0,0,4,2,
  ];
  pushUp();
  var expectedScores = [
  0,0,0,0,
  0,0,0,0
  2,2,2,4,
  4,4,4,2
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows down' );

});

QUnit.test('can combine empty spots down', function( assert ) {
  scores = [
  2,0,4,2
  2,4,2,2,
  4,4,2,0,
  4,4,4,4,
  ];
  pushUp();
  var expectedScores = [
  0,0,0,0
  0,0,4,0,
  8,4,4,4,
  4,8,4,4,
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows down' );

});

QUnit.test('can combine more empty spots down', function( assert ) {
  scores = [
  4,2,2,0
  4,0,2,0,
  4,0,2,0,
  4,2,4,0,
  ];
  pushUp();
  var expectedScores = [
  0,0,0,0
  0,0,4,0,
  8,0,2,0,
  8,4,4,0,
  ];

  assert.deepEqual(scores, expectedScores, 'Pushing all rows down' );

});
