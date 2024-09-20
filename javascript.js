let currentInput = ''; 
let nbrOne = null; 
let operator = null; 
let isResultDisplayed = false; 

// Handle the display of each operation or digit
function handleOperation(symbol) {
    const outPut = document.getElementById('operation');

    if (!isNaN(symbol) || symbol === '.') {
        // Si on a déjà eu un résultat, on efface l'affichage précédent
        if (isResultDisplayed) {
            clearOperation();  
            isResultDisplayed = false; 
        }
        
        currentInput += symbol; 
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('p');
        numberDiv.textContent = symbol;
        numberDiv.style.display = "inline";
        outPut.appendChild(numberDiv);
    } 
    else if (['+', '-', '*', '/'].includes(symbol)) {
        if (currentInput !== '') {
            if (nbrOne === null) {
                nbrOne = parseFloat(currentInput);
            } else {
                // Effectuer l'opération précédente
                const result = operate(nbrOne, operator, parseFloat(currentInput));
                showResult(result); 
                nbrOne = result; // Mettre à jour nbrOne avec le dernier résultat
            }

            operator = symbol; // Changer d'opérateur
            
            // Afficher l'opérateur dans l'affichage de l'opération
            const operatorDiv = document.createElement('div');
            operatorDiv.classList.add('p');
            operatorDiv.textContent = symbol;
            operatorDiv.style.display = "inline";
            outPut.appendChild(operatorDiv);
            
            currentInput = ''; // Réinitialiser pour le prochain nombre
        }
    } 
    else if (symbol === '=') {
        if (nbrOne !== null && operator !== null && currentInput !== '') {
            const result = operate(nbrOne, operator, parseFloat(currentInput));
            showResult(result); 
            
            nbrOne = result; // Mettre à jour nbrOne avec le dernier résultat
            operator = null; // Réinitialiser l'opérateur
            currentInput = ''; // Réinitialiser pour la prochaine entrée
            
            isResultDisplayed = true; // Indiquer que le résultat a été affiché
        }
    }
}

// Display the result in the "resultat" div
function showResult(result) {
    const resutat = document.getElementById('resultat');
    resutat.textContent = result; 

    console.log("Result added:", result);
}

// Add event listeners to buttons
function addEventListeners() {
    const buttons = document.querySelectorAll('.btn button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            handleOperation(value);
        });
    });

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        const outPut = document.getElementById('operation');
        outPut.innerHTML = "";
        document.getElementById('resultat').textContent = ""; 
        
        console.log("Cleared:", outPut);
        
        currentInput = '';
        nbrOne = null;
        operator = null;
        isResultDisplayed = false; 
    });
}

// Clear the previous display
function clearOperation() {
    const outPut = document.getElementById('operation');
    outPut.innerHTML = "";  
    
    currentInput = '';  
}

// Call the function to add event listeners
addEventListeners();

// Operation functions
function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    return numB !== 0 ? numA / numB : 'Error';
}

// Perform the operation based on the selected operator
function operate(nbrOne, operator, nbrTwo) {
    switch (operator) {
        case '+':
            return add(nbrOne, nbrTwo);
        case '-':
            return subtract(nbrOne, nbrTwo);
        case '*':
            return multiply(nbrOne, nbrTwo);
        case '/':
            return divide(nbrOne, nbrTwo);
        default:
            return ''; 
    }
}