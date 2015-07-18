
var express = require('express');
var router = express.Router();
var Promise = require("bluebird");


module.exports = function (sequelize,Candidates,Judges,Finalist) {


    router.get('/summaries', function(req, res,next) {

        ///http://www.buildmystring.com/
        var sb = "select c.id, c.lastname, c.firstname, c.candidateNo, avg(finalinterview) as finalinterviewaverage, avg(beautypoisecharm) as beautypoisecharmaverage, " +
            "(avg(finalinterview) + avg(beautypoisecharm)) as totalaverage  from finalist p, " +
            "candidates c  where " +
            "p.candidateId = c.id " +
            "group by candidateId order by totalaverage desc";



        sequelize.query(sb, { type: sequelize.QueryTypes.SELECT})
            .then(function(results){
                res.json(results);
            }).catch(function(err){
                console.log(err);
                res.sendStatus(404);
            });
    });



    router.get('/', function(req, res,next) {

        var resetfinalist=req.query.resetfinalist;

        var arrayq = [];

        if(resetfinalist)
        {
            arrayq.push(sequelize.query("UPDATE candidates SET finalist=0;").spread(function(results, metadata) {
                // Results will be an empty array and metadata will contain the number of affected rows.
                return metadata;
            }));

            arrayq.push(sequelize.query("delete from finalist;").spread(function(results, metadata) {
                // Results will be an empty array and metadata will contain the number of affected rows.
                return metadata;
            }));

        }

        return Promise.all(arrayq).then(function (metadatas) {


            return Promise.all([
                Judges.findAll({
                    where: {
                        judgeNo: {
                            $ne: 999
                        }
                    },
                    order: [['judgeNo', 'ASC']]
                }),
                Candidates.findAll({
                    where: {
                      finalist : {
                          $ne: 0
                      }
                    },
                    order: [['candidateNo', 'ASC']]
                })
            ]).spread(function (judges,candidates){

                // console.log(candidates.length + ':' + judges.length);
                return sequelize.transaction(function (t) {
                    var finalists = [];
                    candidates.forEach(function(candidate) {

                        judges.forEach(function(judge) {

                            finalists.push(
                                Finalist
                                    .findOrCreate({where: {
                                        candidateId: candidate.id,
                                        judgeId: judge.id}, defaults: {},
                                        transaction:t})
                                    .spread(function(finalist, created) {
                                        // console.log('inside:' + preliminary.candidateId);
                                        var plainp = finalist.get({
                                            plain: true
                                        });


                                        plainp.candidate = candidate;
                                        plainp.judgeNo = judge.judgeNo;
                                        return plainp;
                                    })
                            );


                        });

                    });
                    return Promise.all(finalists);
                });//----
            })


        }).then(function(finalist){
            res.json(finalist);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(404);
        });

    });



    router.put('/:id', function(req, res,next) {

        Finalist.findById(req.params.id).then(function(finalist){
            if(finalist==null)
            {
                res.sendStatus(404);
                next();
            }

            finalist.updateAttributes(req.body).then(function(finalist) {
                res.status(200).json(finalist);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });



    return router;
}