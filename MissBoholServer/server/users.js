var express = require('express');
var router = express.Router();




router.get('/user', function(req, res,next) {
    res.json({ username: 'albert', roles: ["ROLE_ADMIN"] })
    next();
});

module.exports = router;