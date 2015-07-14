
var express = require('express');
var router = express.Router();


module.exports = function (Judge) {


    // get the list of judge
    router.get('/', function(req, res,next) {

        Judge.findAll().then(function(judges){
            res.json(judges);
        }).catch(function(error){
            res.status(404);
        });


    });


    // save a new judge
    router.post('/', function(req, res,next) {

        Judge.create(req.body).then(function(judge) {
            res.status(401).json(judge);
        }).catch(function(error){
            res.sendStatus(500);
        });

    });

    // find one judge
    router.get('/:id', function(req, res,next) {

        Judge.findById(req.params.id).then(function(judge){
            if(judge==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(judge);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    // save one judge
    router.put('/:id', function(req, res,next) {

        Judge.findById(req.params.id).then(function(judge){
            if(judge==null)
            {
                res.sendStatus(404);
                next();
            }

            judge.updateAttributes(req.body).then(function(judge) {
                res.status(200).json(judge);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });




    return router;
}