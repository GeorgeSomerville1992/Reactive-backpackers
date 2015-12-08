var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(HostelStore, 'onChange')
  ],

  render: function() {
    // use normal google maps here
    return(<div id="map" style={{height:'300px', width:'300px'}}>

     </div>)
  },
  componentDidMount: function() {
    // boom this actually worked
    this.renderMap();
  },
  renderMap: function(newLocation) {
    console.log('firing render map! again!', newLocation);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: newLocation ? newLocation.latitude : -34.397, lng: newLocation ? newLocation.longitude :  150.644},
      zoom: 8
    });
    console.log('map!', map)
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
    console.log('triggered change from new hostel component', hostelObject);
    this.setState({hostels: hostelObject.hostels.HotelListResponse, requestParams: hostelObject.requestParams.HotelListRequest})
    this.renderMap(hostelObject.requestParams.HotelListRequest);
    // dould even just make a new one
    // now we can set state and change the map around adn shit here.
    // do the move on AJAX thing!!!

    console.log(this);
  }
});