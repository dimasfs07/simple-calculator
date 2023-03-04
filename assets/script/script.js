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
function eval(expression) {
  expression = expression.replace(/\s/g, "");
  return helper(Array.from(expression), 0);
}

function helper(s, idx) {
  var stk = [];
  let sign = "+";
  let num = 0;
  for (let i = idx; i < s.length; i++) {
    let c = s[i];
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c - "0");
    }
    if (!(c >= "0" && c <= "9") || i === s.length - 1) {
      if (c === "(") {
        num = helper(s, i + 1);
        let l = 1,
          r = 0;
        for (let j = i + 1; j < s.length; j++) {
          if (s[j] === ")") {
            r++;
            if (r === l) {
              i = j;
              break;
            }
          } else if (s[j] === "(") l++;
        }
      }
      let pre = -1;
      switch (sign) {
        case "+":
          stk.push(num);
          break;
        case "-":
          stk.push(num * -1);
          break;
        case "*":
          pre = stk.pop();
          stk.push(pre * num);
          break;
        case "/":
          pre = stk.pop();
          stk.push(pre / num);
          break;
      }
      sign = c;
      num = 0;
      if (c === ")") break;
    }
  }
  let ans = 0;
  while (stk.length > 0) {
    ans += stk.pop();
  }
  return ans;
}
