var Fetch = require('whatwg-fetch');
var querystring = require('querystring');
var parser = require('jstoxml');
var expediaOptions = {
        apiKey:"yg7cfr2k3xp3t5r22s3mhymd",
        cid:"55505",
        locale  : "en_UK",  // optional defaults to en_US
        currencyCode :"GBP"  // optional defaults to USD
      }
var devBaseUrl = "http://dev.api.ean.com/ean-services/rs/hotel/v3/"
// var expedia = require('expedia')(expediaOptions, sendAsREST)
var rootUrl = 'https://api.imgur.com/3/';
var client_id = '869dbf4c337655a';
var apiSecret = '8d8e66ef1fe0cf5051b22d1a45fe8a3d00675d75';

var expediaEndpoint = devBaseUrl + 'list' + "?" + querystring.stringify(expediaOptions) + "&"

// var geocodeOptions = {
//   geocoderProvider: 'google',
//   httpAdapter: 'http'
// }

// var geocoder = require('node-geocoder')(geocodeOptions.geocoderProvider, geocodeOptions.httpAdapter);
var geocoder = new google.maps.Geocoder();


// expedia does not work in browserify
// may have to creat an ajax event and something to respond to it...
// or build the hash our selfs! here


module.exports = window.api = {
  getHostelList: function(location) {
    // make this into a promise???



    // put the return into the gecode but?
    return fetch(expediaEndpoint + _normalizeParamaters(location), {
      // moment i put headers in the whole hting changes... 
      headers: {
        Authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTc0MjQ5NjE5MzExOTdkMjUzOGVlOWUiLCJpYXQiOjE0NDkzMjIzOTMyNTAsImV4cCI6MTQ0OTM0MDM5MzI1MH0.IFay4nSZJh9ZvUFaadTpT95SuaXlV8hYyUFvSMnZWgM'
      }
    })
    .then(function(response){
      return response.json();
    })
  }
}

function _checkParameters(params){
    if(typeof params !== 'object') throw new Error("Paramaters must be passed in as an object");
    if(!params.customerSessionId) throw new Error("Customer session id must be sent in as customerSessionId");
    if(!params.customerSessionId) throw new Error("Customer ip address must be sent in as customerIpAddress");
    if(!params.customerUserAgent) throw new Error("Customer user agent string address must be sent in as customerUserAgent");
}
function _normalizeParamaters(parameters, request){
    console.log('in they go --->', parameters);
    if(typeof parameters !== 'object'){
        throw new Error("Paramaters must be passed in as an object");
    }

    // Extract customer from request object
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