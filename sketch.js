var gameState = "play";

var climber, door, ghost, spookySound, tower, doorGroup, climberGroup;
var climerImg, GhostJumpingImg, ghostStandingImg, towerImg, doorImg;

function preload() {
  climberImg = loadImage("climber.png");
  GhostJumpingImg = loadImage("ghost-jumping.png");
  ghostStandingImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
 
  spookySound = loadSound("spooky.wav");
}

function setup() { 
  createCanvas(600, 600);
  spookySound.loop();
  
  tower = createSprite(300, 300, 600, 1200);
  tower.addImage(towerImg);
  
  ghost = createSprite(300, 300, 10, 10); 
  ghost.addImage("Standing", ghostStandingImg);
  ghost.addImage("JumpingGhost", GhostJumpingImg);
  ghost.scale = 0.4;
  
  
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background("black");
  
  if (gameState == "play") {
    tower.velocityY = 2;
    
    if (tower.y > 600) {
      tower.y = tower.width/2;
    }
    
    if (keyWentDown("SPACE")) {
      ghost.velocityY = -10;
       ghost.changeImage("JumpingGhost", GhostJumpingImg);
    }
    
    if (keyWentUp("SPACE")) {
      ghost.changeImage("Standing", ghostStandingImg);
    }
   
    if (keyDown("RIGHT_ARROW")) {
      ghost.x += 10
    }
    if(keyDown("LEFT_ARROW")) {
      ghost.x -= 10;
    }
    
    ghost.velocityY += 0.5;
    
    spawnDoors();
    
    if (ghost.y > 600 || climberGroup.isTouching(ghost))  {
      gameState = "end";
    }

    
    drawSprites();
    
  }
  
  if (gameState == "end") {
    tower.velocityY = 0;
    ghost.destroy();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    
    drawSprites();
    
    fill("white");
    textSize(90);
    text("Game Over", 60, 300);
  }
  
  
  
}

function spawnDoors() {
  if (frameCount % 200 == 0) {
    door = createSprite(200, -50, 10, 10);
    door.addImage(doorImg)
    climber = createSprite(200, 20, 10, 10);
    climber.addImage(climberImg);
    door.x = random(120, 400);
    climber.x = door.x
    
    door.velocityY = 2;
    climber.velocityY = 2;
    
    door.lifetime = 300;
    climber.lifetime = 300;
    
    ghost.depth = door.depth + 1;
  
    climberGroup.add(climber);
    doorGroup.add(door);
    
  }
}

