var background1, backgroundImg;
var soldier,soldierImg;
var dragon,dragonImg;
var monster1,monster1Img,monster2,monster2Img,monster3,monster3Img;

var monster1G,monster2G,monster3G;

var end=0;
var play=1;
var gamestate = play;

var score=0;
var gameOver,gameOverB,gameOverImg,gameOverBImg,restart;

function preload(){
  backgroundImg = loadImage("background.jpg");
  soldierImg = loadAnimation("Soldier1.png","Soldier2.png","Soldier3.png");

  dragonImg = loadAnimation("Dragon1.png","Dragon2.png","Dragon3.png","Dragon4.png","Dragon5.png");

  monster1Img= loadImage("Monster1.png");
  monster2Img= loadImage("Monster2.png");
  monster3Img= loadImage("Monster3.png");

  gameOverBImg = loadImage("gameOver_background.jpg");
  gameOverImg = loadImage("GameOver.jpg")


}

function setup() {
createCanvas(windowWidth,windowHeight);
 
background1=createSprite(100,150);
background1.addImage(backgroundImg);
background1.scale=1.5
background1.velocityX = -5;

soldier=createSprite(400,460);
soldier.addAnimation("Soldierrunning",soldierImg);

invisibleGround = createSprite(200,500,600,10);
invisibleGround.visible = false;



soldier.setCollider("rectangle",0,0,20,20);




dragon=createSprite(100,windowHeight/2);
dragon.addAnimation("dragonflying",dragonImg);
dragon.scale=2

gameOverB=createSprite(windowWidth/2,windowHeight/2);
gameOverB.addImage(gameOverBImg);
gameOverB.scale=0.8
gameOverB.visible = false;

gameOver=createSprite(windowWidth/2,windowHeight/2);
gameOver.addImage( gameOverImg);
gameOver.scale=0.5
gameOver.visible = false;

monster1G = new Group();
monster2G = new Group();
monster3G = new Group();




}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score,900,30);
  

 if(gamestate===play){
    score = score + Math.round(getFrameRate()/50);
    background1.velocityX = -(6 + 2*score/440);

    if(background1.x < 0 ){
        background1.x = width/2;
      }

      var obstacle = Math.round(random(1,3));
  
      if( keyDown("space") && soldier.y >= 350) {
        soldier.velocityY = -12;
      
    }
    soldier.velocityY = soldier.velocityY + 1



      if (World.frameCount % 150 == 0) {
        if (obstacle == 1) {
          obstacle1();
        } else if (obstacle == 2) {
          obstacle2();
        } else {
          obstacle3();
        }
        
      }
     
      if(monster1G.isTouching(soldier)){
        gamestate = end;
        soldier.velocityY = 0;
       }
       
       if(monster2G.isTouching(soldier)){
         gamestate = end;
         soldier.velocityY = 0;
       }
       
       if(monster3G.isTouching(soldier)){
         gamestate = end;
         soldier.velocityY = 0;
        
       }


    }else if(gamestate===end){
      gameOver.visible = true;
      gameOverB.visible = true;
      
      dragon.visible = false;
      soldier.visible = false;
      background1.visible=false;

      textSize(20);
      fill(255);
      text("Press enter to Restart the game!", 500,400);

      background1.velocityX = 0;
      soldier.velocityY = 0;

      monster1G.destroyEach()
      monster2G.destroyEach()
      monster3G.destroyEach()

      monster1G.setVelocityXEach(0);
      monster1G.setLifetimeEach(-1);
    
      monster2G.setVelocityXEach(0);
      monster2G.setLifetimeEach(-1);
    
      monster3G.setVelocityXEach(0);
      monster3G.setLifetimeEach(-1);

      if(keyDown("ENTER")) {
        reset();
      }
    }

 soldier.collide(invisibleGround);

}

function obstacle1(){
  monster1 =createSprite(windowWidth,Math.round(random(450, 460)));
        monster1.scale =0.4;
        monster1.velocityX = -(6 + 2*score/100);
        monster1.addAnimation("obstacle1",monster1Img);
        monster1.setLifetime=170;
        monster1G.add(monster1);
        
}
function obstacle2(){
  monster2 =createSprite(windowWidth,Math.round(random(460, 470)));
  monster2.scale =0.5;
  monster2.velocityX = -(6 + 2*score/180);
  monster2.addAnimation("obstacle2",monster2Img);
  monster2.setLifetime=170;
  monster2G.add(monster2);
}
function obstacle3(){
  monster3 =createSprite(windowWidth,Math.round(random(450, 460)));
  monster3.scale =0.3;
  monster3.velocityX = -(6 + 2*score/120);
  monster3.addAnimation("obstacle3",monster3Img);
  monster3.setLifetime=170;
  monster3G.add(monster3);
}

function reset(){
  gamestate = play;
  gameOver.visible = false;
  gameOverB.visible=false;

  background1.visible=true;
  dragon.visible=true;
  soldier.visible=true;

  monster1G.destroyEach();
  monster2G.destroyEach();
  monster3G.destroyEach();
  
  score = 0;
 }






