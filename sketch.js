//Create variables here
var dog, happyDog, foodS = 0, foodStock;
var dogImg,happyDogImg,database;

var lastFed, fedTime;
var foodObj;
var addFood, feedPet;
function preload()
{
  //load images here
  
 
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  
  
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.3;

  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  FedTime = hour();
  console.log(FedTime);
  foodObj = new Food();

  addFood = createButton("Add FOOD");
  addFood.position(100,20);
 addFood.mousePressed(addFoods);

  feedPet = createButton("Feed Pet");
  feedPet.position(300,20);
 feedPet.mousePressed(feedDog);



}


  



function draw() {  
  background(46, 139, 87);


  foodObj.display();

  
  //add styles here
  drawSprites();
  fill ("white");
  textSize(20)
  if(FedTime === 12){
    text ("Last Fed Time : 12 " + " AM" , 300,30 );
  }
  
  else if(FedTime < 12 ){
    text ("Last Fed Time :  " + FedTime + " AM" , 300,30 );
  }
  else if(FedTime > 12 ){
    text ("Last Fed Time :  " + FedTime%12 + " PM" , 300,30 );
  }
  
}

function readStock(data){
  foodS = data.val();
  foodObj.foodStock = foodS;
  console.log(foodS);
}

function addFoods(){
  foodS +=1;
  database.ref('/').update({
    'Food' : foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
foodS--;
database.ref('/').update({
  'Food' : foodS
})

}
