window.addEventListener('DOMContentLoaded', async function () {
    let map = createMap(1.3521, 103.8198);
    let searchResultLayer = L.layerGroup();
    searchResultLayer.addTo(map)
  
    navigator.geolocation.getCurrentPosition(position => {
  
      const { coords: { latitude, longitude } } = position;
      var locationMarker = new L.marker([latitude, longitude], {
          iconUrl: 'locations-icons.png',
          iconSize:     [38, 95], // size of the icon
      }).addTo(map);
      
      locationMarker.bindPopup("<h1>Here's your location!</h1>");
    })
  
    document.querySelector('#searchButton').addEventListener('click', async function () {
  
       
        searchResultLayer.clearLayers(); 
  
        document.querySelector('#searchResults').innerHTML = "";
  
        let query = document.querySelector('#searchText').value;
        let latlng = map.getBounds().getCenter();
        let locations = await search(latlng.lat, latlng.lng, query, 10000);
        console.log(location)
        console.log(locations.results)
  
        for (let result of locations.results) {
  
            let lat = result.geocodes.main.latitude;
            let lng = result.geocodes.main.longitude;
    
            let marker = L.marker([lat, lng]).addTo(searchResultLayer);
  
            marker.bindPopup(`<h1>${result.name}</h1>
           <p>${result.location.address} 
           ${result.location.address_extended ? ", " + result.location.address_extended
                    : ""}</p>`)
  
            let resultElement = document.createElement('div');
            resultElement.className="search-result";
            resultElement.innerHTML = result.name;
            resultElement.addEventListener('click', function(){
                map.flyTo([lat, lng], 16)
                marker.openPopup();
            })
            marker.addTo(map);
  
        }
    })
  
    document.querySelector("#searchButton").addEventListener('click', function(){
   
        let searchContainer = document.querySelector('#searchContainer');
  
        let isDisplayed =  searchContainer.style.display == 'block';
        console.log(isDisplayed);
        if (isDisplayed) {
            searchContainer.style.display = 'none';
        } else {
            searchContainer.style.display = 'block';
        }
    });
  })
  
