// == -> checks for equal value
// === -> checks for equal value and equal type


//if we click on the start/reset
  //if we are playing
    //reload page
  //if we are not playing
    //set score to 0
    //show countdown box
    //reduce time by 1sec in loops
      //time left?
        //yes->continue
        //no->gameover
    //change button to reset
    //generate new Q&A

//if we click on answer box
  //if we are playing
    //correct?
      //yes
        //increase score
        //show correct box for 1sec
        //generate new Q&A
      //no
        //show try again box for 1sec

var playing = false;
var score = 0;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startRes").onclick = function() {
  //if we are playing
  if(playing == true) {
    location.reload(); //reload page
  }else{//if we are not playing
    //change mode to playing
    playing = true; 
    
    //reset time remaining 
    timeremaining = 60;
    
    //set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    
     //show countdown box
    show("timer");

    //change text to Reset Game
    document.getElementById("startRes").innerHTML = "Reset Game";
    
    //start countdown
    startCountdown();
    
    //generate new Q&A
    generateQA();
    
    //hide gameover box
    hide("gameover");
    
  }
}


//clicking on an answer box

for(i=1; i<5; i++) {
  document.getElementById("box" + i).onclick = function () {
  //check if in play
  if (playing == true) {
    if (this.innerHTML == correctAnswer) {
      //correct answer
      score++;
      document.getElementById("scorevalue").innerHTML = score;
      hide("wrong");
      show("correct");
      setTimeout(function() {
        hide("correct")
      }, 1000);
      //generate new question
      generateQA();
    }else{
      //wrong answer
      hide("correct");
      show("wrong");
      setTimeout(function() {
        hide("wrong")
      }, 1000); 
    }
  } 
}
}

//functions

//start countdown
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timervalue").innerHTML = timeremaining;
    if (timeremaining == 0) {//gameover
      stopCountdown();     
      show("gameover");
      
      document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
      
      hide("timer");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startRes").innerHTML = "Start Game";
    }
  }, 1000); 
}

//stop countdown
function stopCountdown() {
  clearInterval(action);
}

///hide elements
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show elements
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers

function generateQA() {
  var x = 1 + Math.round(9*Math.random());
  var y = 1 + Math.round(9*Math.random());
  correctAnswer = x*y;
  document.getElementById("question").innerHTML = x + "x" + y;
  correctPosition = 1 + Math.round(3*Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with correct answer
  
  //fill other boxes with wrong answers
  
  var answers = [correctAnswer];
  
  for(i = 1; i<5; i++) {
    if (i !== correctPosition) {
      var wrongAnswer; 
      do {wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); }while (answers.indexOf(wrongAnswer)>-1) 
      document.getElementById("box" + i).innerHTML = wrongAnswer; // a wrong answer
      answers.push(wrongAnswer);
      
    }
  }
}

//********************************************************
//var inPlay = false;
//var timerValue = 60;
//var timer1;
//var x = 0;
//var currentTime;
//var score = 0;
//
//function initialState () {
//    document.getElementById("startRes").innerHTML = "Start Game";
//    inPlay = false;
//    document.getElementById("timer").style.display = "none";
//    document.getElementById("question").innerHTML = "";
//    for (x = 1; x < 5; x++) {
//      document.getElementById("box" + x).innerHTML = "";
//    }
//    timer();
//}
//
//function timeOut() {
//  initialState();
//  document.getElementById("score2").innerHTML = score + "";
//  document.getElementById("gameover").style.display = "initial";
//}
//
//function timer() {
//  if (inPlay === true) {
//    document.getElementById("timervalue").innerHTML = "60";
//    x = 0;
//    timer1 = setInterval(function () {x++; currentTime = timerValue - x; document.getElementById("timervalue").innerHTML = currentTime + ""; if (currentTime === 0) {timeOut();  } }, 1000);
//  } else if (inPlay === false) {
//    clearInterval(timer1);
//  }
//}
//
//var num1;
//var num2;
//var num3;
//var correctBox;
//
//function question() {
//  num1 = Math.floor(Math.random() * 10) + 1;
//  num2 = Math.floor(Math.random() * 10) + 1;
//  num3 = num1 * num2;
//  document.getElementById("question").innerHTML = num1 + "x" + num2;
//  
//  var choiceArray = [num3];
//  var add;
//  var match = true;
//    
//  for (y=1;y<5;y++) {
//    while (match === true) {
//      add = Math.abs(Math.floor(num1 * num2 + (Math.round(Math.random()*2 - 1))*Math.floor(Math.random()*10)));
//      match = choiceArray.some(function (num) {return num === add});
//    }
//    match = true;
//
//    choiceArray.push(add);
//    document.getElementById("box" + y).innerHTML = "" + add;
//    } 
//
//  correctBox = Math.floor(Math.random() * 4) + 1;
//  document.getElementById("box" + correctBox).innerHTML = num1 * num2 + "";
//
//}
//
//document.getElementById("start").onclick = function () {
//  if (inPlay === false) {
//    document.getElementById("startRes").innerHTML = "Reset Game";
//    inPlay = true;
//    document.getElementById("timer").style.display = "initial";
//    document.getElementById("gameover").style.display = "none";
//    score = 0;
//    document.getElementById("scorevalue").innerHTML = score + "";
//    question();
//    timer();
//  } else if (inPlay === true) {
//    initialState(); 
//  }
//};
//
//document.getElementById("box1").onclick = function () {
//  if (inPlay === true) {
//    if (this.innerHTML === num3 + "") {
//      score++;
//      document.getElementById("scorevalue").innerHTML = score + "";
//      document.getElementById("correct").style.display = "initial";
//      setTimeout(function() {document.getElementById("correct").style.display = "none"; }, 1000);
//      question();
//    } else {
//      document.getElementById("wrong").style.display = "initial";
//      setTimeout(function () {document.getElementById("wrong").style.display = "none"; }, 1000);
//    }
//  }
//};
//
//document.getElementById("box2").onclick = function () {
//  if (inPlay === true) {
//    if (this.innerHTML === num3 + "") {
//      score++;
//      document.getElementById("scorevalue").innerHTML = score + "";
//      document.getElementById("correct").style.display = "initial";
//      setTimeout(function () {document.getElementById("correct").style.display = "none"; }, 1000);
//      question();
//
//    } else {
//      document.getElementById("wrong").style.display = "initial";
//      setTimeout(function () {document.getElementById("wrong").style.display = "none"; }, 1000);
//    }
//  }
//};
//
//
//document.getElementById("box3").onclick = function () {
//  if (inPlay === true) {
//    if (this.innerHTML === num3 + "") {
//      score++;
//      document.getElementById("scorevalue").innerHTML = score + "";
//      document.getElementById("correct").style.display = "initial";
//      setTimeout(function () {document.getElementById("correct").style.display = "none"; }, 1000);
//      question();
//
//    } else {
//      document.getElementById("wrong").style.display = "initial";
//      setTimeout(function () {document.getElementById("wrong").style.display = "none"; }, 1000);
//    }
//  }
//};
//
//document.getElementById("box4").onclick = function () {
//  if (inPlay === true) {
//    if (this.innerHTML === num3 + "") {
//      score++;
//      document.getElementById("scorevalue").innerHTML = score + "";
//      document.getElementById("correct").style.display = "initial";
//      setTimeout(function () {document.getElementById("correct").style.display = "none"; }, 1000);
//      question();
//
//    } else {
//      document.getElementById("wrong").style.display = "initial";
//      setTimeout(function () {document.getElementById("wrong").style.display = "none"; }, 1000);
//    }
//  }
//};
//  