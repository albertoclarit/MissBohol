
var express = require('express');
var router = express.Router();
var Promise = require("bluebird");

module.exports = function (sequelize,Candidates,Preliminaries,Finalist) {



    // get the list of candidates
    router.get('/', function(req, res,next) {


        if(req.query.finalist){

            Candidates.findAll({
                where: {
                    finalist : {
                        $ne: 0
                    }
                },
                order: [['candidateNo', 'ASC']]
            }).then(function(candidates){
                res.json(candidates);
            }).catch(function(error){
                res.status(404);
            });
        }

        else {
            Candidates.findAll({
                order: [['candidateNo', 'ASC']]
            }).then(function(candidates){
                res.json(candidates);
            }).catch(function(error){
                res.status(404);
            });
        }

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



        return new Promise(function(resolve, reject){


            if(req.query.isfinalist == 'true')
            {
                sequelize.query('update candidates set finalist = 1 where id = ' +
                    req.params.id).then(resolve,reject);
            }
            else
            if(req.query.isfinalist == 'false'){
                console.log(req.query.isfinalist);
                sequelize.query('update candidates set finalist = 0 where id = ' +
                    req.params.id).then(resolve,reject);
            }
            else
            {
                resolve(true);
            }

        }).then(function(){


                Candidates.findById(req.params.id).then(function(candidate){
                    if(candidate==null)
                    {
                        res.sendStatus(404);
                        next();
                    }
                    res.json(candidate);
                })

            }).catch(function(error){
                res.sendStatus(404);
            });



    });

    // find one prelimdata
    router.get('/:id/prelimdata/:judgeid', function(req, res,next) {


        return new Promise(function (resolve, reject) {
             Candidates.findById(req.params.id).then(resolve).catch(reject);
        }).then(function(candidate){
             return   Preliminaries.findOne({
                    where:{
                        candidateId: candidate.id,
                        judgeId : req.params.judgeid
                    }
                });
        }).then(function(preliminary){
                res.json(preliminary);
            })
            .catch(function(error){
                console.log(error);
                res.sendStatus(404);
            });
    });


    router.get('/:id/finaldata/:judgeid', function(req, res,next) {


        return new Promise(function (resolve, reject) {
            Candidates.findById(req.params.id).then(resolve).catch(reject);
        }).then(function(candidate){
                return   Finalist.findOne({
                    where:{
                        candidateId: candidate.id,
                        judgeId : req.params.judgeid
                    }
                });
            }).then(function(finalist){
                res.json(finalist);
            })
            .catch(function(error){
                console.log(error);
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