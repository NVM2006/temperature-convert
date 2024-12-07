const fromUnit = document.querySelector(".box-from");
const toUnit = document.querySelector(".box-to");
const from = document.querySelector(".from");
const to = document.querySelector(".to");
const convertBtn = document.querySelector("#convert");
const inputNumber = document.querySelector("#inp-number");

function addOrRemove(value) {
  if (value.hasAttribute("hidden")) {
    value.removeAttribute("hidden");
  } else {
    value.setAttribute("hidden", "");
  }
}

fromUnit.addEventListener("click", () => addOrRemove(from));
toUnit.addEventListener("click", () => addOrRemove(to));

const fromList = document.querySelectorAll(".unit-from");
const toList = document.querySelectorAll(".unit-to");

for (let i = 0; i < fromList.length; i++) {
  fromList[i].addEventListener("click", function () {
    const textFrom = fromList[i].textContent;
    const span = document.querySelector(".list-from");
    span.textContent = textFrom;
    checkConvertBtn();
  });
}
for (let i = 0; i < toList.length; i++) {
  toList[i].addEventListener("click", function () {
    const textTo = toList[i].textContent;
    const span = document.querySelector(".list-to");
    span.textContent = textTo;
    checkConvertBtn();
  });
}

function convertTemperature(value, from, to) {
  if (from === "Fahrenheit") {
    if (to === "Celsius") return ((value - 32) * 5) / 9;
    if (to === "Kelvin") return (value - 32) / 1.8 + 273.15;
  }
  if (from === "Celsius") {
    if (to === "Fahrenheit") return (value * 9) / 5 + 32;
    if (to === "Kelvin") return value + 273.15;
  }
  if (from === "Kelvin") {
    if (to === "Celsius") return value - 273.15;
    if (to === "Fahrenheit") return (value - 273.15) * 1.8 + 32;
  }
  return value;
}

convertBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const textFrom = document.querySelector(".list-from").textContent;
  const textTo = document.querySelector(".list-to").textContent;
  const value = parseFloat(inputNumber.value);

  if (!isNaN(value)) {
    const result = convertTemperature(value, textFrom, textTo);
    document.querySelector(".result").textContent = `${value}°${
      textFrom[0]
    } is ${result.toFixed(2)}°${textTo[0]}`;
  } else {
    document.querySelector(".result").textContent = "Invalid input";
  }
});

function checkConvertBtn() {
  const textFrom = document.querySelector(".list-from").textContent;
  const textTo = document.querySelector(".list-to").textContent;
  if (textTo === "To Unit" || textFrom === "From Unit") {
    convertBtn.setAttribute("hidden", "");
  } else {
    convertBtn.removeAttribute("hidden");
  }
}
checkConvertBtn();

window.onload = checkConvertBtn;
document.addEventListener("DOMContentLoaded", checkConvertBtn);
