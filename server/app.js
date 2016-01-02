/**
 * Main application file
 */

'use strict';


var express = require('express'),
    parser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var app = new express();
var server = require('http').createServer(app);
var locations = require('./api/location');

console.log('locations!', locations);
// require('./routes')(app);

server.listen(6000, function () {
  console.log('Express server listening on 8000');
});

app.use(express.static(__dirname + '/../main.js'))

app.use('/api/locations', locations)

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));