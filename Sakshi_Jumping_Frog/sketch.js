// variables for all the elements of the game
var oceanImg, ocean;
var coinImg, coin, coinGroup; 
var climberImg, climber, climbersGroup;
var endpoint, endpointImg;
var frog, frogImg;
var gameState = "play"
var score = 0;


function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  endpointImg=loadImage("ENDPOINT.jpg");
   
}

function setup(){
  createCanvas(580,450);

  // creating ocean
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
 // creating frog
  frog = createSprite(Math.round(random(10,300), 200,50,50));
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  

  // create end point
  endpoint = createSprite(200,400, 25,500 );
  endpoint.scale = 0.6;
  endpoint.addImage("endpoint", endpointImg); 

  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group();
  // touching area of frog
  frog.setCollider("rectangle", 0,0, 10,10);
  
}

function draw(){
  background(0);
  fill("red")
  textSize(20);
  drawSprites();
  text("Use arrow keys to navigate frog " , 200, 20);
  text("Score is: " + score, 400, 50);
  if (gameState === "play") {
    // move the water up
    ocean.setVelocity(0,-3);
    frog.setVelocity(0,1);
    frogImg.delay=10;
    
    // function for creating coin and climber
    spawnCoin(); 
    // function for controlling frog jumps
    frogJump();
     
   // infinte background
   if (ocean.position.y <200){
     ocean.position.y = 300;
   }
   // repeated appearance of frog
   if ( frog.position.y > 400){
        frog.position.y = 20;
    }
   
  }
  // ending the games
  if (gameState === "end"){
    ocean.setVelocity(0,0);
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
  }
}
// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 100 === 0) {
    //making the x position of the coin and climber the same
    coin = createSprite( Math.round(random(20,400), Math.round(random(20,400),40,40)))
    coin.addImage("coin",coinImg);
    coin.setVelocity(0,2);

    coin.scale = 0.1;
    coin.lifetime = 160;
    coinGroup.add(coin);
  //making the y position of the coin and climber relative to each other
    climber = createSprite( coin.x, (coin.y+50),40,40)
    climber.addImage("climber",climberImg);
    climber.setVelocity(0,2);

    climber.scale = 0.5;
    climber.lifetime = 160;
    climbersGroup.add(climber);
  }
}

// controllimg the moves of frog
function frogJump(){
  if (keyDown("up")){
   frog.position.y -= 5;
  }
  if (keyDown("down")){
   frog.position.y += 5;
  }
  if (keyDown("left")){
    frog.position.x -= 5;
  }
  if (keyDown("right")){
    frog.position.x += 5;
  }
  if (coinGroup.isTouching(frog)){
    score+=1;
    frog.setVelocity.y += 5; 
    
    // velocity will be increased after each hit
  }
  
    if ( frog.isTouching(endpoint))  { // if frog falls down 15 times game will end
    gameState = "end";
  }
}

