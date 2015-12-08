var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route


var Main = require('./components/main');

module.exports = (
  <Router>
    <Route path="/" component={Main} >
    </Route>
  </Router>
)

