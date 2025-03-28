document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const addLocationButton = document.getElementById("addLocationButton");
    const locationsList = document.getElementById("locationsList");
    const locationImage = document.getElementById("locationImage");

    let locationsArray = [];
    let map;
    let markersGroup;

    function initializeMap() {
        map = L.map("map").setView([14.5995, 120.9842], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        
        markersGroup = L.layerGroup().addTo(map);
    }

    addLocationButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location !== "") { 
            locationsArray.push(location);
            locationInput.value = ""; 
            updateLocationsList(); 
            updateMap(location);
        }
    });

    function updateLocationsList() { 
        locationsList.innerHTML = ""; 
        locationsArray.forEach((location) => { 
            const li = document.createElement("li"); 
            li.textContent = location; 
            li.addEventListener("click", () => updateMap(location));
            locationsList.appendChild(li);  
        });
    }

    function updateMap(location) {
        if (!map) initializeMap();
        markersGroup.clearLayers();

        const coordinates = getCoordinatesForLocation(location);
        const imageUrl = getImageForLocation(location);
        
        if (coordinates) {
            map.setView(coordinates, 12);
            const marker = L.marker(coordinates).addTo(markersGroup).bindPopup(`<b>${location}</b>`);
            marker.openPopup();

            // Update the right-side image
            locationImage.src = imageUrl || "default.jpg";
        } else {
            alert("Location not found or coordinates not available.");
        }
    }

    function getCoordinatesForLocation(location) {
        const locationCoordinates = {
            "philippines": [13.41, 122.56],
            "taiwan": [23.6978, 120.9605],
            "manila": [14.5995, 120.9842],
            "america": [37.0902, -95.7129],
            "iloilo": [10.7202, 122.5621],
            "oton": [10.693, 122.474]
        };
        return locationCoordinates[location.toLowerCase()];
    }

    function getImageForLocation(location) {
        const locationImages = {
            "philippines": "https://www.thediscoveriesof.com/wp-content/uploads/2019/01/philippines-islands-shutterstock_329793749-1.jpg",
            "taiwan": "https://tse4.mm.bing.net/th?id=OIP.KP6gdbQoXZZZo2q2CmKJzAHaE7&pid=Api&P=0&h=180",
            "manila": "https://tse4.mm.bing.net/th?id=OIP.wYCZWgIvkaNcZXOAKS6qWgHaEK&pid=Api&P=0&h=180",
            "america": "https://tse4.mm.bing.net/th?id=OIP.jY9VurgKygS7E3DJwSgsxwHaEK&pid=Api&P=0&h=180",
            "iloilo": "https://farm5.staticflickr.com/4410/36763976170_f09fc6dea9_h.jpg",
            "oton": "https://tse2.mm.bing.net/th?id=OIP.BJ1QuURi45ougsrGsPxBZAHaEF&pid=Api&P=0&h=180"
        };
        return locationImages[location.toLowerCase()];
    }

    initializeMap();
});
