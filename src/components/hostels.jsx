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
    return <div className="col-md-6">

        <div id="map" style={{height:'400px', width:'100%'}}>

        </div>
      </div>
  },

  componentDidMount: function() {
    this.renderMap();
  },

  renderMap: function(newLocation) {
    console.log(newLocation, this.state);
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: newLocation ? newLocation.latitude : -34.397, lng: newLocation ? newLocation.longitude :  150.644},
      zoom: 10
    });

    if (this.state.hostels.HotelList) {
      this.createMarkers(map);
    }

    map.addListener('dragend', function() {

      window.setTimeout(function() {
        console.log('map change!', map.center.lat(), map.center.lng());

        newLocation.longitude = map.center.lng();
        newLocation.latitude = map.center.lat();
        HostelStore.getExpediaData(newLocation, true);

      }, 3000);
    });

  },
  createMarkers: function(map) {
    var HostelList = this.state.hostels.HotelList.HotelSummary;

    for(var i = 0; i < HostelList.length; i += 1 ) {
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
  },

  onChange: function(event, hostelObject) {
    this.setState({hostels: hostelObject.hostels.HotelListResponse, requestParams: hostelObject.requestParams.HotelListRequest})
    this.renderMap(hostelObject.requestParams.HotelListRequest);
  }
});