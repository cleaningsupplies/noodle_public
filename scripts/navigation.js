const navigation = document.querySelector("#navigation");
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
hamburger_menu.addEventListener("click", openNavigation);

window.addEventListener("resize", responsiveSize);
responsiveSize();

//open and close hamburger menu
function openNavigation() {
     if (navigation.className === "navigation close"||navigation.className === "navigation") {
       navigation.className = "navigation open";
     } else {
       navigation.className = "navigation close";
     }
}

function responsiveSize(){
     if(window.innerWidth <= 884){
     }else{
       navigation.className = "navigation";
     }
   }