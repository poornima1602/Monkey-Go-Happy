
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalt;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var stop;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  stop=loadImage("sprite_0.png");
}



function setup() {
  createCanvas(500,500);

  monkey=createSprite(50,420);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.15;
  
  
  ground=createSprite(0,470,10000,10);
  
  survivalt=0; 
  foodGroup = new Group();
  obstacleGroup = new Group();
 
}


function draw() {
background("lightblue");
  
  if(survivalt === 5 || survivalt === 10 ||  survivalt === 15 || survivalt === 25 || survivalt === 20 ||  survivalt === 35 || survivalt ===45 || survivalt === 50 ||  survivalt === 40){
    background("lightpink");
  }
  
  
  if(gameState === PLAY){
    
    if(frameCount%30 === 0){
      survivalt=survivalt+1;
    }
    
    monkey.collide(ground);
    
    if(keyDown("up_Arrow") && monkey.y>300){
      monkey.velocityY= -20;
    }
    monkey.velocityY=monkey.velocityY + 1;
    
    obsta();
    food();
    
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();   
    }
    
      if(obstacleGroup.isTouching(monkey)){
        reset();
      }  
  }
  
  else if(gameState === END){
    
  obsatcleGroup.velocityX=0;
      foodGroup.velocityX=0;    
  }
  
  
  drawSprites();
  
  textSize(20)
  textFont("bold");
  text("SURVIVAL TIME:- "+survivalt,100,30); 
  
}

function obsta(){
  
  if(frameCount  % 100 === 0){
  obstacle=createSprite(460,450);
  obstacle.addImage("nem",obstacleImage);
  obstacle.scale=0.1;
    obstacle.velocityX=-(10+survivalt/100);
    obstacleGroup.add(obstacle);
  }
  
}

function food(){
  
  if(frameCount % 100 === 0){
  banana=createSprite(480,Math.round(random(100,300)));
  banana.addImage(bananaImage);
  banana.velocityX=-(5+survivalt/100);
  banana.scale=0.1;
    banana.lifeTime=100;
    foodGroup.add(banana);
    
  }
}

function reset(){
  gameState=PLAY;
  survivalt=0;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  obstacleGroup.velocityX=0;
  foodGroup.velocityX=0;
  monkey.changeImage(stop);
  monkey.velocity=0;
  textSize(40);
  text("TRY AGAIN",150,250);

}