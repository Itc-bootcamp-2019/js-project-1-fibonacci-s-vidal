function removeClass(varName, className) {
  varName.classList.remove(className);
}
function addClass(varName, className) {
  varName.classList.add(className);
}
function toggleFunc(varName, className) {
  varName.classList.toggle(className);
}

let calcFiboRecursion = userInput => {
  if (userInput < 0) {
    return "Please enter number above 0";
  } else if (userInput < 2) {
    return userInput;
  } else {
    return calcFiboRecursion(userInput - 1) + calcFiboRecursion(userInput - 2);
  }
};

let serverFiboResults = async sortBy => {
  let showAllData = document.getElementById("showAllData");
  let spinner2 = document.getElementById("spinner2");
  let newFragment = document.createDocumentFragment();
  toggleFunc(spinner2, "disappear");
  let response = await fetch(`http://localhost:5050/getFibonacciResults`);
  {
    let data;
    data = await response.json();
    let allData = data.results;
    allData.sort((a, b) => b.createdDate - a.createdDate);
    if (sortBy === "numberAscending") {
      allData.sort((a, b) => b.number - a.number);
    } else if (sortBy === "numberDescending") {
      allData.sort((a, b) => a.number - b.number);
    } else if (sortBy === "dateAscending") {
      allData.sort((a, b) => b.createdDate - a.createdDate);
    } else {
      allData.sort((a, b) => a.createdDate - b.createdDate);
    }
    showAllData.innerText = " ";
    toggleFunc(spinner2, "disappear");
    for (let i = 0; i < allData.length; i++) {
      let newInputVal = allData[i].number;
      let newCalcVal = allData[i].result;
      let newDate = allData[i].createdDate;
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

let isValidNumber = input => {
  const showError = document.getElementById("showError");
  const userInput = document.getElementById("userInput");
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

let reinitialise = (var1, var2) => {
  toggleFunc(var1, "disappear");
  toggleFunc(var2, "disappear");
  removeClass(var1, "error-message");
  addClass(var1, "show-result");
};

let serverFibo = async userInputValue => {
  const userInput = document.getElementById("userInput");
  const showError = document.getElementById("showError");
  const spinner = document.getElementById("spinner");
  const resultShown = document.getElementById("y-val");
  removeClass(userInput, "input-error");
  removeClass(showError, "show-error");
  if (isValidNumber(userInputValue)) {
    reinitialise(resultShown, spinner);
    let response = await fetch(
      `http://localhost:5050/fibonacci/${userInputValue}`
    );
    let data;
    toggleFunc(spinner, "disappear");
    toggleFunc(resultShown, "disappear");
    serverFiboResults("dateAscending");
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
  let userInputValue = document.getElementById("userInput").value;
  if (checkbox.checked === true) {
    serverFibo(userInputValue);
  } else {
    const resultShown = document.getElementById("y-val");
    addClass(resultShown, "show-result");
    removeClass(resultShown, "error-message");
    resultShown.innerText = calcFiboRecursion(userInputValue);
  }
};

serverFiboResults("dateAscending");

const numberAsc = document.getElementById("numberAsc");
numberAsc.addEventListener("click", () => {
  serverFiboResults("numberAscending");
});
const numberDesc = document.getElementById("numberDesc");
numberDesc.addEventListener("click", () => {
  serverFiboResults("numberDescending");
});
const dateAsc = document.getElementById("dateAsc");
dateAsc.addEventListener("click", () => {
  serverFiboResults("dateAscending");
});
const dateDesc = document.getElementById("dateDesc");
dateDesc.addEventListener("click", () => {
  serverFiboResults("dateDescending");
});

const buttonRunFib = document.getElementById("buttonRunFib");
buttonRunFib.addEventListener("click", isBoxChecked);
