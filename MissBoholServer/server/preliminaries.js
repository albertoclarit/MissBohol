
var express = require('express');
var router = express.Router();
var Promise = require("bluebird");


module.exports = function (sequelize,Candidates,Judges,Preliminaries) {
    // get the list of candidates
    router.get('/', function(req, res,next) {


            return Promise.all([
                Judges.findAll({
                    where: {
                        judgeNo: {
                            $ne: 999
                        }
                    }
                }),
                Candidates.findAll(),
            ]).spread(function (judges,candidates){

               // console.log(candidates.length + ':' + judges.length);

                return sequelize.transaction(function (t) {
                    var preliminaries = [];
                    candidates.forEach(function(candidate) {

                        judges.forEach(function(judge) {

                            preliminaries.push(
                                Preliminaries
                                    .findOrCreate({where: {
                                        candidateId: candidate.id,
                                        judgeId: judge.id}, defaults: {},
                                        transaction:t})
                                    .spread(function(preliminary, created) {
                                        // console.log('inside:' + preliminary.candidateId);
                                        var plainp = preliminary.get({
                                            plain: true
                                        });


                                        plainp.candidate = candidate;
                                        plainp.judgeNo = judge.judgeNo;
                                        return plainp;
                                    })
                            );


                        });

                    });
                    return Promise.all(preliminaries);
                });//----



            }).then(function(preliminaries){

                res.json(preliminaries);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(404);
            });


    });




    return router;
}