let difficulty;
let answer = 0;
let score = 0;
let questionNumber = 1;


const levels = {

    veryeasy:{
        count:2,
        max:10,
        operators:["+"]
    },

    easy:{
        count:2,
        max:20,
        operators:["+","-"]
    },

    medium:{
        count:3,
        max:30,
        operators:["+","-","*"]
    },

    hard:{
        count:4,
        max:50,
        operators:["+","-","*"]
    },

    veryhard:{
        count:5,
        max:100,
        operators:["+","-","*","/"]
    }

};



function startGame(level){

    difficulty = levels[level];

    score=0;
    questionNumber=1;


    document.getElementById("menu").style.display="none";

    document.getElementById("game")
    .classList.remove("hidden");


    updateScore();

    generateQuestion();

}




function randomNumber(){

    return Math.floor(
        Math.random()*difficulty.max
    )+1;

}




function generateQuestion(){

    let numbers=[];
    let ops=[];


    for(let i=0;i<difficulty.count;i++){

        numbers.push(randomNumber());

    }



    for(let i=0;i<difficulty.count-1;i++){

        ops.push(
            difficulty.operators[
                Math.floor(
                    Math.random()*
                    difficulty.operators.length
                )
            ]
        );

    }



    let expression="";

    for(let i=0;i<numbers.length;i++){

        expression += numbers[i];

        if(i<ops.length){

            expression += " "
            +ops[i]+" ";

        }

    }



    answer = calculate(numbers,ops);


    document.getElementById("question")
    .innerHTML =
    expression+" = ?";


    document.getElementById("qno")
    .innerHTML=questionNumber;


    createOptions();

}





function calculate(numbers,ops){

    let result=numbers[0];


    for(let i=0;i<ops.length;i++){

        let num=numbers[i+1];


        switch(ops[i]){


            case "+":

            result += num;

            break;


            case "-":

            result -= num;

            break;


            case "*":

            result *= num;

            break;


            case "/":

            result /= num;

            break;

        }

    }


    return Number(result.toFixed(2));

}





function createOptions(){


    let options=[answer];


    let attempts=0;


    while(options.length<4 && attempts<100){

        attempts++;


        let wrong =
        answer +
        Math.floor(Math.random()*20)-10;


        wrong=Number(
            wrong.toFixed(2)
        );


        if(
            !options.includes(wrong)
        ){

            options.push(wrong);

        }

    }



    // emergency backup

    while(options.length<4){

        options.push(
            answer + options.length
        );

    }



    options.sort(
        ()=>Math.random()-0.5
    );



    let area =
    document.getElementById("options");


    area.innerHTML="";



    options.forEach(value=>{


        let btn=document.createElement("button");


        btn.innerHTML=value;


        btn.onclick=function(){

            checkAnswer(value,btn);

        };


        area.appendChild(btn);


    });


}





function checkAnswer(value,btn){


    let buttons =
    document.querySelectorAll(
        "#options button"
    );


    buttons.forEach(b=>{
        b.disabled=true;
    });



    if(value===answer){


        score++;

        btn.classList.add("correct");


        document.getElementById("result")
        .innerHTML="✅ Correct!";


    }
    else{


        btn.classList.add("wrong");


        document.getElementById("result")
        .innerHTML=
        "❌ Correct Answer: "+answer;


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