const navItems = document.querySelectorAll(".navigation");
const navigation = document.querySelector("#navigation");
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
const home_default = document.getElementsByClassName("active")[0];
const indicators = document.querySelectorAll(".indicator");
const homeContent = document.querySelector(".home .content");
const site_home = document.querySelector(".home");
const site_history = document.querySelector(".history");
const site_today = document.querySelector(".today");
const main_page = document.querySelector(".main_page");
const menu_page = document.querySelector(".menu_page");
const reservation_page = document.querySelector(".reservation_page");
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
    top: scro("history"),
    left: 0,
    behavior: 'smooth'
  });
});

function backToHome(){
  
  //check if on other page than home
  if(main_page.style.display == ""){
    window.scrollTo(0,0);
  }else if(menu_page.style.display == "" || reservation_page.style.display == ""){
    removeActive();
    removeActiveSubpage();
    navigation.children[0].classList.add("active")
    console.log(1);
    switchTo("home");
  }else{
    removeActive();
    removeActiveSubpage();
    console.log(2);
    cameFromSwitch = true;
    window.scroll({
      top: scro("home"),
      left: 0,
      behavior: 'smooth'
    });
  }
  indicators[0].className += " active";
  
  
}

// --INIDCATORS/SUBSITES--
function scrollSubSite(){
  //check if we are on main page
  if(main_page.style.display != "none"){
    //check if scroll was initated manually
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
        top: scro(value),
        left: 0,
        behavior: 'smooth'
      });
    }
    setTimeout(()=>cameFromSwitch=false,200);
  }
}

function switchSubSite(event){
    removeActiveSubpage();
    event.target.className += " active";
    let value = event.target.getAttribute("value");
    cameFromSwitch = true;
    window.scroll({
      top: scro(value),
      left: 0,
      behavior: 'smooth'
    });
}

//scrollTo
function scro(element){
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
      scro("home"); 
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

// --SITES--
function switchActive(event){
  //when in responsive view and nav item clicked then close navigation again
  if(navigation.className =="navigation open"){
    openNavigation();
  }
  removeActiveSubpage();
  removeActive();
  indicators[0].classList += " active";
  event.target.classList.add("active");
  let value = event.target.getAttribute("value");
  switchTo(value);
}

function removeActive(){
  let active = document.getElementsByClassName("active");
  active[0].classList.remove("active");
  menu_page.style.display = "none";
  main_page.style.display = "none";
  reservation_page.style.display = "none";
}

function switchTo(site){
  window.scrollTo(0,0);
  switch(site){
    case "home": 
      main_page.style.display = "";
      break;
    case "menu": 
      menu_page.style.display = "";
      break;
    case "reservation": 
      reservation_page.style.display = "";
      break;
  }
}






