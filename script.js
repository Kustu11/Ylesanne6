(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 100);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            if (h > 11) {
                h -= 12;
            }
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
        } else if (document.getElementById("fname").value == "" || document.getElementById("lname").value == "") {

            alert("Täitke kõik väljad");
            return;
    
            
        } else {
            var sum = 0;
            if (document.getElementById("v1").checked === true) {
                sum += 5;
            }
            if (document.getElementById("v2").checked === true) {
                sum += 1;
            }
            if (linn.value === "trt" || linn.value === "nrv") {
                sum += 2.5;
            } else if (linn.value == "prn") {
                sum += 3;
            }
            
            e.innerHTML = sum + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

function pushpinClicked(e) {
    console.log(e.target);
    infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
    });
    
}

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

let utLocation = [58.38104, 26.71992];
let kardlaLocation = [58.9981537, 22.7468681];
let centerLong = (utLocation[0] + kardlaLocation[0])/2 + 0.100;
let centerLat = (utLocation[1] + kardlaLocation[1])/2;
console.log(utLocation);
console.log(centerLong);

var infobox;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        centerLong, centerLat
        );


    let utPoint = new Microsoft.Maps.Location(
        utLocation[0], utLocation[1]
        );
        
    let kardlaPoint = new Microsoft.Maps.Location(
        kardlaLocation[0], kardlaLocation[1]
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox((map.getCenter()), {
        visible: false
    });
    infobox.setMap(map);

    
    let pushpin = new Microsoft.Maps.Pushpin(utPoint, {
            title: 'Tartu Ülikool',
        });
    pushpin.metadata = {
        title: 'Hea koht',
        description: 'Parim ülikool Eestis'
    };

    let pushpin1 = new Microsoft.Maps.Pushpin(kardlaPoint, {
            title: 'Kärdla keskväljak'
    });
    pushpin1.metadata = {
        title: 'Parim keskväljak Eestis',
        description: 'Tere tulemast Hiiumaale'
    };


    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);


    map.entities.push(pushpin);
    map.entities.push(pushpin1);


}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

