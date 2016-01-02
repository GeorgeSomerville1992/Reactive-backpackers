 
var express = require('express');
var router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
// router.put('/', controller.index);
// router.get('/', controller.index);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
})) // somewhere here 
console.log('THIS IS RUNNNING');

// router.use(bodyParser.urlencoded({ extended: true }));


// router.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// })) // somewhere here 

router.post('/', function(req, res){
  console.log('doing a post', req);
  // inital request in here then

});

router.get('/', function (req, res) {
  res.send('Hello World!');
});
// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;