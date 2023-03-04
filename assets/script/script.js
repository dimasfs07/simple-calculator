const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator__display");
const keys = calculator.querySelector(".calculator__keys");

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const key = e.target;
  const displayedNum = display.textContent;

  display.textContent = createString(key, displayedNum);
});

function createString(key, displayedNum) {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  if (keyType === "clear") {
    return "0";
  }

  if (keyType === "calculate") {
    return eval(displayedNum);
  }
  if (displayedNum === "0" && keyType === "calculate") {
    return "0";
  } else if (displayedNum === "0") {
    return keyContent;
  }
  return displayedNum + keyContent;
}

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return "number";
  if (
    action === "add" ||
    action === "subtract" ||
    action === "divide" ||
    action === "multiply"
  )
    return "operator";
  // for everything else, return the action
  return action;
};
