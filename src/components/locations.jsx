'use strict'
//TODO, move firebase logic to a store

/* include logic to create actions which talk to stores 
 * this will replace the components directly.
 * add mixin which will bind everything to firebase  
*/

var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');
var Firebase = require('firebase')
var ReactFire = require('reactfire');

module.exports = React.createClass({
  mixins: [
    ReactFire
  ],

  render: function(){
    return <div>
      <h1> saved locations </h1>
      {this.renderLocations()}      
    </div>
  },

  getInitialState: function() {
    return {
      locations: [],
      hostels: []
    }
  },

  componentWillMount: function() {
    this.bindAsArray(new Firebase("https://reactivebackpackers.firebaseio.com/locations/"), "locations");
  },
  componentWIllReceiveProps: function(nextProps) {
    console.log('firing next props', nextProps);
  },
  renderLocations: function() {
    // setTimeout(function(){ alert("Hello"); }, 3000);
    console.log('firing render locations', this.state);


    return this.state.locations.map((locationObj) => {
      // console.log('location!!', locationObj.location.cityName);
      return <h1> {locationObj.location.cityName} </h1>
    });
  },
  componentWillUnmount: function() {
    this.firebaseRef.off();
  }

});