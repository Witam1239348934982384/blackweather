const textbar = document.getElementById('textbar')
const searchicon = document.getElementById('searchicon')
const error = document.getElementById("error")

searchicon.addEventListener("click", function(){
  locationfixaftermode()
  searchfunction()
})
textbar.addEventListener("keydown" ,function(event){ 
 if (event.key === 'Enter'){
  locationfixaftermode()
  searchfunction()
 }
 })
let locate
let lang = "pl"
let units = "metric"
let interval;
function locationfixaftermode(){
locate = textbar.value
}
function searchfunction() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locate}&lang=${lang}&appid=96c1a7a698e8862ceb07458d1fa004a7&units=${units}`) 
  .then(response => response.json())
  .then(data => {
  
    const shown = document.getElementById('h1')
    const placeholder = document.getElementById('h2')
    if (data.cod === "404") {
      error.classList.remove("hidden")
      setTimeout(function() {
        error.classList.add("hidden")
        }, 4000);
      
      placeholder.classList.add("hiddenanim")
      setTimeout(function() {
        shown.classList.add("placeholder")
        placeholder.classList.remove("s2")
        placeholder.classList.add("hidden")
        }, 1000);
      // shown.classList.add("placeholder")
      // placeholder.classList.remove("s2")
      // placeholder.classList.add("hidden")

      if (interval) clearInterval(interval);
      return;
    }  
    if (interval) clearInterval(interval);
    
    if(locate === ""){
      
      placeholder.classList.add("hiddenanim")
      setTimeout(function() {
        shown.classList.add("placeholder")
        placeholder.classList.remove("s2")
        placeholder.classList.add("hidden")
        }, 1000);
    }
    const city = data.name;
    document.getElementById("city").textContent = city;
    
    const temp = data.main.temp;
    const temp1 = Math.round(temp);
    document.getElementById("temp").textContent = temp1;
    
    const humidity = data.main.humidity
    document.getElementById("humidity").textContent = humidity;
    
    const weather = data.weather
    for (let i = 0; i < weather.length; i++) {
    document.getElementById("weather").textContent = weather[i].description
    }
    
    const icon = data.weather
    for (let i = 0; i < weather.length; i++) {
       const iconname ="/icons/"+icon[i].icon + ".png"
       const obrazek = document.getElementById("image");
       obrazek.src = iconname;
    }
  

    const wind = data.wind.speed 
    document.getElementById("wind").textContent = wind;
    
    ////////////////time
    function whatstime(){

      function adjustValue(value) {
        if (value > 24) {
            return value - 24;
        } else if (value < 1) {
            return 24 + value;
        } else {
            return value;
        }
      }
    const timezone1 = data.timezone
    const timezone = timezone1 /60 /60;
    
    const currentDate = new Date();
    const hours = (currentDate.getUTCHours() < 10 ? '0' : '') + currentDate.getUTCHours();
    const minutes = (currentDate.getUTCMinutes() < 10 ? '0' : '') + currentDate.getUTCMinutes();
    
    let godzinynaliczbe = parseInt(hours)
    if(timezone >= 0)
    {
      godzinynaliczbe = adjustValue(godzinynaliczbe + timezone); 
    }else{
      const ifa = timezone * -1
      godzinynaliczbe = adjustValue(godzinynaliczbe - ifa); 
    }
    
    const formattedTime = godzinynaliczbe + ':' + minutes
    document.getElementById("timezone").textContent = formattedTime;
    // console.log(formattedTime)
    }
    whatstime()
    
    interval = setInterval(whatstime, 3000)

    const a2 = document.getElementById("a2")
    const a23 = document.getElementById("a23")

    shown.classList.remove("placeholder")
    placeholder.classList.add("s2")
    placeholder.classList.remove("hidden")
    setTimeout(function() {
      placeholder.classList.remove("hiddenanim")
      }, 1);
    
   }) .catch(error =>{
    //console.error(error);
  })
}

////////Units toogle
const tempmode = document.getElementById("tempmode")
const windunit = document.getElementById("windunit")

let unitnumber1 = localStorage.getItem("jnkfsad72soufdnansjk")
if(unitnumber1 === null){
  units = "metric"
  tempmode.textContent = "C°"
  windunit.textContent = "m/s"
  unitnumber1 = 0
  }
let unitnumber = parseInt(unitnumber1)
if(unitnumber === 2){
  units = "imperial"
  tempmode.textContent = "F°"
  windunit.textContent = "mph"
  unitnumber++
}
if(unitnumber === 0){
 units = "metric"
 tempmode.textContent = "C°"
 windunit.textContent = "m/s"
}
function naimp(){
  units = "imperial"
  tempmode.textContent = "F°"
  windunit.textContent = "mph"
  searchfunction()
  localStorage.removeItem("jnkfsad72soufdnansjk")
  localStorage.setItem("jnkfsad72soufdnansjk","2")
}
function namet(){
units = "metric"
tempmode.textContent = "C°"
windunit.textContent = "m/s"
searchfunction()
localStorage.removeItem("jnkfsad72soufdnansjk")
localStorage.setItem("jnkfsad72soufdnansjk","0")
}
   function toogleunit() {
    if (unitnumber % 2 === 0) {
      naimp();
    } else {
      namet();
    }
    unitnumber++;
  }
tempmode.addEventListener("click" , toogleunit)
//Lang toogle
const langmode = document.getElementById("langmode")
const wtxt = document.getElementById("wtxt")
const ttxt = document.getElementById("ttxt")
const htxt = document.getElementById("htxt")


let langstatus1 = localStorage.getItem("sldfndsfma832wjoejfop")

if(langstatus1 === null)
{
  lang = "pl"
  langmode.textContent = "PL"
  textbar.placeholder = "Lokalizacja"
  wtxt.textContent = "Wiatr"
  ttxt.textContent = "Godzina"
  htxt.textContent = "Wilgotność"
  error.textContent = "Lokacja nie istnieje"
  langstatus1 = 0
} 
let langstatus = parseInt(langstatus1)

if(langstatus === 2){
  lang = "en"
  langmode.textContent = "EN"
  textbar.placeholder = "Location"
  wtxt.textContent = "Wind"
  ttxt.textContent = "Time"
  htxt.textContent = "Humidity"
  error.textContent = "Location not found"
  langstatus++

}
if(langstatus === 0){
  lang = "pl"
  langmode.textContent = "PL"
  textbar.placeholder = "Lokalizacja"
  wtxt.textContent = "Wiatr"
  ttxt.textContent = "Godzina"
  htxt.textContent = "Wilgotność"
  error.textContent = "Lokacja nie istnieje"
}


   function toen(){
  lang = "en"
  langmode.textContent = "EN"
  textbar.placeholder = "Location"
  wtxt.textContent = "Wind"
  ttxt.textContent = "Time"
  htxt.textContent = "Humidity"
  error.textContent = "Location not found"
  localStorage.removeItem("sldfndsfma832wjoejfop")
  localStorage.setItem("sldfndsfma832wjoejfop","2")
  localStorage.removeItem("fbdashfbskabfdkhsba87932h98o0wp")
  localStorage.setItem("fbdashfbskabfdkhsba87932h98o0wp","eng")
   }
  function topl(){
  lang = "pl"
  langmode.textContent = "PL"
  textbar.placeholder = "Lokalizacja"
  wtxt.textContent = "Wiatr"
  ttxt.textContent = "Godzina"
  htxt.textContent = "Wilgotność"
  error.textContent = "Lokacja nie istnieje"
  localStorage.removeItem("sldfndsfma832wjoejfop")
  localStorage.setItem("sldfndsfma832wjoejfop","0")
  localStorage.removeItem("fbdashfbskabfdkhsba87932h98o0wp")
  localStorage.setItem("fbdashfbskabfdkhsba87932h98o0wp","pl")
   }

function tooglelang() {
    if (langstatus % 2 === 0) {
      toen();
    } else {
      topl();
    }
    langstatus++;
    searchfunction()
  }
langmode.addEventListener("click" , tooglelang)
////////////////// Dark/Might Mode
const css1 = document.getElementById("css1")
const mode = document.getElementById("mode")
const jasny = 'light_mode'
const ciemny = 'dark_mode'

let modenumber1 = localStorage.getItem("djnasf923huewnnkdsad")

if(modenumber1 === null)
{
  css1.href = '/css/darkmode.css';
  mode.textContent = "dark_mode"
  modenumber1 = 0
}
let modenumber = parseInt(modenumber1)

if(modenumber === 2){
  css1.href = '/css/lightmode.css';
  mode.textContent = "light_mode"
  modenumber++
}
if(modenumber === 0){
  css1.href = '/css/darkmode.css';
  mode.textContent = "dark_mode"
}

function tooglemode() {
if (modenumber % 2 === 0) {
  tolight();
} else {
  todark();
}
modenumber++;
}

function tolight(){
  css1.href = '/css/lightmode.css';
  mode.textContent = "light_mode"
  localStorage.removeItem("djnasf923huewnnkdsad")
  localStorage.setItem("djnasf923huewnnkdsad","2")
}
function todark(){
    css1.href = '/css/darkmode.css';
    mode.textContent = "dark_mode"
    localStorage.removeItem("djnasf923huewnnkdsad")
    localStorage.setItem("djnasf923huewnnkdsad","0")
    
}
mode.addEventListener("click",tooglemode)
////////////Footer year
const footerdate = new Date();
const footeryear = footerdate.getFullYear();
document.getElementById("year").textContent = footeryear;
//////////fix
const fix = document.getElementById("search")
setTimeout(function() {
fix.classList.remove("hidden")
fix.classList.add("search")
}, 70);






