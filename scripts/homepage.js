const c = console.log.bind(console);
const items = document.querySelector("#navigation").children;
const indicators = document.querySelectorAll(".indicator");
const homeContent = document.querySelector(".home .content");
const site_home = document.querySelector(".home");
const site_history = document.querySelector(".history");
const site_today = document.querySelector(".today");
const main_page = document.querySelector(".main_page");

//safari
document.addEventListener("scroll", scrollSubSite);
//chrome, edge & firefox
main_page.addEventListener("scroll", scrollSubSiteCE);

homeContent.addEventListener("click", switchSubSite);
indicators.forEach(indicator => indicator.addEventListener("click", switchSubSite));
let lastScrollPosition = pageYOffset;
let manualScroll = false;

window.addEventListener("resize", responsiveSize);
responsiveSize();

let activeSubsite = "home";

// ** SCROLLING SUBPAGES ON HOMEPAGE **

//chrome & edge
function scrollSubSiteCE(e){
  
  let atSnappingPoint = e.target.scrollTop % e.target.offsetHeight === 0;
  let timeOut = atSnappingPoint ? 0 : 100; 
  let value = "";
  let position = main_page.scrollTop;

  clearTimeout(e.target.scrollTimeout); //clear previous timeout

  e.target.scrollTimeout = setTimeout(function() {
    if(items[0].classList.contains("active")){
      
      if(position < main_page.offsetHeight){
        removeActiveSubpage();
        indicators[0].classList += " active";
      }else if (position >= main_page.offsetHeight && position < (main_page.offsetHeight*2)){
        removeActiveSubpage();
        indicators[1].classList += " active";
      }else{
        removeActiveSubpage();
        indicators[2].classList += " active";
      }
    }
  }, timeOut);

  if(detectBrowser() === "Firefox"){
    if (position > lastScrollPosition){
      //scroll down
      if(position >= site_home.offsetHeight+10){
        value = "today";
      }else if (position >= 10){
        value = "history";  
      }
    } else {
      if(position <= site_home.offsetHeight-10){
        value = "home";  
      }else if (position <= (site_home.offsetHeight*2)-10){
        value = "history";  
      }
    }
    lastScrollPosition = position <= 0 ? 0 : position; 

    main_page.scroll({
      top: getScrollValue(value),
      left: 0,
      behavior: 'smooth'
    });
  }
}

//safari & firefox
function scrollSubSite(){
  c("here")
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
        }else if (window.scrollY <= (site_home.offsetHeight*2)-10){
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
    if(detectBrowser() === "Safari"){
      window.scroll({
        top: getScrollValue(value),
        left: 0,
        behavior: 'smooth'
      });
    }else if(detectBrowser() === "Chrome"||detectBrowser() === "Firefox" ||detectBrowser() === "Opera"){
      main_page.scroll({
        top: getScrollValue(value),
        left: 0,
        behavior: 'smooth'
      });
    }
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
// right now handling responsiveness on homepage
function responsiveSize(){
  if(window.innerWidth <= 600){
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

function detectBrowser() { 
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
      return 'Opera';
  } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
      return 'Chrome';
  } else if(navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
  } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
      return 'Firefox';
  } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
      return 'IE';
  } else {
      return 'Unknown';
  }
} 




