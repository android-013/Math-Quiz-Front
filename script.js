let difficulty;

let answer;

let score=0;

let questionNumber=1;



const levels = {

    veryeasy:{
        numbers:2,
        max:10,
        operators:["+"]
    },

    easy:{
        numbers:2,
        max:20,
        operators:["+","-"]
    },

    medium:{
        numbers:3,
        max:50,
        operators:["+","-","*"]
    },

    hard:{
        numbers:4,
        max:100,
        operators:["+","-","*","/"]
    },

    veryhard:{
        numbers:5,
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

    let numbers = [];
    let operators = [];

    // Generate required number of values

    for(let i=0;i<difficulty.numbers;i++){

        numbers.push(
            Math.floor(
                Math.random()*difficulty.max
            )+1
        );

    }


    // Generate operators

    for(let i=0;i<difficulty.numbers-1;i++){

        operators.push(
            difficulty.operators[
                Math.floor(
                    Math.random()*difficulty.operators.length
                )
            ]
        );

    }



    // Create expression

    let expression="";

    for(let i=0;i<numbers.length;i++){

        expression += numbers[i];

        if(i<operators.length){

            expression += " "+operators[i]+" ";

        }

    }



    // Calculate answer safely

    try{

        answer = Math.round(
            Function(
                "return "+expression
            )()*100
        )/100;

    }

    catch{

        generateQuestion();
        return;

    }



    document.getElementById("question")
    .innerHTML = expression+" = ?";



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