function CalcFibo(number) {
  let fibList = [0, 1];
  for (i = 2; i <= number; i++) {
    fibList[i] = fibList[i - 1] + fibList[i - 2];
    fibList.push(fibList[i]);
  }
  return fibList[number];
}

function runFiboOnClick() {
  let userInput = document.getElementById("userInput").value;
  let resultShown = (document.getElementById("y-val").innerText = CalcFibo(
    userInput
  ));
  return resultShown;
}

const myButton = document.getElementById("myButton");
myButton.addEventListener("click", runFiboOnClick);
