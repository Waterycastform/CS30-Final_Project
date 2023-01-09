// CS30 Final Project
// Saabr Yousuf
// Dec. 12th, 2022
//
// Extra for Experts:
// - learning and using p5.play extention


let player1, player2, ground, demoBox, dead;

function setup() {
  new Canvas(600, 500);
  world.gravity.y = 9.8;
  allSprites.bounciness = 0;

  demoWorld();
}

function draw() {
  clear();
  playerMove();
}

function demoWorld() {
  createPlayers();
  newBox();
  makeGround();
  deathBlock();
}

function createPlayers() {
  player1 = new Sprite(150, 150, 25, 60,);
  player1.rotationLock = true;
  player1.friction = 5;
  

  player2 = new Sprite(250, 250, 25, 60,);
  player2.rotationLock = true;
  player2.friction = 5;
  player2.mass = 10;
  player2.overlap(player1); 
}

function newBox() {
  demoBox = new Sprite(300, 300, 40, 40);
  demoBox.mass = 25;
}

function makeGround() {
  ground = new Sprite();
  ground.x = width/2;
  ground.y = height*0.9 + ground.h;
  ground.w = width;
  ground.h = height*0.1;
  ground.collider = "static";
}

function deathBlock() {
  dead = new Sprite();
  dead.x = width*0.8;
  dead.y = height*0.8;
  dead.collider = "static";

  if (player1.collides(dead)) {
    clear();
    demoWorld();
  }
}

function playerMove() {
  if (kb.pressing("a")) {
    player1.vel.x = -3;
  }
  else if (kb.pressing("d")) {
    player1.vel.x = 3;
  }
  else if (player1.vel.y !== 0) {
    player1.vel.x = 0;
  }
  if (player1.vel.y === 0 && kb.presses("w")) {
    player1.vel.y = -5;
  }


  if (kb.pressing("g")) {
    player2.vel.x = -3;
  }
  else if (kb.pressing("j")) {
    player2.vel.x = 3;
  } 
  else if (player2.vel.y !== 0) {
    player2.vel.x = 0;
  }
  if (player2.vel.y === 0 && kb.presses("y")) {
    player2.vel.y = -5;
  }
  console.log(kb.pressing("d"));
} 