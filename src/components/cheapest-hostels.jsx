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
    return <div className="row">
        {this.renderCheapestHostels()}
      </div>
  },
  
  getInitialState: function() {
    return {
      cheapestHostels: []
    }
  },
  renderCheapestHostels: function() {
    //react google maps takes place here
    console.log('the current state cheapest hostels!', this.state);
    // masive 4 grid layout, 2 6 by 6 columns show all the facts
    // this is where the nimate stuff comes in... 
    return this.state.cheapestHostels.map((hostelObj) => {
      console.log('thehostel obj', hostelObj);
      var hostelDeepLink = 'http://images.travelnow.com/' + hostelObj.thumbNailUrl,
        jumbotronStyle = {
          backgroundImage: 'url('+ hostelDeepLink + ')',
          backgroundRepeat: 'none',
          backgroundSize: 'cover',
          color: 'white'
        }
      return <div className="col-md-6">
        <div className="jumbotron" style={jumbotronStyle}>
          <h1>{hostelObj.name}</h1>
          <p>{hostelObj.shortDescription}</p>
          <p><a className="btn btn-primary btn-lg" href={hostelObj.deepLink} role="button">Book now</a></p>
          <p> Only £ {hostelObj.lowRate} per night</p>
        </div>
      </div>
      // return <a href="#" className="list-group-item">{locationObj.location.cityName}</a>
    });
  },
  onChange: function(event, hostelObject) {
    console.log(hostelObject.hostels)
    var cheapestFoundHostels = hostelObject.hostels.HotelListResponse.HotelList.HotelSummary.slice(0, 4);
    this.setState({cheapestHostels: cheapestFoundHostels})
    this.renderCheapestHostels();
    
    // dould even just make a new one
    // now we can set state and change the map around adn shit here.
    // do the move on AJAX thing!!!

  }
});