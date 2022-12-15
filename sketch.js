// CS30 Final Project
// Saabr Yousuf
// Dec. 12th, 2022
//
// Extra for Experts:
// - learning and using p5.play extention


// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(220);
// }

let player1, player2, ground, demoBox;

function setup() {
  new Canvas(600, 500);
  world.gravity.y = 9.8;
  allSprites.bounciness = 0;

  createPlayers();
  demoWorld();

}

function draw() {
  clear();
  playerMove();
}

function demoWorld() {
  ground = new Sprite();
  ground.x = width/2;
  ground.y = height*0.9 + ground.h;
  ground.w = width;
  ground.h = height*0.1;
  ground.collider = "static";

  demoBox = new Sprite(300, 300, 40, 40);
  demoBox.mass = 25;
}

function createPlayers() {
  player1 = new Sprite(150, 150, 25, 60,);
  player1.rotationLock = true;

  player2 = new Sprite(250, 250, 25, 60,);
  player2.rotationLock = true;
  player2.overlap(player1); 
}

function playerMove() {
  if (kb.pressing("a")) {
    player1.vel.x = -3;
  }
  else if (kb.pressing("d")) {
    player1.vel.x = 3;
  }
  else if (kb.presses("w")) {
    player1.vel.y = -5;
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
    player2.vel.y = -5;
  }
  else {
    player2.vel.x = 0;
  }
} 