var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300, 30, 30);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

 // console.log("checking");

 ghost = createSprite(300, 300);
 ghost.addImage("ghost", ghostImg);
 ghost.scale = 0.5;

 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  
  if(gameState == "play"){
  
  if(tower.y > 400){
    tower.y = 300
  }

  if(keyDown(LEFT_ARROW)){
    ghost.x -= 4;
  }

  if(keyDown(RIGHT_ARROW)){
    ghost.x += 4;
  }

  if(keyDown("space")){
    ghost.velocityY-= 2;
  }
  
  ghost.velocityY += 0.8

  spawnDoors();
}

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  
    ghost.velocityY = 0;
    gameState = "end";
    ghost.destroy();

  }
  
  drawSprites();

  if(gameState == "end"){
    
    textSize(40)
    fill("yellow")
    text("Game over!", 200, 300);

    tower.velocityY = 0;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    
    door = createSprite(50, 150, 30, 30);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100, 500));
    door.lifetime = 600;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    climber = createSprite(50, 150, 30, 30);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.y = door.y + 50
    climbersGroup.add(climber);
    ghost.depth = climber.depth;
    ghost.depth += 1;
    climber.lifetime = 600;

    invisibleBlock = createSprite(50, 150, 80, 10);
    invisibleBlock.x = climber.x
    invisibleBlock.y = climber.y + 20;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    ghost.depth = invisibleBlock.depth;
    ghost.depth += 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);

    //ghost.collide(climber);

  }
}