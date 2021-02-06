

var Bg;
var Ballon,BallonImg;
var database;
var Position;

function preload(){
  Bg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
  BallonImg = loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png");

}
function setup() {
  createCanvas(1400,500);
  database = firebase.database();
  var BallonPosition = database.ref("Ballon/Position");
  BallonPosition.on("value", readPosition, showerror);

  Ballon = createSprite(400, 200, 50, 50);
  Ballon.addAnimation("flying",BallonImg);
  Ballon.scale = 0.32;
}

function draw() {
  background(Bg);
  
  if(keyDown(LEFT_ARROW)){
    //Balloon.x = Balloon.x-10;
    updatePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    //Balloon.x = Balloon.x+10;
    updatePosition(+10,0);
  }
  else if(keyDown(UP_ARROW)){
    //Balloon.y = Balloon.y-10;
    Ballon.scale = Ballon.scale+0.01;
    updatePosition(0,-10);
    
  }
  else if(keyDown(DOWN_ARROW)){
    //Balloon.y = Balloon.y+10;
    Ballon.scale = Ballon.scale-0.01;
    updatePosition(0,+10);
  }
  drawSprites();
}

function updatePosition(x,y){
  database.ref("Ballon/Position").set({
      x: Ballon.x + x,
      y: Ballon.y + y
  })
}

function readPosition(data){
  Position = data.val();
  Ballon.x = Position.x;
  Ballon.y = Position.y;
}

function showerror(){
  console.log("ERROR!");
}


