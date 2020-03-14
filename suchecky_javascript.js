function removeClass(varName, className) {
  varName.classList.remove(className);
}
function addClass(varName, className) {
  varName.classList.add(className);
}
function toggleFunc(varName, className) {
  varName.classList.toggle(className);
}

let reinitialise = () => {
  let resultShown = document.getElementById("y-val");
  let spinner = document.getElementById("spinner");
  toggleFunc(resultShown, "disappear");
  toggleFunc(spinner, "disappear");
  removeClass(resultShown, "error-message");
  addClass(resultShown, "show-result");
};

let calcFiboRecursion = userInput => {
  if (userInput < 2) {
    return userInput;
  } else {
    return calcFiboRecursion(userInput - 1) + calcFiboRecursion(userInput - 2);
  }
};

let isValidNumber = input => {
  let showError = document.getElementById("showError");
  let userInput = document.getElementById("userInput");
  if (input > 50) {
    let CheckDisappear = document.getElementById("CheckDisappear");
    const resultShown = document.getElementById("y-val");
    addClass(CheckDisappear, "disappear");
    addClass(resultShown, "disappear");
    addClass(userInput, "input-error");
    addClass(showError, "show-error");
    showError.innerText = "Can't be larger than 50";
    setTimeout(() => {
      showError.innerText = " ";
      resultShown.innerText = " ";
      removeClass(userInput, "input-error");
      removeClass(showError, "show-error");
      removeClass(CheckDisappear, "disappear");
      removeClass(resultShown, "disappear");
    }, 1500);
    return false;
  }
  return true;
};
let serverFiboResults = async () => {
  let showAllData = document.getElementById("showAllData");
  let spinner2 = document.getElementById("spinner2");
  let newFragment = document.createDocumentFragment();
  let response = await fetch(`http://localhost:5050/getFibonacciResults`);
  {
    let data;
    data = await response.json();
    let allData = data.results;
    let sortByDate = allData.sort((a, b) => b.createdDate - a.createdDate);
    showAllData.innerText = " ";
    toggleFunc(spinner2, "disappear");
    for (let i = 0; i < allData.length; i++) {
      let newInputVal = sortByDate[i].number;
      let newCalcVal = sortByDate[i].result;
      let newDate = sortByDate[i].createdDate;
      let convertedDate = new Date(newDate).toString();
      let newLine = `The Fibonnaci of <b> ${newInputVal} </b> is <b> ${newCalcVal} </b>. Calculated at: ${convertedDate}`;
      let newLi = document.createElement("LI");
      newLi.innerHTML = newLine;
      newFragment.append(newLi);
      addClass(showAllData, "ul-style");
      addClass(newLi, "underline");
    }
    showAllData.appendChild(newFragment);
  }
};

let serverFibo = async () => {
  const userInput = document.getElementById("userInput");
  const showError = document.getElementById("showError");
  let userInputValue = userInput.value;
  const spinner = document.getElementById("spinner");
  const resultShown = document.getElementById("y-val");
  const spinner2 = document.getElementById("spinner2");
  removeClass(userInput, "input-error");
  removeClass(showError, "show-error");
  if (isValidNumber(userInputValue)) {
    reinitialise();
    toggleFunc(spinner2, "disappear");
    let response = await fetch(
      `http://localhost:5050/fibonacci/${userInputValue}`
    );
    let data;
    toggleFunc(spinner, "disappear");
    toggleFunc(resultShown, "disappear");
    serverFiboResults();
    if (response.ok) {
      data = await response.json();
      let dataResult = data.result;
      resultShown.innerText = dataResult;
    } else {
      data = await response.text();
      resultShown.innerText = `Server error: ${data}`;
      removeClass(resultShown, "show-result");
      addClass(resultShown, "error-message");
    }
  }
};

let isBoxChecked = () => {
  const checkbox = document.getElementById("customCheck");
  let userInput = document.getElementById("userInput").value;
  if (checkbox.checked === true) {
    serverFibo();
  } else {
    const resultShown = document.getElementById("y-val");
    addClass(resultShown, "show-result");
    removeClass(resultShown, "error-message");
    resultShown.innerText = calcFiboRecursion(userInput);
  }
};

const buttonRunFib = document.getElementById("buttonRunFib");
buttonRunFib.addEventListener("click", isBoxChecked);
