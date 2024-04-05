// noRandom
const divNo = document.getElementById("no");

let prevX = null;
let prevY = null;

const moveDiv = (event) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  let newX, newY;

  if (prevX === null && prevY === null) {
    newX = cursorX;
    newY = cursorY;
  }
    
  do 
  {
      const offsetX = getRandomOffset();
      const offsetY = getRandomOffset();

      newX = centerX + offsetX;
      newY = centerY + offsetY;
    } while (
      (newX === prevX && newY === prevY) ||
      (Math.abs(newX - cursorX) < 100 && Math.abs(newY - cursorY) < 100) ||
      newX < 0 || newX >= windowWidth ||
      newY < 0 || newY >= windowHeight
    );

  prevX = newX;
  prevY = newY;

  divNo.style.left = `${newX}px`;
  divNo.style.top = `${newY}px`;
};

const getRandomOffset = () => {
  return Math.floor(Math.random() * 400) - 200; 
};

divNo.addEventListener("mouseover", moveDiv);

divNo.addEventListener("click", moveDiv);

// Animation

function yesanimation() {
  logoimg.classList.add("hidden")
  logogif.classList.remove("hidden")
  setTimeout(function() {
      window.location.href = "BlackWeather.html";
  }, 3000);


}

const yes = document.getElementById("yes");
const logoimg = document.getElementById("logoimg");
const logogif = document.getElementById("logogif")

yes.addEventListener("click",yesanimation);
// lang

let cookie = localStorage.getItem("fbdashfbskabfdkhsba87932h98o0wp")

const tip = document.getElementById("tip")
const main = document.getElementById("main")
const no = document.getElementById("tno")
const pl = document.getElementById("pl")
const eng = document.getElementById("eng")
const scam = document.getElementById("scam")
const tyes = document.getElementById("tyes")
if(cookie === null)
{
tip.textContent = "Polecam wybrać Nie"
main.textContent = "Czy masz 18 lat?"
tyes.textContent = "Tak"
no.textContent = "Nie"
scam.textContent = "*Tak = Wyrażasz zgodę na ciasteczka"
}
if(cookie === "pl")
{
tip.textContent = "Polecam wybrać Nie"
main.textContent = "Czy masz 18 lat?"
tyes.textContent = "Tak"
no.textContent = "Nie"
scam.textContent = "Tak = Wyrażasz zgodę na ciasteczka"
}
if(cookie === "eng"){
tip.textContent = "you should choose No"
main.textContent = "Are you over 18?"
tyes.textContent = "Yes"
no.textContent = "No"
scam.textContent = "Yes = You agree to cookies"
}
function feng(){
  tip.textContent = "You should choose No"
  main.textContent = "Are you over 18?"
  tyes.textContent = "Yes"
  no.textContent = "No"
  scam.textContent = "yes = You agree to cookies"
  localStorage.removeItem("fbdashfbskabfdkhsba87932h98o0wp")
  localStorage.setItem("fbdashfbskabfdkhsba87932h98o0wp","eng")
  localStorage.removeItem("sldfndsfma832wjoejfop")
  localStorage.setItem("sldfndsfma832wjoejfop","2")
}
eng.addEventListener("click",feng)
function fpl(){
tip.textContent = "Polecam wybrać Nie"
main.textContent = "Czy masz 18 lat?"
tyes.textContent = "Tak"
no.textContent = "Nie"
scam.textContent = "Tak = Wyrażasz zgodę na ciasteczka"
localStorage.removeItem("fbdashfbskabfdkhsba87932h98o0wp")
localStorage.setItem("fbdashfbskabfdkhsba87932h98o0wp","pl")
localStorage.removeItem("sldfndsfma832wjoejfop")
  localStorage.setItem("sldfndsfma832wjoejfop","0")
}
pl.addEventListener("click",fpl)
///////////// Img anim
function yesanimation() {
  logoimg.classList.add("hidden")
  logogif.classList.remove("hidden")
  setTimeout(function() {
      window.location.href = "BlackWeather.html";
  }, 3000);


}


