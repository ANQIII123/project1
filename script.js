window.addEventListener('DOMContentLoaded', async function () {
    let map = createMap(1.3521, 103.8198);
    let searchResultLayer = L.layerGroup();

    let markerClusterLayer = L.markerClusterGroup(); 

    markerClusterLayer.addTo(map);
    searchResultLayer.addTo(map)
  
    navigator.geolocation.getCurrentPosition(position => {
  
      const { coords: { latitude, longitude } } = position;
      var locationIcon =  L.icon({
          iconUrl: 'location-icon.png',
          iconSize: [52, 60], 
      })
      var locationMarker = new L.marker([latitude, longitude],{icon:locationIcon}).addTo(map);

      locationMarker.bindPopup("<h1>Here's your location!</h1>");

    })
    
    //event listener for search button
    document.querySelector('#searchButton').addEventListener('click', async function () {
        getDetails()
       
        searchResultLayer.clearLayers(); 
  
        document.querySelector('#searchResults').innerHTML = "";
  
        let query = document.querySelector('#searchText').value;
        let latlng = map.getBounds().getCenter();

        let locations = await search(latlng.lat, latlng.lng, query, 10000);
    
        console.log(locations.results)
  
        for (let result of locations.results) {
  
            let lat = result.geocodes.main.latitude;
            let lng = result.geocodes.main.longitude;
            let fsqId = result.fsq_id
            let moreDetails =  await getDetails(fsqId)
        
            // let marker = L.marker([lat, lng]).addTo(searchResultLayer);
            let marker = L.marker([lat,lng]).addTo(markerClusterLayer);

            marker.bindPopup(
                `<h1>${result.name}</h1>
                 <h2>${moreDetails.data.location.address}</h2>
           <p>${result.location.address} 
           ${result.location.address_extended ? ", " + result.location.address_extended
                    : ""}</p>`)
  


            //select for search container         
            let searchResultElement = document.querySelector("#searchContainer")

            let resultElement = document.createElement('div');
            resultElement.className="search-result";
            resultElement.innerHTML = result.name;
            resultElement.addEventListener('click', function(){
                map.flyTo([lat, lng], 16)
                marker.openPopup();
            })
        searchResultElement.appendChild(resultElement)
        marker.addTo(markerClusterLayer)
  
        }
        markerClusterLayer.addTo(map)
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
  
