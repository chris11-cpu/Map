document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const addLocationButton = document.getElementById("addLocationButton");
    const locationsList = document.getElementById("locationsList");

    let locationsArray = [];
    let map;

    // Initialize map after the page loads
    function initializeMap() {
        map = L.map("map").setView([14.5995, 120.9842], 5); // Default: Manila, PH
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
            attribution: "© Esri, © OpenStreetMap contributors",
        }).addTo(map);
        
        
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

        const coordinates = getCoordinatesForLocation(location);
        if (coordinates) {
            map.setView(coordinates, 20);
            L.marker(coordinates).addTo(map).bindPopup(location);
        } else {
            alert("Location not found or coordinates not available.");
        }
    }

    function getCoordinatesForLocation(location) {
        const locationCoordinates = {
            "philippines": [13.41, 122.56],
            "taiwan": [23.6978, 120.9605],
            "manila": [14.5995, 120.9842],
            "america":[37.0902, 95.7129],
            "iloilo": [10.7202, 122.5621],
            "oton":[10.693, 122.474]
        };
        return locationCoordinates[location.toLowerCase()];
    }

    // Ensure map loads on page load
    initializeMap();
});
