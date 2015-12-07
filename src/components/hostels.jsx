var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');
var ReactGoogleMaps = require("react-google-maps");

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(HostelStore, 'onChange')
  ],

  render: function(){
    console.log('firing hostels');
    // clear errors here
    return <section style={{height: "100%"}}>
        <GoogleMap containerProps={{
            style: {
              height: "100%",
            },
          }}
          defaultZoom={3}
          defaultCenter={{lat: -25.363882, lng: 131.044922}}
          onClick={props.onMapClick}
        >
          // {props.markers.map((marker, index) => {
          //   return (
          //     <Marker
          //       {...marker}
          //       onRightclick={() => props.onMarkerRightclick(index)} />
          //   );
          // })}
        </GoogleMap>
      </section>


    <div>
      <h1> found Hostels </h1>    
    </div>
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
  onChange: function(event, hostels) {
    console.log('triggered change from new hostel component', hostels);
    this.setState({hostels: hostels})
    console.log(this);
  }
});