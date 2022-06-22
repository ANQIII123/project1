// var image_array; // globaal variable

async function getimage(fsqId) {


    var promise = new Promise(function (resolve, reject) {
  
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3v3Q6u6Ye/OttiM56Q88ZiSgiBxxV786n+15U+Ofrods='
        }
      };
  
      fetch('https://api.foursquare.com/v3/places/' + fsqId + '/photos?limit=20', options)
        .then((response) => {
          
          if (response.status == 404) {
            console.log('reject')
            reject('foursquare responded with 404') // if there is any error, reject here
            return
          }
          else {
            return response.json();
          }
  
        }
        )
        .then((response) => {
  
          if (response == undefined) {
            return
          }
  
          let image_array = response;  //define image_array here
          console.log(image_array);
          resolve(image_array);
  
        })
  
        .catch(err => {
          console.error(err);
          reject(err)
        });
  
    });
    return promise;
  
  }
  
  function getimagelist(image_array) {
  
    if (image_array == undefined) {
      return
    }
  
    let imageList = []; //store url of pictures
    let imageCount = 0; // get a maximum of 4 images
  
    for (let image_object of image_array) {
  
  
      if (image_object.classifications == "outdoor") {
        imageCount += 1;
  
        let imageUrl = "";
        imageUrl = image_object.prefix + "height100" + image_object.suffix;
        imageList.push(imageUrl);
  
      }
  
      if (image_object.classifications == "indoor") {
        imageCount += 1;
  
        let imageUrl = "";
        imageUrl = image_object.prefix + "height100" + image_object.suffix;
        imageList.push(imageUrl);
  
      }
  
      if (image_object.classifications == "food") {
        imageCount += 1;
  
        let imageUrl = "";
        imageUrl = image_object.prefix + "height100" + image_object.suffix;
        imageList.unshift(imageUrl);
  
      }
  
      if (imageCount == 4) {
        console.log(imageList);
        return imageList;
      }
  
    }
  }
  
  
  