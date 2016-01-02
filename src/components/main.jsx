var React = require('react');
var MainForm = require('./form')
var SavedLocations = require('./locations')
var Hostels = require('./hostels')
var CheapestHostels = require('./cheapest-hostels');


module.exports = React.createClass({
  render: function(){
    return <div>
      <h1> Welcome to reactive backpackers </h1>

      <SavedLocations />
      <MainForm/>
      <Hostels />
      <CheapestHostels />
    </div>
  },
});