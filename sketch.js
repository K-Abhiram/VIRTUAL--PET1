//Create variables here
var dogImg, happyDog;
var hfoodS, hfoodStock;
var hdog;
var database; 

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(800, 500);

  hdog = createSprite(250,250,10,10);
  hdog.addImage(dogImg);
  hdog.scale = 0.5;

  hfoodStock = database.ref("food");
  hfoodStock.on("value",readStock);
  
  
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(hfoodS);
    hdog.addImage(happyDog);
    hfoodS = hfoodS-1;
  }

  drawSprites();
  //add styles here
  textSize(40);
  fill ("white");
  stroke (20);
  text("Food Remaining : " + hfoodS,40,490);
  textSize(15)
  text("Note: press the UP_ARROW Key to Feed The Dog",200,50)
}

function readStock(data){
  hfoodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    hfoodS : x,
  })
}

