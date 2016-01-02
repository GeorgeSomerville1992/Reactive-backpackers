var React = require('react');
var MainForm = require('./form.jsx')
var SavedLocations = require('./locations.jsx')
var Hostels = require('./hostels.jsx')
var CheapestHostels = require('./cheapest-hostels.jsx');

console.log('hello from main.jsx');
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