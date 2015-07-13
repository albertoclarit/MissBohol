var express = require('express');

module.exports = function (passport) {

  var router = express.Router();


   router.post('/authentication',  passport.authenticate('local'),function(req, res) {
   res.send('OK');
   });



  router.post('/logout', function(req, res) {
    req.logout();
    res.send("OK");
  });



  return router;

};
