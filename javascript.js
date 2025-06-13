let numBtn=Array.from(document.querySelectorAll('.numB'));
let operator=Array.from(document.querySelectorAll('.op-btn'));
let equal=document.querySelector('#equal');
let clear=document.querySelector('.clear');
let toggleSign=document.querySelector('.negative');
let displayScreen=document.querySelector('#text');
let decimal=document.querySelector('#decimal');
let del=document.querySelector('.del');

let number1;
let currentNumber='';
let memory1;
let operatorBtn;
let operatorMemory;
let number2Flag=false;
let operationReset=false, resetNumber=false;
let block=false;
let point=false;
let highlightO=false;
let op2;

display(0);
for(let n=0;n<10;n++){
    let num;
    numBtn[n].onclick=()=>{
        num=(numBtn[n].textContent);
        getNum(num);
    };    
}

for(let opB of operator){
    opB.onclick=()=>{
        operatorBtn=(opB.textContent);
        getOperator(operatorBtn, opB);
    };    
}

equal.onclick=()=>{
    if(currentNumber!='' && number1==null && resetNumber==false){
    //console.log('RESULT(no operator)= '+currentNumber);
        display(currentNumber);
        operationReset=true;
        resetNumber=true;
        operatorBtn=null;
    }
    else if(operationReset==true && resetNumber==true){
    //console.log('RESULT(no op)= '+currentNumber);
        if(currentNumber=='') currentNumber=0;
        display(currentNumber);
    }
    else if(number2Flag==true){
        display(number1);
    }
    else{
        memory1=currentNumber;
                            //console.log('EQUAL: '+number1+' '+operatorMemory+' '+currentNumber);
        currentNumber=operate(number1,currentNumber,operatorMemory);
                            //console.log('RESULT= '+currentNumber);
        display(currentNumber);
        if((typeof currentNumber)=='string') currentNumber='';
        number1=null;
        operationReset=true;
        resetNumber=true;
    }
    block=false;
    point=false;
    decimal.classList.remove('active');
    op2.classList.remove('active');
};

clear.onclick=()=>{
    number1=null;
    currentNumber='';
    operatorBtn=null;
    operatorMemory=null;
    number2Flag=false;
    memory1=null;
    operationReset=false; 
    resetNumber=false;
    block=false;
    point=false;
    //console.log('clear');
    display(0);

};

del.onclick=()=>{
    if(currentNumber!=''){
        currentNumber=currentNumber.toString().slice(0,currentNumber.length-1);
        display(currentNumber);
        if(currentNumber=='') display(0);
    }
};

toggleSign.onclick=()=>{
    if(currentNumber!=''){
        currentNumber=currentNumber*-1;
        //console.log('toggleSign= '+currentNumber);
        display(currentNumber);
    }

};

decimal.onclick=()=>{
    if(point==false && currentNumber!='' && currentNumber.length<10){
        currentNumber=currentNumber.concat('.');
        display(currentNumber);
        point=true;
        decimal.classList.add('active');
    }
};

const keyboard = {
  Enter: () => {event.preventDefault(); equal.click();},
  Escape: () => {event.preventDefault(); clear.click();},
  Backspace: () => {event.preventDefault(); del.click();},
  '+': () => {event.preventDefault(); this.document.querySelector('#add').click();},
  '-': () => {event.preventDefault(); this.document.querySelector('#subs').click();},
  '/': () => {event.preventDefault(); this.document.querySelector('#divi').click();},
  '*': () => {event.preventDefault(); this.document.querySelector('#multi').click();},
  0: () => {numBtn[9].click();},
  1: () => {numBtn[6].click();},
  2: () => {numBtn[7].click();},
  3: () => {numBtn[8].click();},
  4: () => {numBtn[3].click();},
  5: () => {numBtn[4].click();},
  6: () => {numBtn[5].click();},
  7: () => {numBtn[0].click();},
  8: () => {numBtn[1].click();},
  9: () => {numBtn[2].click();},

};

document.addEventListener('keydown', (event) => {
  if (keyboard[event.key]) {
    keyboard[event.key]();
  }
});

function getNum(number){
    if (number2Flag==true && block==false){
        currentNumber=number;
        number2Flag=false;
    }else if(operationReset==true && resetNumber==true && block==false){
        currentNumber=number;
        resetNumber=false;
    }else if(block==false){
        currentNumber+=number;
    }

    if(point==true && currentNumber.length>10) block=true;
    else if(point==false && currentNumber.length>9) block=true;
    
    display(currentNumber);
}

function getOperator(operatorBtn, opB){
    if(number1==null && currentNumber !== '' && number2Flag==false){
        number1=currentNumber;
        number2Flag=true;
        operatorMemory=operatorBtn;
        operationReset=false;
        higlightOP(opB);
                            //console.log('getOP: '+number1+' '+operatorMemory);
    }else if(number1!==null && currentNumber!=='' && number2Flag==false){
        memory1=currentNumber;
        currentNumber='';
        number1=operate(number1,memory1,operatorMemory);
        display(number1);
        operatorMemory=operatorBtn;
        higlightOP(opB);
                            //console.log('getOP: '+number1+' '+operatorMemory);
        number2Flag=true;
    }else if(number2Flag==true){
        operatorMemory=operatorBtn;
        higlightOP(opB);
                            //console.log('getOP: '+number1+' '+operatorMemory);
    }
    block=false;
    point=false;
    decimal.classList.remove('active');
}

function operate(num1, num2, op){
    num1=Number(num1);
    num2=Number(num2);
    switch(op){
        case '+':
            return(add(num1,num2));
        break;
        case '-':
            return(substract(num1,num2));
        break;
        case 'x':
            return(multiply(num1,num2));
        break;
        case '÷':
            return(divide(num1,num2));
        break;
    }
}

function add(num1,num2) {return num1+num2}
function substract(num1,num2){return num1-num2}
function multiply(num1,num2){return num1*num2}
function divide(num1,num2){
    if(num2==0) return 'NOPE •ˋ◠ˊ•'
    else return num1/num2
}

function display(message){
    let m=message.toString();
    if(message!='NOPE •ˋ◠ˊ•' && m.length>10 && message>0){
        if(m.includes('.')){
            let n=Math.floor(message).toString();
            if(n.length<9){
                let x=9-(n.length)+1;
                let factor = Math.pow(10, x);
                message=Math.trunc(message* factor) / factor;
            }
            else{
                message=message.toExponential(3);
            } 
        }
        else {
            message=message.toExponential(3);
        }
        
    }
    else if(message!='NOPE •ˋ◠ˊ•' && m.length>11 && message<0){
        if(m.includes('.')){
            let n=Math.floor(message).toString();
            if(n.length<8){
                let x=9-(n.length)+1;
                let factor = Math.pow(10, x);
                message=Math.trunc(message* factor) / factor;
            }
            else{
                message=message.toExponential(3);

            } 
        }
        else {

            message=message.toExponential(3);
        }
    }
    

    displayScreen.textContent = '';
    setTimeout(() => {
    displayScreen.textContent=message;
    }, 20);
}

function higlightOP(opB){
    if(highlightO==false){
        op2=opB;
        highlightO=true;
        op2.classList.add('active');
    }
    else{
        op2.classList.remove('active');
        op2=opB;
        highlightO=true;
        op2.classList.add('active');
    }
}