'use strict'
var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var Firebase = require('firebase')
var ReactFire = require('reactfire');

module.exports = React.createClass({
  mixins: [
    ReactFire
  ],

  render: function(){
    return <div className="col-md-12">
      <div className="list-group">
        <a href="#" className="list-group-item active">
          saved locations
        </a>

        {this.renderLocations()}      
      </div>
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
  },
  renderLocations: function() {
    // setTimeout(function(){ alert("Hello"); }, 3000);


    return this.state.locations.map((locationObj) => {
      // console.log('location!!', locationObj.location.cityName);
      return <a href="#" className="list-group-item">{locationObj.location.cityName}</a>
    });
  },
  componentWillUnmount: function() {
    this.firebaseRef.off();
  }

});