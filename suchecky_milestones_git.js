function CalcFibo(number) {
  let fibList = [0, 1];
  for (i = 2; i <= number; i++) {
    fibList[i] = fibList[i - 1] + fibList[i - 2];
    fibList.push(fibList[i]);
  }
  return fibList[number];
}

let userInput = (document.getElementById("x-val").innerText = 8);
let calculatedFib = (document.getElementById("y-val").innerText = CalcFibo(8));
