/**
 * Main application routes
 */

'use strict';

// var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below 
  console.log('WE HAVE ROUTES');
  app.use('/api/locations', require('./api/location'));

  // app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  // check this exists
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendfile(app.get('appPath') + '/index.html');
  //   });
};