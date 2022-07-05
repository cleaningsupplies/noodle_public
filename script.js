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
let lastScrollPosition = pageXOffset;
let cameFromSwitch = false;

// --LISTENERS--
hamburger_menu.addEventListener("click", openNavigation);
navItems.forEach(item => item.addEventListener("click", switchActive));
logo.addEventListener("click", backToHome);
indicators.forEach(indicator => indicator.addEventListener("click", switchSubSite));
document.addEventListener("scroll", scrollSubSite);
window.addEventListener("resize", responsiveSize);

// --EXCEPTIONS--
homeContent.addEventListener("click", ()=> {
  window.scroll({
    top: scrollTo("history"),
    left: 0,
    behavior: 'smooth'
  });
});

function backToHome(){
  removeActiveSubpage();
  indicators[0].className += " active";
  cameFromSwitch = true;
  window.scroll({
    top: scrollTo("home"),
    left: 0,
    behavior: 'smooth'
  });
}

// --INIDCATORS/SUBSITES--
function scrollSubSite(){
  if (!cameFromSwitch) {
    let value = "";
    let position = window.pageYOffset || document.documentElement.scrollTop;
    
    if (position > lastScrollPosition){
      //scroll down
      if(window.scrollY >= site_home.offsetHeight+10){
        removeActiveSubpage();
        indicators[2].classList += " active";
        value = "today";  
      }else if (window.scrollY >= 10){
        removeActiveSubpage();
        indicators[1].classList += " active";
        value = "history";  
      }
    } else {
      //scroll up
      if(window.scrollY <= site_home.offsetHeight-10){
        removeActiveSubpage();
        indicators[0].classList += " active";
        value = "home";  
      }else if (window.scrollY >= site_history.offsetHeight-10){
        removeActiveSubpage();
        indicators[1].classList += " active";
        value = "history";  
      }
    }
    lastScrollPosition = position <= 0 ? 0 : position; 
    
    window.scroll({
      top: scrollTo(value),
      left: 0,
      behavior: 'smooth'
    });
  }
  setTimeout(()=>cameFromSwitch=false,200);
}

function switchSubSite(event){
    removeActiveSubpage();
    event.target.className += " active";
    let value = event.target.getAttribute("value");
    cameFromSwitch = true;
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
    default: 
      scrollTo("home"); 
      break;
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

/* RESPONSIVENESS */
//TODO make pretty
function openNavigation() {
  var x = document.getElementById("navigation");
  if (x.className === "navigation") {
    x.className += " responsive";
  } else {
    x.className = "navigation";
  }
}

function responsiveSize(){
  if(window.innerWidth <= 884){
    //History
    site_history.className = "rehistory";
    document.querySelector(".rehistory .content").className = "recontent";
    document.querySelector(".rehistory .recontent .text").className = "retext";
    document.querySelector(".rehistory .recontent .img").className = "reimg";
    //Today
    site_today.className = "retoday";
    document.querySelector(".retoday .content").className = "recontent";
    document.querySelector(".retoday .recontent .text").className = "retext";
    document.querySelector(".retoday .recontent .img").className = "reimg";
  }else{
    //History
    site_history.className = "history";
    document.querySelector(".history .recontent").className = "history content";
    document.querySelector(".history .content .retext").className = "text";
    document.querySelector(".history .content .reimg").className = "img";
    //Today
    site_today.className = "today";
    document.querySelector(".today .recontent").className = "today content";
    document.querySelector(".today .content .retext").className = "text";
    document.querySelector(".today .content .reimg").className = "img";
  }
}

// --SITES--
function switchActive(event){
  removeActive();
  event.target.classList.add("active");
  let value = event.target.getAttribute("value");
  switchTo(value);
}

function removeActive(){
  let active = document.getElementsByClassName("active");
  active[0].classList.remove("active");
}

function switchTo(site){
  switch(site){
    case "home": 
      break;
    case "menu": 
    console.log(site);
      break;
    case "reservation": 
      break;
    default: 
      switchToSite("home");
      break;
  }
}






