var React = require('react');
var MainForm = require('./form')
var SavedLocations = require('./locations')
var Hostels = require('./hostels')

module.exports = React.createClass({
  render: function(){
    return <div>
      <h1> welcome to reactive backpackers </h1>
      <MainForm/>
      <SavedLocations />
      <Hostels />
    </div>
  },
});