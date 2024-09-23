let currentInput = '';
let currentOperation = null;
let isOperatorPressed = false;

function appendNumber(number) {
    if (isOperatorPressed) {
        currentInput += number;
        isOperatorPressed = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function setOperation(operation) {
    if (currentInput === '') return;

    if (isOperatorPressed) {
        currentInput = currentInput.slice(0, -3);
    }

    currentInput += ` ${operation} `;
    isOperatorPressed = true;
    updateDisplay();
}

function compute() {
    const expression = currentInput.replace('x', '*');
    
    try {
        const result = eval(expression);
        currentInput = result.toString();
    } catch (error) {
        currentInput = 'Error';
    }

    currentOperation = null;
    isOperatorPressed = false;
    updateDisplay();
}

function deleteLast() {
    if (isOperatorPressed) {
        isOperatorPressed = false;
    }
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function resetCalc() {
    currentInput = '';
    currentOperation = null;
    isOperatorPressed = false;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = currentInput;
}
