var geocoder = new google.maps.Geocoder();
module.exports = window.api = {
    geocodeLocation: function (location, dragLocation) {
      console.log('firing', location);
      // make this into a promsie, checkout the primise angular guide. 
      var promise = new Promise(function(resolve, reject) {

        geocoder.geocode({address:location.cityName}, function(geocode, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            var lat = geocode[0].geometry.location.lat();
            var lng = geocode[0].geometry.location.lng();


            var geocodedData = {
              lat: geocode[0].geometry.location.lat(),
              lng: geocode[0].geometry.location.lng()
            }

            resolve(geocodedData, status);

          } else {
            reject(status);
          }

        });
      });
    return promise

    }
}