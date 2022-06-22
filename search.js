var layersControl;

let searchResultLayer = L.layerGroup();

let markerClusterLayer = L.markerClusterGroup();

let vege_group = L.markerClusterGroup();
let bar_group = L.markerClusterGroup();
let nearby_group = L.markerClusterGroup();


async function getsearchResultLayer(latlng, query) {  //get search result and add to layers. Return the result

    let locations = await search(latlng.lat, latlng.lng, query, 10000);

    for (let result of locations.results) {

        let lat = result.geocodes.main.latitude;
        let lng = result.geocodes.main.longitude;
        let fsqId = result.fsq_id
        let moreDetails = await getDetails(fsqId);

        L.marker([lat, lng]).addTo(searchResultLayer);

        try {
            image_array = await getimage(fsqId)
          }
        catch(err) {
        console.log('error is '+ err)
        continue
        }
        

        imageList = getimagelist(image_array)
        if (imageList != undefined) {
            let marker = L.marker([lat, lng]).bindPopup(`
        <h3>${result.name}</h3>
        <h5>${moreDetails.data.location.address}</h5>
        <p>${result.location.address} 
           ${result.location.address_extended ? ", " + result.location.address_extended : ""}</p>
        <img src = "${imageList[0]} ">     
        `);
            marker.addTo(markerClusterLayer);

            let searchResultElement = document.querySelector("#searchContainer");

            let resultElement = document.createElement('div');
            resultElement.className = "search-result";
            resultElement.innerHTML = result.name;

            resultElement.addEventListener('click', function () {

                map.flyTo([lat, lng], 18)
    
                map.once('zoomend', function () {
                    marker.openPopup();
                });
    
            })

            searchResultElement.appendChild(resultElement);

        }
 


    }


    if (!map.hasLayer(markerClusterLayer)) {
        map.addLayer(markerClusterLayer);
    }

    console.log('location type is ' + locations.results.constructor)

    return locations.results // return a array with result

}

async function filterSearch() {
}



//event listener for search button
document.querySelector('#searchButton').addEventListener('click', async function () {

    // getDetails()

    // searchResultLayer.clearLayers();
    // bar_group.clearLayers();
    // markerClusterLayer.clearLayers();
    // chinese_group.clearLayers();

    document.querySelector('#searchResults').innerHTML = "";
    document.querySelector('#searchContainer').innerHTML = "";

    let query = document.querySelector('#searchText').value;
    let latlng = map.getBounds().getCenter();

    let results = await getsearchResultLayer(latlng, query);

    console.log('returned location type is ' + results.constructor)

    // let locations = await search(latlng.lat, latlng.lng, query, 10000);

    // console.log(locations.results)


    for (let result of results) {

        let moreDetails = await getDetails(result.fsq_id);

        place_category = result.categories;

        let lat = result.geocodes.main.latitude;
        let lng = result.geocodes.main.longitude;

        for (let i = 0; i < place_category.length; i++) {

            if (place_category[i].id == 13377 || place_category[i].id == 17067) {
                marker1 = L.marker([lat, lng]).addTo(vege_group);

                marker1.bindPopup(
                    `<h1>${result.name}</h1>
                     <h2>${moreDetails.data.location.address}</h2>
                     <p>${result.location.address} 
                        ${result.location.address_extended ? ", " + result.location.address_extended
                        : ""}</p>`)


            }


            if (place_category[i].id >= 13003 && place_category[i].id <= 13025) {
                marker2 = L.marker([lat, lng]).addTo(bar_group);

                marker2.bindPopup(
                    `<h1>${result.name}</h1>
                     <h2>${moreDetails.data.location.address}</h2>
                     <p>${result.location.address} 
                        ${result.location.address_extended ? ", " + result.location.address_extended
                        : ""}</p>`)



            }


            if (result.distance <= 5000) {

                marker3 = L.marker([lat, lng]).addTo(nearby_group);

                marker3.bindPopup(
                    `<h1>${result.name}</h1>
                     <h2>${moreDetails.data.location.address}</h2>
                     <p>${result.location.address} 
                        ${result.location.address_extended ? ", " + result.location.address_extended
                        : ""}</p>`)

                break
            }



        }


    }
    console.log('vegetarian are :' + vege_group)

    let baseLayers = {
        'All': markerClusterLayer,
        'Vegetarian': vege_group,
        'bar': bar_group

    }

    if (layersControl != undefined) {
        layersControl.remove(map);
        console.log('layersControl old is removed')
    }

    layersControl = L.control.layers(baseLayers).addTo(map);

    let searchContainer = document.querySelector('#searchContainer');

    searchContainer.style.display = 'block'



})


