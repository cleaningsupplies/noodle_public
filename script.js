const navItems = document.querySelectorAll(".navigation");
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
const home_default = document.getElementsByClassName("active")[0];
const indicators = document.querySelectorAll(".indicator");

hamburger_menu.addEventListener("click", openNavigation);
navItems.forEach(item => item.addEventListener("click", switchActive));
logo.addEventListener("click", backToHome);
indicators.forEach(indicator => indicator.addEventListener("click", switchActiveSubPage))

//changing between responsive or normal layout
function openNavigation() {
  var x = document.getElementById("navigation");
  if (x.className === "navigation") {
    x.className += " responsive";
  } else {
    x.className = "navigation";
  }
}

//switch between sites
//clicking logo on left
function backToHome(){
  removeActive();
  home_default.classList.add("active");
  removeActiveSubpage();
  indicators[0].className += " active";
  //switchSite("home");
}

function switchActive(event){
  removeActive();
  event.target.classList.add("active");
  let value = event.target.getAttribute("value");
  console.log(value);
  //TODO: switch to site
}

function removeActive(){
  let active = document.getElementsByClassName("active");
  active[0].classList.remove("active");
}

function switchActiveSubPage(event){
  removeActiveSubpage();
  event.target.className += " active";
  let value = event.target.getAttribute("value");
  
  //TODO switch to subpage
}

function removeActiveSubpage(){
  indicators.forEach(indicator => {
    if(indicator.className.includes("active")){
        indicator.classList.remove("active");
    }
  });
}

function switchToSite(site){
  const body = document.body;
  switch(site){
    case "home": 
      body.style.background=null;
      break;
    case "menu": break;
    case "reservation": break;
    case "history": 
      body.style.background="none";
      break;
    case "today": break;
    default: switchToSite("home"); break;
  }
}