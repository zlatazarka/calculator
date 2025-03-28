// Вспомогательные функции для тестирования
function testAdd(a, b) {
    inputA.value = a;
    inputB.value = b;
    return add();
}

function testSubtract (a, b) {
    inputA.value = a;
    inputB.value = b;
    return subtract();
}

function testMultiply(a, b) {
    inputA.value = a;
    inputB.value = b;
    return multiply();
}

function testDivide(a, b) {
    inputA.value = a;
    inputB.value = b;
    return divide();
}

function testExponentiation (a, b) {
    inputA.value = a;
    inputB.value = b;
    return exponentiation();
}

function testSquareRoot (a) {
    inputA.value = a;
    inputB.value = ""; // Очищаем inputB, так как корень использует только inputA
    return squareRoot();
}

function testProcent(a, b) {
    inputA.value = a;
    inputB.value = b;
    isPercentEnabled();
    return parseFloat(inputB.value); // Возвращаем результат из inputB
}

const a = 15;
const b = 8;

describe("add", function () {
    it(`15 плюс 8 будет 23`, function () {
        assert.equal(testAdd(a, b), 23); // Правильный результат
    });
    it(`15 плюс 8 будет 24`, function () {
        assert.equal(testAdd(a, b), 24); // Неправильный результат
    });
});

describe("exponentiation", function () {
    it(`15 в степени 8 будет 2562890625`, function () {
        assert.equal(testExponentiation(a, b), 2562890625); // Правильный результат
    });
    it(`15 в степени 8 будет 2562890624`, function () {
        assert.equal(testExponentiation(a, b), 2562890624); // Неправильный результат
    });
});

describe("procent", function () {
    it(`процент 100 от 15 будет 15`, function () {
        assert.equal(testProcent(100, 15), 15); // Правильный результат
    });
    it(`процент 100 от 15 будет 16`, function () {
        assert.equal(testProcent(100, 15), 16); // Неправильный результат
    });
});

describe("squareRoot", function () {
    it(`корень 25 будет 5`, function () {
        assert.equal(testSquareRoot(25), 5); // Правильный результат
    });
    it(`корень 25 будет 6`, function () {
        assert.equal(testSquareRoot(25), 6); // Неправильный результат
    });
});

describe("subtract", function () {
    it(`15 минус 8 будет 7`, function () {
        assert.equal(testSubtract(a, b), 7); // Правильный результат
    });
    it(`15 минус 8 будет 6`, function () {
        assert.equal(testSubtract(a, b), 6); // Неправильный результат
    });
});

describe("multiply", function () {
    it(`15 умножить на 8 будет 120`, function () {
        assert.equal(testMultiply(a, b), 120); // Правильный результат
    });
    it(`15 умножить на 8 будет 121`, function () {
        assert.equal(testMultiply(a, b), 121); // Неправильный результат
    });
});

describe("divide", function () {
    it(`15 делить на 3 будет 5`, function () {
        assert.equal(testDivide(15, 3), 5); // Правильный результат
    });
    it(`15 делить на 3 будет 6`, function () {
        assert.equal(testDivide(15, 3), 6); // Неправильный результат
    });
});