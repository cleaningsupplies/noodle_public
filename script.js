//Navigation
const navItems = document.querySelectorAll(".navigation");
const navigation = document.querySelector("#navigation");
const items = navigation.children;
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
navItems.forEach(item => item.addEventListener("click", switchSite));
logo.addEventListener("click", switchSite);
hamburger_menu.addEventListener("click", openNavigation);

//Homepage
const indicators = document.querySelectorAll(".indicator");
const homeContent = document.querySelector(".home .content");
const site_home = document.querySelector(".home");
const site_history = document.querySelector(".history");
const site_today = document.querySelector(".today");
const main_page = document.querySelector(".main_page");
document.addEventListener("scroll", scrollSubSite);
homeContent.addEventListener("click", switchSubSite);
indicators.forEach(indicator => indicator.addEventListener("click", switchSubSite));
let lastScrollPosition = pageXOffset;
let manualScroll = false;

//Menu
const menu_page = document.querySelector(".menu_page");

//Reservation
const reservation_page = document.querySelector(".reservation_page");

//General
window.addEventListener("resize", responsiveSize);
responsiveSize();

// ** SWITCHING BETWEEN SITE-PAGES **

function switchSite(event){
    //scroll back up on homepage
    window.scroll(0,0);

    //when in responsive view and nav item clicked then close navigation again
    if(navigation.className =="navigation open"){ openNavigation(); }

    let clicked = event.target;
    //remove previous attributes
    removePrevious();
    //switch to clicked page
    switch(clicked.getAttribute("value")){
      case "home": switchToHome(); break;
      case "menu": menu_page.style.display = ""; break;
      case "reservation": reservation_page.style.display = ""; break;
      default: switchToHome(); break;
    }
    clicked.classList = "active";
}

//remove previous attributes before switching to clicked page
function removePrevious(){
  for(let i = 0; i < items.length; i++){
    if(items[i].classList.contains("active")){
      items[i].classList.remove("active");
      switch(items[i].getAttribute("value")){
        case "home": main_page.style.display = "none"; break;
        case "menu": menu_page.style.display = "none"; break;
        case "reservation": reservation_page.style.display = "none"; break;
      }
    }
  } 
}

//exception to switch back to hompage since there are many options one can come from
function switchToHome(){
  main_page.style.display = "";
  removeActiveSubpage();
  indicators[0].classList += " active";
  items[0].classList = "active";
}

// ** SCROLLING SUBPAGES ON HOMEPAGE **

function scrollSubSite(){
  //check if we are on homepage
  if(items[0].classList.contains("active")){
    //check if scroll was initated manually
    if (!manualScroll) {
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
        top: getScrollValue(value),
        left: 0,
        behavior: 'smooth'
      });
    }
    setTimeout(() => manualScroll=false,200);
  }
}

//when clicking on indicators switch to chosen subpage
function switchSubSite(event){
    removeActiveSubpage();
    event.target.className += " active";
    let value = event.target.getAttribute("value");
    //exception when clicking on text on homepage/top-subpage
    if(value == null){
      value = "history";
      indicators[1].className += " active";
    }
    manualScroll = true;
    window.scroll({
      top: getScrollValue(value),
      left: 0,
      behavior: 'smooth'
    });
}

//retrieving value to which window should be scrolled. Works responsive as well
function getScrollValue(element){
  let value;
  switch(element){
    case "home": value = 0; break;
    case "history": value = site_home.offsetHeight; break;
    case "today": value = (site_home.offsetHeight*2); break;
    default: getScrollValue("home"); break;
  }
  return value;
}

//remove previous attributes before scrolling to selected subpage
function removeActiveSubpage(){
  indicators.forEach(indicator => {
    if(indicator.className.includes("active")){
        indicator.classList.remove("active");
    }
  });
}

// ** RESPONSIVENESS **

//open and close hamburger menu
function openNavigation() {
  if (navigation.className === "navigation close"||navigation.className === "navigation") {
    navigation.className = "navigation open";
  } else {
    navigation.className = "navigation close";
  }
}

// right now handling responsiveness on homepage
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

    navigation.className = "navigation";
  }
}




