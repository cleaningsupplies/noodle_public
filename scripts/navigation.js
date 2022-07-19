const navigation = document.querySelector("#navigation");
const hamburger_menu = document.querySelector(".icon");
hamburger_menu.addEventListener("click", openNavigation);

window.addEventListener("resize", responsiveSize);
responsiveSize();

// check click outside of nav menu when in responsive view
document.addEventListener('click', function(event) {
  event = event || window.event;
  let target = event.target || event.srcElement;

  if(navigation.className === "navigation open" && target.className != "navigation open" && target.className != "icon"){
    openNavigation();
  }
}, false);

//open and close hamburger menu
function openNavigation() {
     if (navigation.className === "navigation close"||navigation.className === "navigation") {
       navigation.className = "navigation open";
     } else {
       navigation.className = "navigation close";
     }
}

function responsiveSize(){
     if(window.innerWidth >1200){
       navigation.className = "navigation";
     }
}