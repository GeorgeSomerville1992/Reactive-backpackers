'use strict'

var Fetch = require('whatwg-fetch');
var Helper = require('./rest-helper.js');
var querystring = require('querystring');
var parser = require('jstoxml');
var expediaOptions = {
        apiKey:"yg7cfr2k3xp3t5r22s3mhymd",
        cid:"55505",
        locale  : "en_UK",  // optional defaults to en_US
        currencyCode :"GBP"  // optional defaults to USD
      }
var devBaseUrl = "http://dev.api.ean.com/ean-services/rs/hotel/v3/"
var rootUrl = 'https://api.imgur.com/3/';
var client_id = '869dbf4c337655a';
var apiSecret = '8d8e66ef1fe0cf5051b22d1a45fe8a3d00675d75';
var expediaEndpoint = devBaseUrl + 'list' + "?" + querystring.stringify(expediaOptions) + "&"

var geocoder = new google.maps.Geocoder();


// expedia does not work in browserify
// may have to creat an ajax event and something to respond to it...
// or build the hash our selfs! here


module.exports = window.api = {
  getHostelList: function(location) {
    // change directily to post
    // return fetch(expediaEndpoint + _normalizeParamaters(location), {
    //   headers: {
    //     Authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTc0MjQ5NjE5MzExOTdkMjUzOGVlOWUiLCJpYXQiOjE0NDkzMjIzOTMyNTAsImV4cCI6MTQ0OTM0MDM5MzI1MH0.IFay4nSZJh9ZvUFaadTpT95SuaXlV8hYyUFvSMnZWgM'
    //   }
    // })
// fetch('/users', {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Hubot',
//     login: 'hubot',
//   })
// })
    console.log('getting hostel list helper');
    // fetch('/api/locations', {
    //   method: 'post',
    //   body: location
    // })

    return Helper.post("api/locations", location).then(function(response){
      console.log('response!', response);
      let payload = response
      payload.location = location;
      console.log('PAY LOAD MANNNNNN', payload);
      return payload;
    })
    // include 
  }
}

function _checkParameters(params){
    if(typeof params !== 'object') throw new Error("Paramaters must be passed in as an object");
    if(!params.customerSessionId) throw new Error("Customer session id must be sent in as customerSessionId");
    if(!params.customerSessionId) throw new Error("Customer ip address must be sent in as customerIpAddress");
    if(!params.customerUserAgent) throw new Error("Customer user agent string address must be sent in as customerUserAgent");
}

function _normalizeParamaters(parameters, request){
    if(typeof parameters !== 'object'){
        throw new Error("Paramaters must be passed in as an object");
    }

    var customer = {
        customerSessionId : parameters.customerSessionId,
        customerIpAddress : parameters.customerIpAddress,
        customerUserAgent : parameters.customerUserAgent
    };
    delete(parameters.customerSessionId);
    delete(parameters.customerIpAddress);
    delete(parameters.customerUserAgent);

    customer = querystring.stringify(customer);
    var xml = querystring.stringify({"xml" : parser.toXML(parameters)});
    return customer +"&json&" + xml;
}