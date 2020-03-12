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

let isValidNumber = input => {
  let showError = document.getElementById("showError");
  if (input > 50) {
    addClass(userInput, "input-error");
    addClass(showError, "show-error");
    showError.innerText = "Can't be larger than 50";
    return false;
  }
  return true;
};
let serverFiboResults = () => {
  let showAllData = document.getElementById("showAllData");
  let spinner2 = document.getElementById("spinner2");
  let newFragment = document.createDocumentFragment();
  fetch(`http://localhost:5050/getFibonacciResults`).then(response => {
    response.json().then(data => {
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
    });
  });
};
let serverFibo = () => {
  let userInput = document.getElementById("userInput");
  let showError = document.getElementById("showError");
  let userInputValue = userInput.value;
  let spinner = document.getElementById("spinner");
  let resultShown = document.getElementById("y-val");
  let spinner2 = document.getElementById("spinner2");
  removeClass(userInput, "input-error");
  removeClass(showError, "show-error");
  showError.innerText = " ";
  if (isValidNumber(userInputValue)) {
    reinitialise();
    toggleFunc(spinner2, "disappear");
    fetch(`http://localhost:5050/fibonacci/${userInputValue}`).then(
      response => {
        toggleFunc(spinner, "disappear");
        toggleFunc(resultShown, "disappear");
        serverFiboResults();
        if (response.ok) {
          response.json().then(data => {
            let dataResult = data.result;
            resultShown.innerText = dataResult;
          });
        } else {
          response.text().then(text => {
            resultShown.innerText = `Server error: ${text}`;
            removeClass(resultShown, "show-result");
            addClass(resultShown, "error-message");
          });
        }
      }
    );
  }
};

const buttonRunFib = document.getElementById("buttonRunFib");
buttonRunFib.addEventListener("click", serverFibo);
