// CS30 Final Project
// Saabr Yousuf
// Dec. 12th, 2022
//
// Extra for Experts:
// - learning and using p5.play extention


let player1, player2, floors, ground, celining, wall, walls, wallr, wallL, plat1, demoBox, dead, gameButton, infoButton, backButton, stage1, stage2, stage3;
let state = "menu";
let lastState = "none";

class Button {
  constructor (xpos, ypos, width, height, col1, col2, state, newstate) {
    this.x = xpos;
    this.y = ypos;
    this.width = width;
    this.height = height;
    this.color = col1;
    this.hovcolor = col2;
    this.state = state;
    this.nextstate = newstate;
    this.left = this.x - this.width/2;
    this.right = this.x + this.width/2;
    this.top = this.y - this.height/2;
    this.bottom = this.y + this.height/2;
  }

  mouseInButton(left, right, top, bottom){
    return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
  }

  display() {
    if (this.state === state) {
      if (this.mouseInButton(this.left, this.right, this.top, this.bottom)) {
        fill(this.hovcolor);
      }
      else {
        fill(this.color);
      }
      rect(this.x, this.y, this.width, this.height);
    }  
  }
}

function setup() {
  
  new Canvas(800, 700);
  world.gravity.y = 9.8;
  allSprites.bounciness = 0;
  createCanvas(800, 700);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  strokeWeight(4);
  gameButton = new Button(width/2, height/2, width/4, height*0.10, "blue", "red", "menu", "select");
  infoButton = new Button(width/2, height*0.75, width/4, height*0.10,"blue", "red", "menu", "rules");
  backButton = new Button(width/9, height/9, width*0.10, height*0.10, "blue", "red", "rules", "menu");
  stage1 = new Button(width/4, height/2, width*0.1, width*0.1, "blue", "red", "select", "game");
  stage2 = new Button(width/2, height/2, width*0.1, width*0.1, "blue", "red", "select", "game");
  stage3 = new Button(width*0.75, height/2, width*0.1, width*0.1, "blue", "red", "select", "game");
}

function draw() {
  background(200);

  if (state === "menu") {
    titleScreen();
  }

  else if (state === "rules") {
    infoScreen();
  }

  else if (state === "select") {
    levelSelect();
  }

  else if (state === "game") {
    
    demoWorld();
  }
  
  lastState = state;
}

function demoWorld() {
  if (lastState === "menu") {
    createPlayers();
    newBox();
    map1();
    deathBlock();
  }
  playerMove();
}

function titleScreen() {

  gameButton.display();
  infoButton.display();
}

function infoScreen() {

  backButton.display();

  fill (200, 100, 200, 150);
  rect(width/2, height/2, width*0.60, height*0.75);
}

function levelSelect() {

  stage1.display();
  stage2.display();
  stage3.display();
}

function clickedButton(button) {
  if (state === button.state && button.mouseInButton(button.left, button.right, button.top, button.bottom)){
    state = button.nextstate;
  }
}

function mouseClicked(){ 
  
  clickedButton(gameButton);
  clickedButton(infoButton);
  clickedButton(backButton);
  clickedButton(stage1);
  clickedButton(stage2);
  clickedButton(stage3);
}

function createPlayers() {
  player1 = new Sprite(40, 450, 25, 60);
  player1.rotationLock = true;
  player1.friction = 5;
  

  player2 = new Sprite(250, 250, 25, 60);
  player2.rotationLock = true;
  player2.friction = 5;
  player2.overlap(player1); 
}

function newBox() {
  demoBox = new Sprite(300, 300, 40, 40);
  demoBox.mass = 25;
}

function map1() {

  boundaries();

  floors = new Group();
  floors.y = height;
  floors.h = height*0.07;
  floors.w = 100;
  floors.collider = "static";

  for (let i = 0; i < 3; i++) {
    ground = new floors.Sprite();
  }

  floors[0].x = width/4;
  floors[1].x = width*0.5;
  floors[2].x = width*0.7;

  plat1 = new Sprite();
  plat1.x = plat1.w;
  plat1.w = width/5;
  plat1.y = height*0.75;
  plat1.h = height*0.05;
  plat1.collider = "static";

}

function boundaries() {
  
  walls = new Group();
  walls.y = height/2;
  walls.w = height*0.07;
  walls.h = height;
  walls.collider = "static";

  for (let i = 0; i < 2; i++) {
    wall = new walls.Sprite();
  }

  walls[0].x = 0;
  walls[1].x = width;

  celining = new Sprite();
  celining.x = width/2;
  celining.y = 0;
  celining.w = width;
  celining.h = height*0.07;
  celining.collider = "static";
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