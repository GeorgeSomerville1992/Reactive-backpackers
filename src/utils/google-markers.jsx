module.exports = {
  createMarker: function (hostel, map) {
    var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "hi",
      animation: google.maps.Animation.DROP
    });


  },

  appendHostelMarkerToMap: function(hostel, map) {
    this.createMarker(hostel, map);
  }





}