// CS30 Final Project
// Saabr Yousuf
// Dec. 12th, 2022
//
// Extra for Experts:
// - learning and using p5.play extention


let countedTime, levelTime, backButton2, retryButton, menuButton, winButton, player1, player2, floors, ground, base, floor1, floor2, floor3, celining, wall, walls, wallr, wallL, plat1, dynaBox, boxes, dead, lava, water, portal, gameButton, infoButton, backButton, stage1, stage2, stage3, gameTheme, bounce, deathSound, jump1, jump2, jump3, jump4, jumpb, tfloor1, t2floor1, tfloor3, tfloor4, tfloor2, t2floor2, t2floor3, ffloor1, ffloor2, ffloor3, acid;
let state = "menu";
let lastState = "none";
let soundplayed = 0;

function preload() {
  gameTheme = loadSound("song18.mp3");
  bounce = loadSound("Jump.wav");
  deathSound = loadSound("Explosion.wav");
}

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
  
  new Canvas(700, 700);
  world.gravity.y = 9.8;
  allSprites.bounciness = 0;
  allSprites.collider = "static";
  createCanvas(700, 700);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  bounce.setVolume(0.2);
  gameTheme.setVolume(1);
  gameTheme.loop();
  
  gameButton = new Button(width/2, height/2, width/4, height*0.10, "blue", "red", "menu", "select");
  infoButton = new Button(width/2, height*0.75, width/4, height*0.10,"blue", "red", "menu", "rules");
  backButton = new Button(width/9, height/9, width*0.10, height*0.10, "blue", "red", "rules", "menu");
  backButton2 = new Button(width/9, height/9, width*0.10, height*0.10, "blue", "red", "select", "menu");
  stage1 = new Button(width/4, height/2, width*0.1, width*0.1, "blue", "red", "select", "game1");
  stage2 = new Button(width/2, height/2, width*0.1, width*0.1, "blue", "red", "select", "game2");
  stage3 = new Button(width*0.75, height/2, width*0.1, width*0.1, "blue", "red", "select", "game3");
  retryButton = new Button(width/2, height*0.6, width/4, height*0.10, "blue", "red", "retry", "select");
  menuButton = new Button(width/2, height*0.75, width/4, height*0.10, "blue", "red", "retry", "menu");
  winButton = new Button(width/2, height/2, width/4, height*0.1, "blue", "red", "win", "select");
}

function draw() {
  background(200);
  
  gameTimer();

  if (state === "menu") {
    titleScreen();
  }

  else if (state === "rules") {
    infoScreen();
  }

  else if (state === "select") {
    levelSelect();
  }

  else if (state === "game1") {
    world1();
    update();
    playerMove();
  }

  else if (state === "game2") {
    world2();
    update();
    playerMove();
  }

  else if (state === "retry") {
    deathMenu();
  }

  else if (state === "win") {
    winMenu();
  }
  
  lastState = state; 
}

function gameTimer() {
  if (state !== "game1" && state !== "game2") {
    countedTime = millis();
  }
  else {
    levelTime = millis() - countedTime;
  }
  console.log(levelTime);
  return levelTime;
  
}

function timeBox() {
  fill (176, 129, 69);
  rect(width/2, height*0.05, width*0.1, height*0.06);
  fill("black");
  text (int(levelTime/1000), width/2, height*0.06);
}

function world1() {
  if (lastState === "select") {
    map1();
  }
}

function world2() {
  if (lastState === "select") {
    
    createPlayers();
    newBox();
    map2();
    deathBlock();
    
  }
}

function titleScreen() {
  allSprites.remove();
  gameButton.display();
  infoButton.display();

  fill("black");
  textSize(60);
  text("Fireboy & Watergirl :P", width/2, height*0.25);
  textSize(25);
  text("Start Game", width/2, height/2);
  text("How to Play", width/2, height*0.75);
}

function infoScreen() {
  backButton.display();

  fill (200, 100, 200, 150);
  rect(width/2, height/2, width*0.60, height*0.75);
}

