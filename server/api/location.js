'use strict'

if (process.env.IS_BROWSER) {
    var Fetch = require('whatwg-fetch');
}

    var items = [{
        name:"Ice Cream"
    },{
        name:"Waffles"
    },{
        name:"Candy",
        purchased:true
    },{
        name:"Snarks"
    }];

var express = require('express');
var router = express.Router();
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var querystring = require('querystring');
var parser = require('jstoxml');

var devBaseUrl = "http://dev.api.ean.com/ean-services/rs/hotel/v3/"
var expedia = require('expedia')({apiKey:"yg7cfr2k3xp3t5r22s3mhymd",cid:"55505"}) // just require the name!
var expediaOptions = {
    apiKey:"yg7cfr2k3xp3t5r22s3mhymd",
    cid:"55505",
    locale  : "en_UK",  // optional defaults to en_US
    currencyCode :"GBP"  // optional defaults to USD
}
var bodyParser = require('body-parser') //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
console.log('BODY PARSER', bodyParser, methodOverride);
var expediaEndpoint = devBaseUrl + 'list' + "?" + querystring.stringify(expediaOptions) + "&"


router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
})) // somewhere here 

router.get('/', function(req, res) {
    res.send(items);
})

router.post('/', function(req, res){
    console.log('posting something', req.body);
    // expediaEndpoint + _normalizeParamaters(req.location);
    expedia.hotels.list(req.body, function(err, data){

        return res.status(201).json(data)

    })
    // logic goes here
})

// module.exports = function (app){

//     var items = [{
//         name:"Ice Cream"
//     },{
//         name:"Waffles"
//     },{
//         name:"Candy",
//         purchased:true
//     },{
//         name:"Snarks"
//     }];
    
//     app.route('/api/locations')
//     // .get(function(req,res){
//     //     res.send(items);
//     // })
//     .post(function(req, res){
//         console.log('posting something', req);
//         // expediaEndpoint + _normalizeParamaters(req.location);
//         return Fetch(expediaEndpoint + _normalizeParamaters(req.body), {
//           headers: {
//             Authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTc0MjQ5NjE5MzExOTdkMjUzOGVlOWUiLCJpYXQiOjE0NDkzMjIzOTMyNTAsImV4cCI6MTQ0OTM0MDM5MzI1MH0.IFay4nSZJh9ZvUFaadTpT95SuaXlV8hYyUFvSMnZWgM'
//           }
//         })
//         // logic goes here
//     })
    
// }

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

module.exports = router;