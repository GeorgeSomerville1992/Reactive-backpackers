var Reflux  = require('reflux');
var FireBase = require('firebase')
var ReactFire = require('reactfire');
var Actions = require('../actions');
var Geocode = require('../utils/geocoder');
var Expedia = require('../utils/expedia-api');

// so you cant put a mixin through a store??/

module.exports = Reflux.createStore({
  listenables: [Actions],
  mixins: [ReactFire],
  getExpediaData: function(location, ignoreGecode) {

    location.arrivalDate = new Date(location.arrivalDate);
    location.departureDate = new Date(location.departureDate);

    location.arrivalDate = (location.arrivalDate.getMonth() + 1) + '/' + location.arrivalDate.getDate() + '/' +  location.arrivalDate.getFullYear();
    location.departureDate = (location.departureDate.getMonth() + 1) + '/' + location.departureDate.getDate() + '/' +  location.departureDate.getFullYear();

    var that = this;

    if (ignoreGecode) {
      location.lat = location.latitude;
      location.lng = location.longitude;
      var requestParameters = this.handleRequestHash(location);

      return Expedia.getHostelList(requestParameters).then(function(json) { 
        that.requestParams = requestParameters;
        that.hostels = json;
        that.triggerChange();
      }.bind(that));

    } else {
      Geocode.geocodeLocation(location).then(function(geocodedData) {

        var requestParameters = that.handleRequestHash(location, geocodedData);

        return Expedia.getHostelList(requestParameters).then(function(json) { 
          that.requestParams = requestParameters;
          that.hostels = json;
          that.triggerChange();
        }.bind(that));
      })
    }

  },

  handleRequestHash: function(location, geocode) {
    var requestParameters = {
        "customerSessionId" : "thisisauniqueID",
        "customerIpAddress" : "127.0.0.1",
        "customerUserAgent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko)",
        "HotelListRequest": {
          "latitude": geocode ? geocode.lat : location.lat,
          "longitude": geocode ? geocode.lng : location.lng,
          "searchRadius": location.range,
          "sort":"PRICE",
          "countryCode": "GB",
          "arrivalDate": location.arrivalDate,
          "departureDate": location.departureDate,
          "numberOfResults": 30,
          "includeDetails": true
        } // now working 
      }
    return requestParameters;
  },

  getFoursquareData: function(data) {
    // foursquare api post
  },

  triggerChange: function() {
    //pass request params in here@
    console.log('the state', this);
    this.trigger('change', this);
  },

  getLocations: function() {
    this.bindAsArray(new Firebase("https://reactivebackpackers.firebaseio.com/locations/"), "locations");
  },
  
  getInitialState: function() {
    return {
      locations: []
    }
  }
})

