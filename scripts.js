// Globals

// Memory

let currentInput = "";
let previousInput = "";
let operatorInput = "";
let gaveResult = false;
let result = "";

// Display

const lineOne = document.getElementById("lineOne");
const lineTwo = document.getElementById("lineTwo");



// Buttons

// Types of buttons
const isValue = (input) => {
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "period"];
    return values.includes(input.id.toString()) ? input.id : false;
};

const isOperator = (input) => {
    const values = ["substract", "add", "multiply", "divide"];
    return values.includes(input.id.toString()) ? input.id : false;
};

const isEqual = document.getElementById("equal");
const ac = document.getElementById("ac");
const plusToMinus = document.getElementById("plusMinus");

// Checks what type of button
let whatButton = (button) => {
    if (isValue(button)) {
        return "value";
    } else if (isOperator(button)) {
        return "operator";
    } else if (button === plusToMinus) {
        return "plusMinus";
    } else if (button === ac) {
        return "ac";
    } else {
        return "isEqual";
    }
}



// Operators

// Operations
let add = (a, b) => Number(a) + Number(b);
let substract = (a, b) => Number(a) - Number(b);
let divide = (a , b) => Number(a) / Number(b);
let multiply = (a, b) => Number(a) * Number(b);

let plusMinus = (input) => {
    if (Number(input) === Math.abs(input)) {
        return Math.abs(input) * -1;
    } else {
        return Math.abs(input);
    }
}

// Operator functions

// Check if operating on new values
let operateEmpty = () => {return operatorInput === "" ? true : false};

// Check if updating operator
let operateUpdate = () => {
    return (lineTwo.textContent === "" && previousInput != "" && operatorInput != "") ? true : false;
}

// Check operators function
let operateStatus = () => {
    let status;
    if (operateEmpty()) {
        status = "empty";
    } else if (operateUpdate()) {
        status = "update";
    } else {
        status = "result";
    }
    return status;
}

// Apply operators
let operateSet = (operator) => {
    switch (operateStatus()){
        case "empty":
            operatorInput = operator;
            previousInput = lineTwo.textContent;
            lineOne.textContent += `${lineTwo.textContent} ${operator}`;
            lineTwo.textContent = "";
            break;
        case "update":
            operatorInput = operator;
            lineOne.textContent = `${previousInput} ${operatorInput}`;
            break;
        case "result":
            calculateResult();
            operatorInput = operator;
            lineOne.textContent = `${result} ${operator}`;
            currentInput = "";
            previousInput = result;
            result = "";
            break;
    }
}



// Calculate the result

// Decides which operation to run
let whichCalculation = (operator) => {return operator};

// Update result line
let resultLineUpdate = () => {
    lineOne.textContent = `${previousInput} ${operatorInput} ${currentInput} = ${result}`;
    if (lineOne.textContent.length > 20) {lineOne.textContent = result};
    previousInput = result;
    gaveResult = true;
}

// If the result is too long
let resultToExponential = () => {
    if (result.length > 15) {result = result.toExponential()};
}

let calculateResult = () => {
    currentInput = lineTwo.textContent;
    lineTwo.textContent = "";
    lineOne.textContent += ` ${currentInput} =`;
    switch (whichCalculation(operatorInput)) {
        case "+":
            result = add(previousInput, currentInput);
            resultToExponential()
            resultLineUpdate();
            previousInput = result;
            break;
        case "-":
            result = substract(previousInput, currentInput);
            resultToExponential();
            resultLineUpdate();
            break;
        case "÷":
            result = divide(previousInput, currentInput);
            resultToExponential()
            resultLineUpdate();
            break;
        case "×":
            result = multiply(previousInput, currentInput);
            resultToExponential()
            resultLineUpdate();
            break;
    }
}

// Apply AC
let allClear = () => {
    currentInput = "";
    previousInput = "";
    operatorInput = "";
    gaveResult = false;
    result = "";
    lineOne.textContent = "";
    lineTwo.textContent = "";
}


// Adds functions to buttons

// Makes sure you can only have one period per number.
const isFirstPeriod = () => {
    if (lineTwo.textContent === "") {lineTwo.textContent = `0.`};
    if (!lineTwo.textContent.includes(".")) {lineTwo.textContent += "."};
};

// Lets user add a 0 as first number, but not more.
const isFirstZero = () => {
    if (lineTwo.textContent != "0") {lineTwo.textContent += "0"}
}

const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(button => {
    button.addEventListener("click", () => {
        switch (whatButton(button)) {
            case "value":
                if (gaveResult === true && lineOne.textContent.includes(result) && !lineOne.textContent.includes(`${previousInput} ${operatorInput}`)) {
                    allClear();
                    lineTwo.textContent = button.textContent;
                } else if (button.textContent === ".") {
                    isFirstPeriod();
                } else if (button.textContent === "0") {
                    isFirstZero();
                } else {
                lineTwo.textContent += button.textContent;
                }
                break;
            case "operator":
                if (lineTwo.textContent != "" || gaveResult === true || lineOne.textContent === `${previousInput} ${operatorInput}`) {
                    operateSet(button.textContent);
                }
                break;
            case "plusMinus":
                const invalid = ["", "0", "0."];
                if (!invalid.includes(lineTwo.textContent)) {
                    lineTwo.textContent = plusMinus(lineTwo.textContent)
                }
                break;
            case "ac":
                allClear();
                break;
            case "isEqual":
                if (lineTwo.textContent != "" && previousInput != ""){
                    calculateResult();
                }
                break;
        }        
    });
});