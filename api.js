// api place search
  
let BASE_URL = "https://api.foursquare.com/v3/places/search"
  
let API_KEY ="fsq3v3Q6u6Ye/OttiM56Q88ZiSgiBxxV786n+15U+Ofrods="

async function search(lat,lng,query,radius){

  let response = await axios.get(BASE_URL, + "search",{
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

//function to get api details
async function getDetails(fsqId){
  let response = await axios.get(BASE_URL + fsqId,{
    "headers":{
      "Authorsation": API_KEY,
      "Accept":"application/json",
    }
  })
  console.log(response);
  return response
}
