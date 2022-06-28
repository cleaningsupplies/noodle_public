const navItems = document.querySelectorAll(".navigation");
const logo = document.querySelector(".logo");
const hamburger_menu = document.querySelector(".icon");
const home_default = document.getElementsByClassName("active")[0];

hamburger_menu.addEventListener("click", openNavigation);
navItems.forEach(item => item.addEventListener("click", switchActive));
logo.addEventListener("click", backToHome);

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
}

function switchActive(event){
  removeActive();
  event.target.classList.add("active");
  let value = event.target.innerHTML;
  console.log(home_default);
  //TODO: switch to site
}

function removeActive(){
  let active = document.getElementsByClassName("active");
  active[0].classList.remove("active");
}