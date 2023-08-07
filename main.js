const dice = document.getElementById("dice");
const advice = document.getElementById("advice");
const adviceNumber = document.getElementById("advice-number");
const turnPreventer = document.getElementById("turn-preventer");
let turns = 0;
const request = new XMLHttpRequest();
request.open("GET", `https://api.adviceslip.com/advice`);
request.send();
request.onreadystatechange = function () {
  if (request.status === 200 && request.readyState === 4) {
    adviceNumber.innerHTML = JSON.parse(request.responseText).slip.id;
    advice.innerHTML = JSON.parse(request.responseText).slip.advice;
    console.log(request.responseText);
  }
};

dice.addEventListener("click", (e) => {
  dice.style.backgroundColor = "hsl(217, 19%, 38%)";
  turnPreventer.style.zIndex = 1;
  setTimeout(() => {
    turnPreventer.style.zIndex = -1;
    dice.style.backgroundColor = "hsl(150, 100%, 66%)";
  }, 2000);
  turns += 5;
  dice.style.transform = `rotate(${turns}turn)`;
  const timestamp = new Date().getTime();
  request.open("GET", `https://api.adviceslip.com/advice?time=${timestamp}`);
  request.send();
  request.onreadystatechange = function () {
    if (request.status === 200 && request.readyState === 4) {
      adviceNumber.innerHTML = JSON.parse(request.responseText).slip.id;
      advice.innerHTML = JSON.parse(request.responseText).slip.advice;
      console.log(request.responseText);
    }
  };
});
