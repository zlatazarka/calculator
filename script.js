const resultDisplay = document.getElementById("calc-result");
const operationSymbol = document.getElementById("operation-symbol");
const inputA = document.querySelector(".input-a");
const inputB = document.querySelector(".input-b");
const errorMessage = document.querySelector(".error-message");
const percentButton = document.querySelector(".percent");

let currentOperation = null; // Текущая выбранная операция
let activeButton = null; // Кнопка, активированная для операции
let isPercentEnabled = false; // Флаг, указывающий, что процент активирован

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        let value = this.value.replace(/[^0-9.-]/g, '');

        if (value.startsWith('.')) {
            value = '0' + value;
        }

        if (value.indexOf('.') !== value.lastIndexOf('.')) {
            value = value.substring(0, value.lastIndexOf('.'));
        }

        this.value = value;

        // Если проценты включены, добавляем знак % в inputB
        if (isPercentEnabled && input === inputB && !this.value.endsWith('%')) {
            this.value = this.value + '%';
        }

        // Обновляем состояние кнопки процента
        updatePercentButtonState();
    });
});

// Функция для обновления состояния кнопки процента
function updatePercentButtonState() {
    const isInputFilled = inputA.value !== "" && inputB.value !== "";

    if (isInputFilled) {
        percentButton.disabled = false;
        // Если процент активирован, делаем кнопку зеленой
        if (isPercentEnabled) {
            percentButton.style.backgroundColor = "green";
        } else {
            percentButton.style.backgroundColor = "";
        }
    } else {
        percentButton.disabled = true;
        // Если одно из полей пусто, кнопка серого цвета
        percentButton.style.backgroundColor = "#bdbdbd";
    }
}

// Функция для получения значений
function getInputValues() {
    // Убираем знак % из inputB, если он есть
    const bValue = inputB.value.replace('%', '');
    const a = parseFloat(inputA.value) || 0;
    const b = parseFloat(bValue) || 0;

    return [a, b];
}

// Функция округления результата до 7 знаков
function roundResult(result) {
    try {
        if (result >= 1e21) throw new Error("Слишком большое значение");
        else if (result < 0.0000001 && result !== 0) throw new Error("Слишком маленькое значение");
        return Number(result.toFixed(7));
    } catch (error) {
        console.log(error);
        errorMessage.textContent = error.message;
        return "Ошибка";
    }
}

// Функция для сброса процентов
function resetPercent() {
    if (isPercentEnabled) {
        inputB.value = inputB.value.replace('%', '');
        isPercentEnabled = false;
        percentButton.style.backgroundColor = "";
        updatePercentButtonState();
    }
}

// Выбор операции
function selectOperation(symbol, operationFunc) {
    selectedOperation = operationFunc;
    errorMessage.textContent = ""; // Очистка ошибок
    resultDisplay.textContent = ""; // Очистка результата

    // Если выбран корень, скрываем второе поле
    if (symbol === '√') {
        inputB.style.display = "none";
        inputB.value = "";
    } else {
        inputB.style.display = "inline-block";
    }

    // Обновление текста операции на экране
    resultDisplay.textContent = symbol;

    // Если была активная кнопка, снимаем активный класс
    if (activeButton) activeButton.classList.remove("active");

    // Применяем активный класс к кнопке, которая была нажата
    activeButton = document.querySelector(`button[data-op="${symbol}"]`);
    if (activeButton) activeButton.classList.add("active");
    
    togglePercent(); // Обновляем состояние кнопки процента
}

// Выполнение вычисления при нажатии "="
function performCalculation() {
    errorMessage.textContent = "";
    if (!currentOperation) {
        errorMessage.textContent = "Выберите операцию";
        return;
    }

    let [a, b] = getInputValues();

    if (isPercentEnabled) {
        if (currentOperation === add || currentOperation === subtract) {
            // Для сложения и вычитания: b% от a
            b = a * (b / 100);
        } else {
            // Для умножения, деления и возведения в степень: b% это b / 100
            b = b / 100;
        }
    }

    const result = currentOperation(a, b);
    if (result !== null) {
        resultDisplay.textContent = result;
    }
}

// Функция для обработки переключения процента
function togglePercent() {
    const [a, b] = getInputValues();
    if (!a || !b) return;

    if (isPercentEnabled) {
        inputB.value = inputB.value.replace('%', '');
        isPercentEnabled = false;
        percentButton.style.backgroundColor = "";
    } else {
        inputB.value = inputB.value + '%';
        percentButton.style.backgroundColor = "#24635C";
        isPercentEnabled = true;
    }

    updatePercentButtonState();
}

// Операции калькулятора
function add(a, b) {
    return roundResult(a + b);
}

function subtract(a, b) {
    return roundResult(a - b);
}

function multiply(a, b) {
    return roundResult(a * b);
}

function divide(a, b) {
    try {
        if (b === 0) throw new Error("Деление на ноль невозможно");
        return roundResult(a / b);
    } catch (error) {
        console.log(error);
        resultDisplay.textContent = "Ошибка";
        errorMessage.textContent = error.message;
        return null;
    }
}

function exponentiation(a, b) {
    return roundResult(a ** b);
}

function squareRoot(a) {
    try {
        if (a < 0) throw new Error("Корень из отрицательного числа не существует");
        return roundResult(Math.sqrt(a));
    } catch (error) {
        console.log(error);
        resultDisplay.textContent = "Ошибка";
        errorMessage.textContent = error.message;
        return null;
    }
}

// Очистка всех полей, операций и результатов
function clearAll() {
    inputA.value = "";
    inputB.value = "";
    resultDisplay.textContent = "0";
    operationSymbol.textContent = " ";
    errorMessage.textContent = "";

    if (activeButton) activeButton.classList.remove("active");
    activeButton = null;
    currentOperation = null;
    isPercentEnabled = false;

    inputB.style.display = "inline-block";
    updatePercentButtonState();
}

// Инициализация состояния кнопки процента
percentButton.style.backgroundColor = "#bdbdbd";
percentButton.disabled = true;
updatePercentButtonState();