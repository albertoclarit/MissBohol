
var express = require('express');
var router = express.Router();


module.exports = function (Candidates) {


    // get the list of candidates
    router.get('/', function(req, res,next) {

        Candidates.findAll().then(function(candidates){
            res.json(candidates);
        }).catch(function(error){
            res.status(404);
        });
    });


    // save a new candidate
    router.post('/', function(req, res,next) {

        Candidates.create(req.body).then(function(candidate) {
            res.status(201).json(candidate);
        }).catch(function(error){
            res.sendStatus(500);
        });

    });


    // find one candidate
    router.get('/:id', function(req, res,next) {

        Candidates.findById(req.params.id).then(function(candidate){
            if(candidate==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(candidate);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });


    // save one candidate
    router.put('/:id', function(req, res,next) {

        Candidates.findById(req.params.id).then(function(candidate){
            if(candidate==null)
            {
                res.sendStatus(404);
                next();
            }

            candidate.updateAttributes(req.body).then(function(candidate) {
                res.status(200).json(candidate);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });


    router.delete('/:id', function(req, res,next) {

        Candidates.findById(req.params.id).then(function(candidate){
            if(candidate==null)
            {
                res.sendStatus(404);
                next();
            }

            candidate.destroy().then(function(candidate) {
                res.status(200).json(candidate);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });





    return router;
}