var React = require('react');
var Reflux  = require('reflux');
var Firebase = require('firebase')
var ReactFire = require('reactfire');
var Actions = require('../actions.jsx');
var HostelStore = require('../stores/hostel-store.jsx');
var geocode

module.exports = React.createClass({
  
  // mixins: [
  //   Reflux.listenTo(HostelStore, 'onChange')
  // ],

  // get ininital locatons???
  // componet will mount
  getInitialState: function() {
    return {
            cityName: "", 
            arrivalDate: "",
            departureDate: "",
            range: "",
            attractionName: ""
          };
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://reactivebackpackers.firebaseio.com/locations/");
  },
  componentWillUnmount: function() {
    this.firebaseRef.off();
  },
  handleChange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },
  handleSubmission: function(e) {
    e.preventDefault();
    // after form is sent off
    this.firebaseRef.push({
      location: this.state
    });
    /*  
      maybe for posting we dont need to communicate to store via actions
      just send directly? this is a big ????
    */

    // Actions.getExpediaData();
    HostelStore.getExpediaData(this.state);

    this.setState({
      cityName: '',
      arrivalDate: '',
      departureDate: '',
      attractionName: '',
      departureDate: '',
      range: ''
    });
  },
  render: function() {
    return <div className="col-md-6">
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label" for="exampleInputEmail1">City Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" value={this.state.cityName} 
              onChange={this.handleChange.bind(this, 'cityName')} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" for="exampleInputEmail1">Arrival Date</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" value={this.state.arrivalDate} 
                         onChange={this.handleChange.bind(this, 'arrivalDate')} />
          </div>
        </div>

        <div className="form-group">

          <label className="col-sm-2 control-label" for="exampleInputEmail1">Departure Date</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="departureDate" type="date" value={this.state.departureDate} 
                                   onChange={this.handleChange.bind(this, 'departureDate')} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label" for="exampleInputEmail1">Range</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" value={this.state.range} 
                    onChange={this.handleChange.bind(this, 'range')} />
          </div> 
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label" for="exampleInputEmail1">Attraction Name</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" value={this.state.attractionName} 
                                 onChange={this.handleChange.bind(this, 'attractionName')} />
          </div>
        </div>
        <div>
          <button className="btn btn-default" type="button" onClick={this.handleSubmission}>Submit</button>
        </div>
      </form>
    </div>
  
  }

})
