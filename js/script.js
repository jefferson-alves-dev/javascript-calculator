const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const allClearButton = document.querySelector("[data-ac]");
const deleteButton = document.querySelector("[data-delete]");

const previousNumberTextElement = document.querySelector(
  "[data-previous-number]"
);

const currentNumberTextElement = document.querySelector(
  "[data-current-number]"
);

class Calculator {
  constructor(previousNumberTextElement, currentNumberTextElement) {
    this.previousNumberTextElement = previousNumberTextElement;
    this.currentNumberTextElement = currentNumberTextElement;
  }

  calculate() {
    if (
      !this.previousNumberTextElement.innerText &&
      !this.currentNumberTextElement.innerText
    )
      return;

    let previousNumber =
      parseFloat(+this.previousNumberTextElement.innerText.split(" ")[0]);
    let operator = this.previousNumberTextElement.innerText.split(" ")[1];
    let currentNumber = parseFloat(+this.currentNumberTextElement.innerText);

    switch (operator) {
      case "+":
        this.currentNumberTextElement.innerText =
          previousNumber + currentNumber;
        this.clearPrevious();
        break;
      case "-":
        this.currentNumberTextElement.innerText =
          previousNumber - currentNumber;
        this.clearPrevious();
        break;
      case "*":
        this.currentNumberTextElement.innerText =
          previousNumber * currentNumber;
        this.clearPrevious();
        break;
      case "÷":
        this.currentNumberTextElement.innerText =
          previousNumber / currentNumber;
        this.clearPrevious();
        break;
      default:
        return;
    }
  }

  appendNumber(number) {
    if (this.currentNumberTextElement.innerText.includes(".") && number === ".")
      return;
    this.currentNumberTextElement.innerText += number;
  }

  insertPreviousNumber(operator) {
    if (!this.currentNumberTextElement.innerText) return;
    this.previousNumberTextElement.innerText += `${this.currentNumberTextElement.innerText} ${operator}`;
    this.currentNumberTextElement.innerText = "";
  }

  clearAll() {
    this.previousNumberTextElement.innerText = "";
    this.currentNumberTextElement.innerText = "";
  }

  clearPrevious() {
    this.previousNumberTextElement.innerText = "";
  }

  delete() {
    this.currentNumberTextElement.innerText =
      this.currentNumberTextElement.innerText.toString().slice(0, -1);
  }
}

const calculator = new Calculator(
  previousNumberTextElement,
  currentNumberTextElement
);

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
  });
});

operationButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.insertPreviousNumber(operator.innerText);
  });
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
});

allClearButton.addEventListener("click", () => {
  calculator.clearAll();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});
