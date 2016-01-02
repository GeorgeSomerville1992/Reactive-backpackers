var hotelRed = new google.maps.MarkerImage('./src/assets/hotel_0star_red.png'),
  hotelGreen = new google.maps.MarkerImage('./src/assets/hotel_0star_green.png'),
  hotelYellow = new google.maps.MarkerImage('./src/assets/hotel_0star_yellow.png'),
  hotelOrange = new google.maps.MarkerImage('./src/assets/hotel_0star_orange.png'),

  infowindow = new google.maps.InfoWindow();
module.exports = {

  createMarker: function (hostel, map, icon) {
    var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "hi",
      icon: icon,
      animation: google.maps.Animation.DROP
    });
    var that = this;
    google.maps.event.addListener(marker, 'click', function(){
        var thisMarker = this,
          contentString = that.setInfoWindowContent(hostel);
        infowindow.setContent(contentString);
        infowindow.open(map,this);
    })

    
  },
  setInfoWindowContent: function (hostel) {
    var contentString = '<div id="markerinfowindow">' + '<h3>' + hostel.name + '</h3>' +
                  '<p>' + 'Rate:' + ' ' + '<b>' + hostel.lowRate + '</b>' + '</p>' +
                  '<p>' + 'Address:' + ' ' + hostel.address1 + '</p>' +
                  '<p>' + 'Postcode:' + ' ' + hostel.postalCode + '</p>' +
                  '<img width=100px, height=100px, src= http://images.travelnow.com/'+ hostel.thumbNailUrl + '>' + '<br/>' +
                  '<a id="directions" class="button tiny">Calculate Directions</a>' + '</div>'
    return contentString;
  },
  appendHostelMarkerToMap: function(hostel, map) {
    if (hostel.lowRate <= 40) {
      this.createMarker(hostel, map, hotelGreen);
    } else if (hostel.lowRate <= 50) {
      this.createMarker(hostel, map, hotelYellow);
    } else if (hostel.lowRate <= 70) {
      this.createMarker(hostel, map, hotelOrange);
    } else if (hostel.lowRate <= 90) {
      this.createMarker(hostel, map, hotelRed);
    } else if (hostel.lowRate < 90) {
      this.createMarker(hostel, map, hotelRed);
    }

  }
}