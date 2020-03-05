function serverFibo() {
  let userInput = document.getElementById("userInput").value;
  fetch(`http://localhost:5050/fibonacci/${userInput}`)
    .then(res => res.json())
    .then(function(data) {
      let dataResult = data.result;
      let resultShown = (document.getElementById(
        "y-val"
      ).innerText = dataResult);
    });
}

const myButton = document.getElementById("myButton");
myButton.addEventListener("click", serverFibo);
