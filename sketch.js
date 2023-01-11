// CS30 Final Project
// Saabr Yousuf
// Dec. 12th, 2022
//
// Extra for Experts:
// - learning and using p5.play extention


let player1, player2, ground, demoBox, dead;
let state = "menu";
let lastState = "none";

function setup() {
  createCanvas(600, 500);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  
}

function draw() {
  background(200);

  if (state === "menu") {
    titleScreen();
  }

  if (state === "rules") {
    infoScreen();
  }

  if (state === "game") {
    new Canvas(600, 500);
    world.gravity.y = 9.8;
    allSprites.bounciness = 0;
    demoWorld();
  }
  
  lastState = state;
}

function demoWorld() {
  if (lastState === "menu") {
    createPlayers();
    newBox();
    makeGround();
    deathBlock();
  }
  playerMove();
}

function mouseInButton (left, right, top, bottom){
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

function titleScreen() {
  
  if (mouseInButton(width*0.375, width*0.625, height*0.45, height*0.55)){ 
    fill (200, 100, 200,);
    rect(width/2, height/2, width/4, height*0.10, 20);
    fill (200, 100, 200, 150);
    rect(width/2, height*0.75, width/4, height*0.10, 20);
  }

  else if (mouseInButton(width*0.375, width*0.625, height*0.70, height*0.80)){ 
    fill (200, 100, 200,);
    rect(width/2, height*0.75, width/4, height*0.10, 20);
    fill (200, 100, 200, 150);
    rect(width/2, height/2, width/4, height*0.10, 20);
  }

  else {
    fill (200, 100, 200, 150);
    rect(width/2, height/2, width/4, height*0.10, 20);
    rect(width/2, height*0.75, width/4, height*0.10, 20);
  }

  strokeWeight(4);
}

function infoScreen() {

  if (mouseInButton(width*0.061, width*0.171, height*0.061, height*0.171)){
    fill (200, 100, 200,);
    rect(width/9, height/9, width*0.10, height*0.10, 20);
  }
  else {
    fill (200, 100, 200, 150);
    rect(width/9, height/9, width*0.10, height*0.10, 20);
  }
  

}

function mousePressed(){ 
  if (state === "menu" && mouseInButton(width*0.375, width*0.625, height*0.45, height*0.55)){
    state = "game";
  }

  if (state === "menu" && mouseInButton(width*0.375, width*0.625, height*0.70, height*0.80)){
    state = "rules";
  }

  if (state === "rules" && mouseInButton(width*0.061, width*0.171, height*0.061, height*0.171)){
    state = "menu";
  }

}

function createPlayers() {
  player1 = new Sprite(150, 150, 25, 60,);
  player1.rotationLock = true;
  player1.friction = 5;
  

  player2 = new Sprite(250, 250, 25, 60,);
  player2.rotationLock = true;
  player2.friction = 5;
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
  dead.collider = "s";

  // if (player1.collides(dead)) {
    
  // }
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
} 