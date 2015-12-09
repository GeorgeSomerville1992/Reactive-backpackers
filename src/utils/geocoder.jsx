var geocoder = new google.maps.Geocoder();
module.exports = window.api = {
    geocodeLocation: function (location, cb) {
      console.log('firing', location);
      // make this into a promsie, checkout the primise angular guide. 
      var promise = new Promise(function(resolve, reject) {

        geocoder.geocode({address:location.cityName}, function(geocode, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            var lat = geocode[0].geometry.location.lat();
            var lng = geocode[0].geometry.location.lng();
            var formattedArrivalDate = (location.arrivalDate.getMonth() + 1) + '/' + location.arrivalDate.getDate() + '/' +  location.arrivalDate.getFullYear();
            var formattedDepatureDate = (location.departureDate.getMonth() + 1) + '/' + location.departureDate.getDate() + '/' +  location.departureDate.getFullYear();

            var parameters = {
              "customerSessionId" : "thisisauniqueID",
              "customerIpAddress" : "127.0.0.1",
              "customerUserAgent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko)",
              "HotelListRequest": {
                "latitude": lat,
                "longitude": lng,
                "searchRadius": location.range,
                "sort":"PRICE",
                "countryCode": "GB",
                "arrivalDate": formattedArrivalDate,
                "departureDate": formattedDepatureDate,
                "numberOfResults": 30,
                "includeDetails": true
              } // now working 
            }
            console.log('params--->',parameters,status );
            resolve(parameters, status);

          } else {
            reject(status);
          }

        });
      });
    return promise

    }
}