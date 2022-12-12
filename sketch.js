// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(220);
// }

let dummy;

function setup() {
  new Canvas(windowWidth, windowHeight);

  dummy = new Sprite();
  dummy.diameter = 50;
}

function draw() {
  clear();
  spriteMove();
}

function spriteMove() {
  if (kb.pressing('left')) {
    dummy.vel.x = -3;
  }
  else if (kb.pressing('right')) {
    dummy.vel.x = 3;
  }
  else if (kb.pressing('up')) {
    dummy.vel.y = -3;
  }
  else if (kb.pressing('down')) {
    dummy.vel.y = 3;
  }
  else {
    dummy.vel.x = 0;
    dummy.vel.y = 0;
  }
} 