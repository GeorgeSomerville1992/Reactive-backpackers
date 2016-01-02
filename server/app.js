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

// require('./api/location.js')(app)

app.get('/',function(req,res){
  console.log('dum dum dum');
  res.render('./../index.ejs', {});
})

.use(express.static(__dirname + '/../.tmp'))
.use('/api/locations', locations)
.listen(7777, function () {
  console.log('Express server listening on 777777777');
})



// app.use('/api/locations', locations)

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));