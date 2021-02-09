var climber, climberImage
var door, doorImage
var tower, towerImage
var ghost, ghostImage
var invisibleGr
var gameState = "play"

function preload() {

  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  ghostImage = loadAnimation("ghost-standing.png");
  horrorSound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  
  horrorSound.loop();
  tower = createSprite(300, 200, 10, 10);

  ghost = createSprite(300, 200, 10, 10);


  tower.addImage("tower", towerImage);

  ghost.addAnimation("ghost", ghostImage);

  ghost.scale = 0.3;

  //ghost.debug=true;
  ghost.setCollider("rectangle", -50, 0, 150, ghost.height)

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGrGroup = new Group();
}

function draw() {

  background("red");
  
  if (gameState === "play") {

    if (keyDown("space")) {
      ghost.velocityY = -7;
    }

    if (keyDown("right")) {
      ghost.velocityX = 2;
    }

    if (keyDown("left")) {
      ghost.velocityX = -2;
    }

    ghost.velocityY += 0.5

    if (ghost.isTouching(climberGroup)) {

      //ghost.collide(climberGroup);
      ghost.velocityY = 0;
      //ghost.velocityX =0;
    }
    tower.velocityY = 1;

    if(tower.y > 400){
      tower.y = 300
    }
    
    if (ghost.y > 600 || (invisibleGrGroup.isTouching(ghost))) {
      ghost.destroy();
      tower.destroy();
      gameState = "end";
    }

    spawnDoor();

    drawSprites();
  }
  if (gameState === "end") {
    stroke("red");
    fill("yellow");
    textSize(45);
    text("Game Over", 200, 280)

  }
}

function spawnDoor() {
  if (frameCount % 200 === 0) {
    door = createSprite(Math.round(random(150, 450)), -50, 10, 10);
    climber = createSprite(door.x, door.y + 50, 10, 10);

    //invisibleGr.debug = true;
    door.addImage("door", doorImage);
    climber.addImage("climber", climberImage);
    invisibleGr = createSprite(door.x, climber.y, climber.width, 5);
    invisibleGr.shapeColor = "green";
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleGr.lifetime = 800;
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleGr.velocityY = 1;
    ghost.depth = door.depth
    ghost.depth += 1
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGrGroup.add(invisibleGr);
  }
}