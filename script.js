const navItems = document.querySelectorAll(".navigation");
const navigation = document.querySelector("#navigation");
const items = navigation.children;
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");

const indicators = document.querySelectorAll(".indicator");
const homeContent = document.querySelector(".home .content");
const site_home = document.querySelector(".home");
const site_history = document.querySelector(".history");
const site_today = document.querySelector(".today");

const main_page = document.querySelector(".main_page");
const menu_page = document.querySelector(".menu_page");
const reservation_page = document.querySelector(".reservation_page");

let lastScrollPosition = pageXOffset;
let manualScroll = false;

// LISTENERS
navItems.forEach(item => item.addEventListener("click", switchSite));
logo.addEventListener("click", switchSite);
document.addEventListener("scroll", scrollSubSite);
indicators.forEach(indicator => indicator.addEventListener("click", switchSubSite));
hamburger_menu.addEventListener("click", openNavigation);
window.addEventListener("resize", responsiveSize);

// SITES
function switchSite(event){
    let clicked = event.target;
    removePrevious();
    window.scroll(0,0);
    //when in responsive view and nav item clicked then close navigation again
    if(navigation.className =="navigation open"){
      openNavigation();
    }
    switch(clicked.innerHTML){
      case "home":
        switchToHome();
        break;
      case "menu":
        menu_page.style.display = "";
        break;
      case "reservation":
        reservation_page.style.display = "";
        break;
      default:
        switchToHome();
        break;
    }
    clicked.classList = "active";
}

function switchToHome(){
  main_page.style.display = "";
  removeActiveSubpage();
  indicators[0].classList += " active";
  items[0].classList = "active";
}

function removePrevious(){
  for(let i = 0; i < items.length; i++){
    if(items[i].classList.contains("active")){
      items[i].classList.remove("active");
      if (items[i].innerHTML === "home"){
        main_page.style.display = "none";
      }else if (items[i].innerHTML === "menu"){
        menu_page.style.display = "none";
      }else{
        reservation_page.style.display = "none";
      }
    }
  } 
}

// INIDCATORS/SUBSITES
function scrollSubSite(){
  //check if we are on main page
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
        top: scrollToSubsite(value),
        left: 0,
        behavior: 'smooth'
      });
    }
    setTimeout(()=>manualScroll=false,200);
  }
}

function switchSubSite(event){
    removeActiveSubpage();
    event.target.className += " active";
    let value = event.target.getAttribute("value");
    manualScroll = true;
    window.scroll({
      top: scrollToSubsite(value),
      left: 0,
      behavior: 'smooth'
    });
}

function scrollToSubsite(element){
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
      scrollToSubsite("home"); 
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

// RESPONSIVENESS
function openNavigation() {
  if (navigation.className === "navigation") {
    navigation.className += " open";
  } else {
    navigation.className = "navigation";
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




