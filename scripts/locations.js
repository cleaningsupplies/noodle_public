const locations = document.querySelectorAll(".locations");
const location_elements = document.querySelector(".locations").children;

const cities = [];
cities.push(document.querySelector(".cityA"), 
               document.querySelector(".cityB"),
               document.querySelector(".cityC"),
               document.querySelector(".cityD"));

locations.forEach(location => location.addEventListener("click", switchLocation));

var map = new ol.Map({
     target: 'map',
     layers: [
       new ol.layer.Tile({
         source: new ol.source.OSM()
       })
     ],
     view: new ol.View({
       center: ol.proj.fromLonLat([40.71, -73.96]),
       zoom: 4
     })
   });



function switchLocation(event){
     let city = event.target;
     removeActive();
     city.classList.add("active");
     switch(city.id){
          case "cityA": cities[0].style.display = ""; break;
          case "cityB": cities[1].style.display = ""; break;
          case "cityC": cities[2].style.display = ""; break;
          case "cityD": cities[3].style.display = ""; break;
     }

}

function removeActive(){
     for(let i = 0; i < location_elements.length; i++){  
          cities[i].style.display = "none";
          if(location_elements[i].className === "active"){
               location_elements[i].classList.remove("active");
           }
     }
}