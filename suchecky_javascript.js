function calcFiboRecursion(number) {
  if (number == 1) {
    return 1;
  } else if (number == 0) {
    return 0;
  } else {
    return calcFiboRecursion(number - 1) + calcFiboRecursion(number - 2);
  }
}

function runFiboOnClick() {
  let userInput = document.getElementById("userInput").value;
  let resultShown = (document.getElementById(
    "y-val"
  ).innerText = calcFiboRecursion(userInput));
  return resultShown;
}

const myButton = document.getElementById("myButton");
myButton.addEventListener("click", runFiboOnClick);
