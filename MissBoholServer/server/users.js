var express = require('express');
var router = express.Router();




router.get('/user', function(req, res,next) {

    var user  ={
        judgeNo : req.user.judgeNo
    }

    if(user.judgeNo===999)
    {
        user.roles=['ROLE_ADMIN'];
    }
    else {
        user.roles=['ROLE_USER'];
    }

    //console.log(user);

    res.json(user);
    next();
});

module.exports = router;