var tower,towerImage
var door,doorImage,doorGroup
var climber,climberImage,climberGroup
var ghost,ghostImage;
var block,blockGroup;
var sound;

var gameState="play"

function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  sound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage("tower",towerImage)
  tower.velocityY=1
  tower.y=tower.width/2;
  
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup=new Group();
}

function draw(){
  background(0)
  
  if(gameState==="play"){
         sound.play();
         if(tower.y>600){
       tower.y=tower.width/2;
      }

      if(keyDown("RIGHT_ARROW")){
        ghost.x=ghost.x+3
      }

      if(keyDown("LEFT_ARROW")){
        ghost.x=ghost.x-3
      }

      if(keyDown("space")){
       ghost.velocityY=-5;
      }

      ghost.velocityY=ghost.velocityY+0.5;

      if(climberGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }

      if(blockGroup.isTouching(ghost)||ghost.y>600){
        ghost.destroy();
        gameState="end";
      }

      spawndoor();
      drawSprites();
  }
   else if(gameState==="end"){
     sound.stop();
     textSize(50)
     fill("red")
     stroke("yellow")
     strokeWeight(20)
     text("GAME OVER",150,300)
     
   }
 
}

function spawndoor(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImage);
    door.x=Math.round(random(120,400))
    door.velocityY=1
    door.lifetime=600
    doorGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImage)
    climber.x=door.x;
    climber.velocityY=1
    climber.lifetime=600
    climberGroup.add(climber);
    
    ghost.depth=door.depth;
     ghost.depth+=1;
    
    block=createSprite(door.x,15,climber.width,2);
    block.velocityY=1
    blockGroup.add(block);
  }
    
}