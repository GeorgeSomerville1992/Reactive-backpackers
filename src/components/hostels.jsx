var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');
var GoogleMarkers = require('../utils/google-markers')

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(HostelStore, 'onChange')
  ],

  render: function() {
    // use normal google maps here
    return <div className="col-md-6">

        <div id="map" style={{height:'400px', width:'100%'}}>

        </div>
      </div>
  },
  componentDidMount: function() {
    // boom this actually worked
    this.renderMap();
  },
  renderMap: function(newLocation) {
    console.log(newLocation, this.state);
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: newLocation ? newLocation.latitude : -34.397, lng: newLocation ? newLocation.longitude :  150.644},
      zoom: 8
    });
    // function to call render marker...
    if (this.state.hostels.HotelList) {
      this.createMarkers(map);
    }
    map.addListener('dragend', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      // but I need the new corrds...

      window.setTimeout(function() {
        // and pass in something extra to ignore geocode...
        console.log('chaning map--->');
        console.log('map change!', map.center.lat(), map.center.lng());

        newLocation.longitude = map.center.lng();
        newLocation.latitude = map.center.lat();
        
        HostelStore.getExpediaData(newLocation);
        // do another request here.
      }, 3000);
    });

  },
  createMarkers: function(map) {
    var HostelList = this.state.hostels.HotelList.HotelSummary;

    for(var i = 0; i < HostelList.length; i += 1 ) {
      // call utils function
      GoogleMarkers.appendHostelMarkerToMap(HostelList[i], map);
    }
  },
  getInitialState: function() {
    return {
      hostels: []
    }
  },
  renderHostels: function() {
    console.log(this.state.hostels);
    //react google maps takes place here
    
  },
  onChange: function(event, hostelObject) {
    this.setState({hostels: hostelObject.hostels.HotelListResponse, requestParams: hostelObject.requestParams.HotelListRequest})
    this.renderMap(hostelObject.requestParams.HotelListRequest);
    // dould even just make a new one
    // now we can set state and change the map around adn shit here.
    // do the move on AJAX thing!!!
  }
});