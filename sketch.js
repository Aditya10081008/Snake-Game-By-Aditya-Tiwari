let video;
let flipVideo;
let label = 'waiting...';
let classifier;


function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/k-6UvQBKQ/model.json');
}

let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();

  
  w = floor(width / rez);
  h = floor(height / rez);

  frameRate(5);
  snake = new Snake();
 foodLocation();
}

function foodLocation(){
  
  
  let x = floor(random(w));
  let y = floor(random(h));
   food = createVector(x,y);
  
  
}

function classifyVideo(){
    flipVideo = ml5.flipImage(video);

  classifier.classify(video , gotResult);
  
}


function controlSnake(){
  
  if(label === 'left'){
     snake.setDir(-1,0);
    
      } else if(label === 'right'){
         snake.setDir(1,0);     
      }else if(label === 'down'){
         snake.setDir(0,1);
      }else if(label === 'up'){
         snake.setDir(0,-1); 
     }
  
  

}

function draw() {
 
  background(255,200,10);
  image(video, 0, 0);
  textSize(32)
  text(label,10,50);
  
   scale(rez);
  if(snake.eat(food)){
    foodLocation();
    }
  snake.update();
  snake.show();
  if(snake.endGame()){
     print("END GAME");
    background(255,0,0);
    noLoop();
     }
  fill(2555,0,0);
  noStroke();
  rect(food.x,food.y,1,1);
}
function gotResult(error,results){
  
  if(error){
    console.log(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
  
}