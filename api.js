// api place search

async function search(lat,lng,query,radius){
  
    let BASE_URL = "https://api.foursquare.com/v3/places/search"
  
    let API_KEY ="fsq3v3Q6u6Ye/OttiM56Q88ZiSgiBxxV786n+15U+Ofrods="

  let response = await axios.get(BASE_URL,{
    "headers":{
      "Authorization": API_KEY,
      "Accept": "application/json",
      
    },
    "params":{
      "query":query,
      "ll":lat+","+lng,
      "radius":radius,
      "limit": 50
  
    }
  });
  
  return response.data;
}

