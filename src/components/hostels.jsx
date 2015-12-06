var React = require('react');
var Reflux  = require('reflux');
var Actions = require('../actions');
var HostelStore = require('../stores/hostel-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(HostelStore, 'onChange')
  ],

  render: function(){
    console.log('firing hostels');
    return <div>
      <h1> found Hostels </h1>    
    </div>
  },

  getInitialState: function() {
    return {
      hostels: []
    }
  },
  renderHostels: function() {

  },
  onChange: function(event, hostels) {
    console.log('triggered change from new hostel component', hostels);
    this.setState({hostels: hostels})
    console.log(this);
  }
});