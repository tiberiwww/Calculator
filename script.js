let displayNr = "";
let firstOperator = null;
let secondOperator = null;
let firstOperand = null;
let secondOperand = null;
let result = null;
let firstCalc = true;

let buttons = Array.from(document.querySelectorAll("button"));
console.log(buttons);
// console.log(buttons[16].value);

function update() {
  let display = document.querySelector(".display");
  display.innerText = displayNr.toString().slice(0, 10);
}

function listen() {
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.classList.contains("clear")) {
        AC();
        update();
      }
      if (button.classList.contains("operand") && firstOperator == null) {
        firstOperand = button.value;

        displayNr += firstOperand;
        firstOperand = parseFloat(displayNr);

        update();
      }

      if (button.classList.contains("operator") && secondOperator == null) {
        firstOperator = button.value;
      } else if (
        button.classList.contains("operator") &&
        secondOperator != null
      ) {
        secondOperator = button.value;
        displayNr = operate();

        update();
      }

      if (button.classList.contains("operand") && firstOperator != null) {
        if (secondOperand == null) {
          displayNr = "";
        }
        secondOperand = button.value;

        displayNr += secondOperand;
        secondOperand = parseFloat(displayNr);

        update();
        secondOperator = "=";
      }

      if (button.classList.contains("equals") && firstOperator != null) {
        secondOperator = "=";
        displayNr = operate();

        update();
      }

      if (button.classList.contains("decimal")) {
        if (!displayNr.includes(".")) {
          displayNr += ".";
        }

        update();
      }

      if (button.classList.contains("percent")) {
        displayNr = parseFloat(displayNr) / 100;
        firstOperand = displayNr;

        update();
      }

      if (button.classList.contains("sign")) {
        if (displayNr.toString().includes("-")) {
          displayNr = displayNr.toString().replace("-", "");
          firstOperand = parseFloat(displayNr);
        } else if (!displayNr.toString().includes("-")) {
          displayNr = "-" + displayNr;
          firstOperand = parseFloat(displayNr);
        }

        update();
      }
    });
  });
}
listen();
function inputOperand() {
  displayNr += firstOperand;
}

function operate() {
  let sign = firstOperator;
  switch (sign) {
    case "+":
      result = firstOperand + secondOperand;
      clear();
      break;
    case "-":
      result = firstOperand - secondOperand;
      clear();
      break;
    case "*":
      result = firstOperand * secondOperand;
      clear();
      break;
    case "/":
      if (secondOperand == 0) {
        clear();
        return "Cmon...";
      }
      result = firstOperand / secondOperand;
      clear();
      break;
  }
  return result;
}
function AC() {
  displayNr = "";
  firstOperator = null;
  secondOperator = null;
  firstOperand = null;
  secondOperand = null;
  result = null;
}
function clear() {
  firstOperator = secondOperator;
  secondOperator = null;
  firstOperand = parseFloat(result);
  secondOperand = null;
}

update();