function levelSelect() {
  soundplayed = 0;
  allSprites.remove();
  stage1.display();
  stage2.display();
  stage3.display();
  backButton2.display();

  fill("black");
  text("1", width/4, height/2);
  text("2", width/2, height/2);
  text("3", width*0.75, height/2);
}

function deathMenu() {
  if (soundplayed < 1) {
    if (!deathSound.isPlaying()) {
      deathSound.play();
      soundplayed++;
    }
  }
  
  
  allSprites.remove();
  fill (0, 0, 0, 150);
  rect(width/2, height/2, width, height);
  fill (200, 100, 200, 150);
  rect(width/2, height/2, width*0.60, height*0.75);

  retryButton.display();
  menuButton.display();
  fill("black");
  text("Try Again", width/2, height*0.6);
  text("Back to Menu", width/2, height*0.75);
}

function winMenu() {
  allSprites.remove();
  fill (200, 100, 200, 150);
  rect(width/2, height/2, width*0.60, height*0.6);

  winButton.display();
  fill("black");
  text("Next Level", width/2, height/2);
}


function clickedButton(button) {
  if (state === button.state && button.mouseInButton(button.left, button.right, button.top, button.bottom)){
    state = button.nextstate;
  }
}

function mouseClicked(){ 
  clickedButton(stage1);
  clickedButton(stage2);
  clickedButton(stage3);
  clickedButton(gameButton);
  clickedButton(infoButton);
  clickedButton(backButton);
  clickedButton(backButton2);
  clickedButton(retryButton);
  clickedButton(menuButton);
  clickedButton(winButton);
}

function createPlayers() {
  
  player1 = new Sprite(60, height*0.95, 25, 60);
  player1.rotationLock = true;
  player1.friction = 0.8;
  player1.collider = "dynamic";
  player1.color = "blue";


  player2 = new Sprite(60, height*0.82, 25, 60);
  player2.rotationLock = true;
  player2.friction = 0.8;
  player2.collider = "dynamic";
  player2.color = "red";
  player2.overlap(player1); 
  
  portals();
}

function map1() {
  boundaries();
  createPlayers();
  newBox(); 
  deathBlock();
  
  // noStroke();
  ground = new Group(); 
  ground.color = color(176, 129, 69);

  base = new ground.Sprite(width/2, height, width, 0);
  plat1 = new ground.Sprite(width*0.13, height*0.82, width*0.19, height*0.04);

  floor1 = new ground.Sprite(width/6, height, width/3, height*0.07);
  floor1.overlap(water);
  floor1.overlap(lava);
  floor2 = new ground.Sprite(width*0.55, height, width/7, height*0.07);
  floor3 = new ground.Sprite(width*0.9, height, width/4, height*0.07);

  jump1 = new ground.Sprite([[width*0.9-width*0.07/2, height], [width-width*0.07/2, height], [width-width*0.07/2, height*0.9], [650-width*0.07/2, height*0.9], [width*0.9-width*0.07/2, 650], [width*0.9-width*0.07/2, height]]);
  jumpb = new ground.Sprite(width*0.9, height-height*0.07, width*0.14, height*0.07);

  tfloor2 = new ground.Sprite(width*0.57, height*0.75+height*0.01, width/6, height*0.03-height*0.01);
  tfloor1 = new ground.Sprite(width*0.7, height*0.75, width*0.1, height*0.04);
  tfloor3 = new ground.Sprite(width*0.45, height*0.75, width*0.1, height*0.04);
  tfloor3 = new ground.Sprite(width*0.38, height*0.67, width*0.04, height*0.2);
  tfloor4 = new ground.Sprite(width*0.2, height*0.59, width*0.4, height*0.04);

  jump2 = new ground.Sprite(width*0.08, height*0.52, width*0.1, height*0.1);

  t2floor1 = new ground.Sprite(width*0.55, height*0.4+height*0.01, width*0.4, height*0.03-height*0.01);
  t2floor2 = new ground.Sprite(width*0.3, height*0.4, width*0.15, height*0.04);
  t2floor3 = new ground.Sprite(width*0.85, height*0.4, width*0.23, height*0.04);

  jump3 = new ground.Sprite(width*0.93, height*0.34, width*0.08, height*0.08);
  jump4 = new ground.Sprite(width*0.94, height*0.28, width*0.05, height*0.05);

  ffloor1 = new ground.Sprite(width*0.48, height*0.2+height*0.01, width*0.19, height*0.03-height*0.01);
  ffloor2 = new ground.Sprite(width*0.21, height*0.2, width*0.35, height*0.04);
  ffloor3 = new ground.Sprite(width*0.65, height*0.2, width*0.3, height*0.04);
}

