function removeClass(varName, className) {
  varName.classList.remove(className);
}
function addClass(varName, className) {
  varName.classList.add(className);
}
function changeInnerText(varName, innerText) {
  varName.innerText = innerText;
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
    changeInnerText(showError, "Can't be larger than 50");
    return false;
  } else {
    return true;
  }
};

let serverFibo = () => {
  let userInput = document.getElementById("userInput");
  let showError = document.getElementById("showError");
  let userInputValue = userInput.value;
  let spinner = document.getElementById("spinner");
  let resultShown = document.getElementById("y-val");
  removeClass(userInput, "input-error");
  removeClass(showError, "show-error");
  changeInnerText(showError, "");
  if (isValidNumber(userInputValue)) {
    reinitialise();
    fetch(`http://localhost:5050/fibonacci/${userInputValue}`).then(
      response => {
        toggleFunc(spinner, "disappear");
        toggleFunc(resultShown, "disappear");
        if (response.ok) {
          response.json().then(data => {
            let dataResult = data.result;
            changeInnerText(resultShown, dataResult);
          });
        } else {
          response.text().then(text => {
            changeInnerText(resultShown, `Server error: ${text}`);
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
