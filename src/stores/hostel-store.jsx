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
  getExpediaData: function(data) {
    console.log('getting data', data);
    // expedia api post 
    // expedia does not work in browserify
    // put the geccoder.gecod here!
    // even movet the gecoder into a seperate file 
    // make more sense
    data.arrivalDate = new Date(data.arrivalDate);
    data.departureDate = new Date(data.departureDate);
    var that = this;
    Geocode.geocodeLocation(data).then(function(data){
      return Expedia.getHostelList(data).then(function(json) { 
        that.hostels = json;
        console.log('that hostels', that.hostels, that);
        that.triggerChange();
      }.bind(that));
    })
    // make a lisner for this? trigger an action when done. 
    // so reflux can then handle and process it further down. 
    console.log('test--->', that);

  },

  getFoursquareData: function(data) {
    // foursquare api post
  },
  triggerChange: function() {
    this.trigger('change', this.hostels.HotelListResponse.HotelList);
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

