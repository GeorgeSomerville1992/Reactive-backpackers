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
    // expedia api post 
    // expedia does not work in browserify
    // put the geccoder.gecod here!
    // even movet the gecoder into a seperate file 
    // make more sense
    data.arrivalDate = new Date(data.arrivalDate);
    data.departureDate = new Date(data.departureDate);
    var that = this;
    Geocode.geocodeLocation(data).then(function(geocodedData){
      return Expedia.getHostelList(geocodedData).then(function(json) { 
        // set shit her !!!!
        console.log('the final hostels!!!!!--->', json);
        that.requestParams = geocodedData;
        that.hostels = json;
        that.triggerChange();
      }.bind(that));
    })
    // make a lisner for this? trigger an action when done. 
    // so reflux can then handle and process it further down. 

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

