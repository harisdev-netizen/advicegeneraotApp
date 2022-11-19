const adviceBtn = document.getElementById("adviceBtn");
const adviceNum = document.getElementById("adviceNum");
const adviceText = document.getElementById("adviceText");
const card = document.getElementById("card");
const endpoint = "https://api.adviceslip.com/advice";
let clicked = false;

function getAdvice() {
  startLoading();

  fetch(endpoint)
    .then((response) => response.json())
    .then((advice) => {
      adviceNum.innerText = advice.slip.id;
      adviceText.innerText = advice.slip.advice;
    })
    .catch((err) => console.log(err))
    .finally(() => finishLoading());
}

function startLoading() {
  card.style.opacity = 0;
}

function finishLoading() {
  card.style.opacity = 1;
}

function needAdvice() {
  if (clicked) {
    startLoading();

    setTimeout(() => {
      adviceNum.innerText = "0";
      adviceText.innerText = "Did you actually read the previous advice?";

      finishLoading();
    }, 500);
  } else {
    clicked = true;

    getAdvice();

    setTimeout(() => {
      clicked = false;
    }, 5000);
  }
}

window.onload = () => getAdvice();

adviceBtn.addEventListener("click", needAdvice);