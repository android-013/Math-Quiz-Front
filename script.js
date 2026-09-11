let difficulty;

let answer;

let score=0;

let questionNumber=1;



const levels={

veryeasy:{
    max:10,
    operators:["+"]
},

easy:{
    max:20,
    operators:["+","-"]
},

medium:{
    max:50,
    operators:["+","-","*"]
},

hard:{
    max:100,
    operators:["+","-","*","/"]
},

veryhard:{
    max:500,
    operators:["+","-","*","/"]
}

};



function startGame(level){

difficulty=levels[level];


document.getElementById("menu").style.display="none";

document.getElementById("game").classList.remove("hidden");


score=0;

questionNumber=1;


updateScore();

generateQuestion();

}



function randomNumber(){

return Math.floor(
Math.random()*difficulty.max
)+1;

}




function generateQuestion(){


let a=randomNumber();

let b=randomNumber();


let op=
difficulty.operators[
Math.floor(
Math.random()*difficulty.operators.length
)
];


if(op=="/"){

a=a*b;

}


let expression=
`${a} ${op} ${b}`;


switch(op){

case "+":

answer=a+b;

break;


case "-":

answer=a-b;

break;


case "*":

answer=a*b;

break;


case "/":

answer=a/b;

break;

}


document.getElementById("question")
.innerHTML=expression+" = ?";



createOptions();


document.getElementById("qno")
.innerHTML=questionNumber;


}




function createOptions(){


let options=[answer];


while(options.length<4){

let wrong =
answer+
Math.floor(Math.random()*20)-10;


if(!options.includes(wrong)
&& wrong>=0)

options.push(wrong);

}


options.sort(()=>Math.random()-0.5);



let box=document.getElementById("options");

box.innerHTML="";



options.forEach(value=>{


let btn=document.createElement("button");


btn.innerHTML=value;


btn.onclick=function(){

checkAnswer(value,btn);

};


box.appendChild(btn);


});


}





function checkAnswer(value,button){


let buttons=
document.querySelectorAll("#options button");


buttons.forEach(b=>b.disabled=true);



if(value===answer){

button.classList.add("correct");

score++;

document.getElementById("result")
.innerHTML="✅ Correct!";


}

else{


button.classList.add("wrong");


document.getElementById("result")
.innerHTML=
"❌ Correct answer: "+answer;


buttons.forEach(b=>{

if(Number(b.innerHTML)===answer)

b.classList.add("correct");


});


}


updateScore();


}



function nextQuestion(){

questionNumber++;

document.getElementById("result")
.innerHTML="";


generateQuestion();

}



function updateScore(){

document.getElementById("score")
.innerHTML=score;

}