function map2() {
  boundaries();

  plat1 = new Sprite();
  plat1.x = plat1.w;
  plat1.w = width/5;
  plat1.y = height*0.82;
  plat1.h = height*0.04;

  new Sprite(width/2, height, width, height*0.07);
}

function boundaries() {
  walls = new Group();
  walls.y = height/2;
  walls.w = height*0.07;
  walls.h = height;
  walls.color = color(176, 129, 69);

  for (let i = 0; i < 3; i++) {
    wall = new walls.Sprite();
  }

  walls[0].x = 0;
  walls[1].x = width;

  walls[2].x = width/2;
  walls[2].y = 0;
  walls[2].rotation = 90;
}

function newBox() {
  boxes = new Group();
  boxes.w = 40;
  boxes.h = 40;
  boxes.mass = 25;
  boxes.collider = "dynamic";
  boxes.color = "gray";

  if (state === "game1") {
    for (let i = 0; i < 2; i++){
      new boxes.Sprite();
    }

    boxes[0].x = width*0.7;
    boxes[0].y = 450;
    boxes[1].x = width*0.3;
    boxes[1].y = height*0.3;
  }
}

function deathBlock() {
  dead = new Group();
  dead.collider = "static";

  lava = new dead.Group();
  lava.color = "red";
  water = new dead.Group();
  water.color = "blue";
  acid = new dead.Group();
  acid.color = "green";

  if (state === "game1") {
    for (let i = 0; i < 2; i++) {
      new lava.Sprite();
    }
    for (let i = 0; i < 2; i++) {
      new water.Sprite();
    }
    for (let i = 0; i < 1; i++) {
      new acid.Sprite();
    }

    lava[0].y = height;
    lava[0].h = height*0.05;
    lava[0].x = width*0.415;
    lava[0].w = width/6;

    lava[1].y = height*0.4;
    lava[1].h = height*0.03;
    lava[1].x = width*0.55;
    lava[1].w = width*0.4;

    water[0].y = height;
    water[0].h = height*0.05;
    water[0].x = width*0.7;
    water[0].w = width/6;

    water[1].y = height*0.75;
    water[1].h = height*0.03;
    water[1].x = width*0.57;
    water[1].w = width/6;

    acid[0].y = height*0.2;
    acid[0].h = height*0.03;
    acid[0].x = width*0.48;
    acid[0].w = width*0.19;
  }
  
  
  dead.overlap(player1);
  dead.overlap(player2);
}

function portals() {
  portal = new Group();
  portal.collider = "s";
  portal.w = width*0.07;
  portal.y = height*0.13;
  portal.h = height*0.1;
  portal.overlap(player1);
  portal.overlap(player2);

  for (let i = 0; i < 2; i++) {
    exit = new portal.Sprite();
  }

  portal[0].x = 110;
  portal[0].color = "blue";
  portal[1].x = width*0.075;
  portal[1].color = "red";
}

function update() {
  if (player1.overlapping(lava)) {
    player1.remove();
    state = "retry";
  }
  if (player2.overlapping(water)) {
    player2.remove();
    state = "retry";
  }

  if (player1.overlapping(acid)) {
    player1.remove();
    state = "retry";
  }

  if (player2.overlapping(acid)) {
    player2.remove();
    state = "retry";
  }

  if (player1.overlapping(portal[0]) && player2.overlapping(portal[1])) {
    state = "win";
  }

  timeBox();
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
    bounce.play();
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
    bounce.play();
  }
} 
