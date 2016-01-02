var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(HostelStore, 'onChange')
  ],

  render: function() {
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

    return this.state.cheapestHostels.map((hostelObj) => {
      var hostelDeepLink = 'http://images.travelnow.com/' + hostelObj.thumbNailUrl,
        jumbotronStyle = {
          backgroundColor: 'grey',
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
    });
  },

  onChange: function(event, hostelObject) {
    // todo -> map drag does not quite work properly.... 
    var cheapestFoundHostels = hostelObject.hostels.HotelListResponse.HotelList.HotelSummary.slice(0, 4);
    this.setState({cheapestHostels: cheapestFoundHostels})
    this.renderCheapestHostels();
  }
});