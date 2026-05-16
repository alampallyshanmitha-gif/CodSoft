let display = document.getElementById("display");

let calculated = false;

function append(value){

    if(calculated){
        display.innerText = "";
        calculated = false;
    }

    if(display.innerText === "0"){
        display.innerText = value;
    }
    else{
        display.innerText += value;
    }
}

function clearDisplay(){
    display.innerText = "0";
}

function backspace(){

    display.innerText = display.innerText.slice(0,-1);

    if(display.innerText === ""){
        display.innerText = "0";
    }
}

function toggleSign(){

    try{
        display.innerText = String(eval(display.innerText) * -1);
    }
    catch{
        display.innerText = "Error";
    }
}

function factorial(){

    let num = Number(eval(display.innerText));

    if(num < 0){
        display.innerText = "Error";
        return;
    }

    let fact = 1;

    for(let i = 1; i <= num; i++){
        fact *= i;
    }

    display.innerText = fact;
    calculated = true;
}

function calculate(){

    try{

        let expression = display.innerText;

        expression = expression.replace(/÷/g,'/');
        expression = expression.replace(/×/g,'*');

        expression = expression.replace(/π/g,'Math.PI');
        expression = expression.replace(/\be\b/g,'Math.E');

        expression = expression.replace(/sinh\(/g,'Math.sinh(');
        expression = expression.replace(/cosh\(/g,'Math.cosh(');
        expression = expression.replace(/tanh\(/g,'Math.tanh(');

        expression = expression.replace(/sin\(/g,'Math.sin(');
        expression = expression.replace(/cos\(/g,'Math.cos(');
        expression = expression.replace(/tan\(/g,'Math.tan(');

        expression = expression.replace(/log\(/g,'Math.log10(');
        expression = expression.replace(/ln\(/g,'Math.log(');

        expression = expression.replace(/√\(/g,'Math.sqrt(');

        expression = expression.replace(/Rand/g,'Math.random()');

        let result = eval(expression);

        display.innerText = result;

        calculated = true;

    }
    catch{
        display.innerText = "Error";
    }
}