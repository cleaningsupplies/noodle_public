const items = document.querySelector("#navigation").children;
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

window.addEventListener("resize", responsiveSize);
responsiveSize();


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




