let guilin = "https://www.google.com/maps/place/Shi+Jia+Yuan+Lu,+Qi+Xing+Qu,+Gui+Lin+Shi,+Guang+Xi+Zhuang+Zu+Zi+Zhi+Qu,+China,+541000/@25.2655,110.3027712,18z/data=!3m1!4b1!4m5!3m4!1s0x36a4f5dd18c626b3:0xb2e121833fe62da2!8m2!3d25.2655!4d110.3037";
let shanghai = "https://www.google.com/maps/place/Lao+Shan+Lu,+Pu+Dong+Xin+Qu,+China,+200122/@31.22434,121.5219313,17z/data=!3m1!4b1!4m5!3m4!1s0x35b270c4ad7a2bf1:0x2248d34c06cde6fc!8m2!3d31.22434!4d121.52412";
let tianjin = "https://www.google.com/maps/place/Chi+Feng+Dao,+He+Ping+Qu,+Tian+Jin+Shi,+China/@39.1281102,117.2047026,17.56z/data=!4m5!3m4!1s0x35edfdbba9c907eb:0x365a1f4c9abc629!8m2!3d39.12626!4d117.20418";
let brooklyn = "https://www.google.com/maps/place/152+Smith+St,+Brooklyn,+NY+11201,+USA/@40.6865992,-73.9929818,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25a51dba259f5:0x6740762dba96fd7f!8m2!3d40.6865992!4d-73.9907931";

//locations on left page
const locations = [];
locations.push(document.querySelector("#cityA"), 
               document.querySelector("#cityB"),
               document.querySelector("#cityC"),
               document.querySelector("#cityD"));

//making locations clickable               
locations.forEach(location => location.addEventListener("click", switchLocation));

//addresses on right page
const addresses = [];
addresses.push(document.querySelector(".cityA"), 
               document.querySelector(".cityB"),
               document.querySelector(".cityC"),
               document.querySelector(".cityD"));

//initialize map to guilin
addMap(25.26836, 110.29909,
     guilin,
     "31-20 Shijiayuan Rd, Guilin",
     "Guangxi, China 541000");


function switchLocation(event){
     let city = event.target.parentElement;
     removeActive();
     city.classList.add("active");
     switch(city.id){
          case "cityA": 
               showCity(0);
               addMap(25.26836, 110.29909, 
                    guilin,
                    "31-20 Shijiayuan Rd, Guilin",
                    "Guangxi, China 541000");
               break;
          case "cityB":
               showCity(1);
               addMap(31.23385, 121.51684, 
                    shanghai,
                    "668 Laoshan Rd, Pudon",
                    "Shanghai, China 200122");
               break;
          case "cityC": 
               showCity(2);
               addMap(39.12811, 117.20470,
                    tianjin,
                    "108 Chifeng Ave, Nakai Distict",
                    "Tianjin, China 300291");
               break;
          case "cityD": 
               showCity(3);
               addMap(40.686560, -73.990890,
                    brooklyn,
                    "152 Smith St",
                    "Brooklyn, NY 11201");
               break;
     }

}

function showCity(l){
     locations[l].children[1].style.display = "";
     addresses[l].style.display = ""; 
}

function removeActive(){
     for(let i = 0; i < locations.length; i++){  
          locations[i].children[1].style.display = "none";
          addresses[i].style.display = "none";
          if(locations[i].className === "active"){
               locations[i].classList.remove("active");
           }
     }
}

function addMap(lat, lon, url, topRow, secondRow){
     //check if map is alreay initialized and if so remove values

          var container = L.DomUtil.get("map");
          var container_responsive = L.DomUtil.get("map_responsive");

          if(container != null || container_responsive != null){
               container._leaflet_id = null;
               container_responsive._leaflet_id = null;
          }
     
          let map = L.map("map").setView([lat, lon], 15);
          let map_responsive = L.map("map_responsive").setView([lat, lon], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 18,
               attribution: '© OpenStreetMap'
          }).addTo(map);     
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 18,
               attribution: '© OpenStreetMap'
          }).addTo(map_responsive);  

          let marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(`<a target="_blank" rel="noopener noreferrer" class="openMaps" href="${url}"><b>noodlee @</b><br>${topRow}<br>${secondRow}</a>`).openPopup();

          let marker_responsive = L.marker([lat, lon]).addTo(map_responsive);
          marker_responsive.bindPopup(`<a target="_blank" rel="noopener noreferrer" class="openMaps" href="${url}"><b>noodlee @</b><br>${topRow}<br>${secondRow}</a>`).openPopup();
          
}
