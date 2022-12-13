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

let player1, player2, ground;

function setup() {
  new Canvas(600, 500);
  world.gravity.y = 9.8;
  allSprites.bounciness = 0;

  player1 = new Sprite(150, 150, 50, "dynamic");
  player2 = new Sprite(250, 250, 50, "dynamic");

  ground = new Sprite();
  ground.x = width/2;
  ground.y = height*0.9 + ground.h;
  ground.w = width;
  ground.h = height*0.1;
  ground.collider = "static";
}

function draw() {
  clear();
  spriteMove();
}

function spriteMove() {
  if (kb.pressing("a")) {
    player1.vel.x = -3;
  }
  else if (kb.pressing("d")) {
    player1.vel.x = 3;
  }
  else if (kb.presses("w")) {
    player1.vel.y = -3;
  }
  else {
    player1.vel.x = 0;
  }

  if (kb.pressing("g")) {
    player2.vel.x = -3;
  }
  else if (kb.pressing("j")) {
    player2.vel.x = 3;
  }
  else if (kb.presses("y")) {
    player2.vel.y = -3;
  }
  else {
    player2.vel.x = 0;
  }
} 