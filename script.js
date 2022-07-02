const navItems = document.querySelectorAll(".navigation");
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
const home_default = document.getElementsByClassName("active")[0];
const indicators = document.querySelectorAll(".indicator");
const homeContent = document.querySelector(".home .content");
const site_home = document.querySelector(".home");
const site_history = document.querySelector(".history");
const site_today = document.querySelector(".today");
let site_active = "home";
let lastScrollPosition = pageXOffset;;

hamburger_menu.addEventListener("click", openNavigation);
navItems.forEach(item => item.addEventListener("click", switchActive));
logo.addEventListener("click", backToHome);
indicators.forEach(indicator => indicator.addEventListener("click", switchActiveSubPage));
//homeContent.addEventListener("click", switchToSite("test"));
document.addEventListener("scroll", scrollActiveSubPage);

//TODO scroll up or down
function scrollActiveSubPage(){

  //console.log("up", window.scrollY, site_home.offsetHeight, site_history.offsetHeight);

  let value ="";

  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollPosition){
    //scroll down
    if(window.scrollY >= site_home.offsetHeight+50){
      removeActiveSubpage();
      indicators[2].classList += " active";
      value = "today";  
    }else if (window.scrollY >= 50){
      removeActiveSubpage();
      indicators[1].classList += " active";
      value = "history";  
    }
  } else {
    //scroll up
    if(window.scrollY <= site_home.offsetHeight-50){
      removeActiveSubpage();
      indicators[0].classList += " active";
      value = "home";  
    }else if (window.scrollY >= site_history.offsetHeight-50){
      removeActiveSubpage();
      indicators[1].classList += " active";
      value = "history";  
    }
  }
  lastScrollPosition = st <= 0 ? 0 : st; 
  
  window.scroll({
    top: scrollTo(value),
    left: 0,
    behavior: 'smooth'
  });
}

//TODO check
function switchActiveSubPage(event){
  removeActiveSubpage();
  event.target.className += " active";
  let value = event.target.getAttribute("value");
  window.scroll({
    top: scrollTo(value),
    left: 0,
    behavior: 'smooth'
  });
}

function scrollTo(element){
  let value;
  switch(element){
    case "home": 
      value = 0;
      break;
    case "history": 
      value = site_home.offsetHeight;
      break;
    case "today":
    value = (site_home.offsetHeight*2); 
    break;
    default: scrollTo("home"); break;
  }
  return value;
}

function removeActiveSubpage(){
  indicators.forEach(indicator => {
    if(indicator.className.includes("active")){
        indicator.classList.remove("active");
    }
  });
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
  switchToSite(value);
}

function removeActive(){
  let active = document.getElementsByClassName("active");
  active[0].classList.remove("active");
}





function switchToSite(site){
  switch(site){
    case "home": 
      break;
    case "menu": break;
    case "reservation": break;
    case "history": 

      break;
    case "today": break;
    default: switchToSite("home"); break;
  }
}


/* RESPONSIVENESS */
//changing between responsive or normal layout
function openNavigation() {
  var x = document.getElementById("navigation");
  if (x.className === "navigation") {
    x.className += " responsive";
  } else {
    x.className = "navigation";
  }
}

