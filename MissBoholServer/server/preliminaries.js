
var express = require('express');
var router = express.Router();
var Promise = require("bluebird");


module.exports = function (sequelize,Candidates,Judges,Preliminaries) {

    router.get('/bestswimsuit', function(req, res,next) {
        var sb = "select c.id, c.lastname, c.firstname, c.candidateNo, avg(swimsuit) as swimsuitaverage from preliminaries p, " +
            "candidates c  where " +
            "p.candidateId = c.id " +
            "group by candidateId order by swimsuitaverage desc";

        sequelize.query(sb, { type: sequelize.QueryTypes.SELECT})
            .then(function(results){
                res.json(results);
            }).catch(function(err){
                console.log(err);
                res.sendStatus(404);
            });

    });


    router.get('/bestgown', function(req, res,next) {
        var sb = "select c.id, c.lastname, c.firstname, c.candidateNo, avg(gown) as gownaverage from preliminaries p, " +
            "candidates c  where " +
            "p.candidateId = c.id " +
            "group by candidateId order by gownaverage desc";

        sequelize.query(sb, { type: sequelize.QueryTypes.SELECT})
            .then(function(results){
                res.json(results);
            }).catch(function(err){
                console.log(err);
                res.sendStatus(404);
            });

    });


    router.get('/bestinterview', function(req, res,next) {
        var sb = "select c.id, c.lastname, c.firstname, c.candidateNo, avg(witintelligence) as witavarage from preliminaries p, " +
            "candidates c  where " +
            "p.candidateId = c.id " +
            "group by candidateId order by witavarage desc";

        sequelize.query(sb, { type: sequelize.QueryTypes.SELECT})
            .then(function(results){
                res.json(results);
            }).catch(function(err){
                console.log(err);
                res.sendStatus(404);
            });

    });



    router.get('/summaries', function(req, res,next) {

        ///http://www.buildmystring.com/
        var sb = "select c.id, c.lastname, c.firstname, c.candidateNo, avg(talent) as talentaverage, avg(gown) as gownaverage, " +
            "avg(swimsuit) as swimsuitaverage, avg(witintelligence) as witavarage, " +
            "(avg(talent) + avg(gown) + avg(swimsuit) + avg(witintelligence)) as totalaverage , finalist from preliminaries p, " +
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
    // get the list of candidates
    router.get('/', function(req, res,next) {


         var resettalent=req.query.resettalent;
         var resetgown =req.query.resetgown;
         var resetswimsuit=req.query.resetswimsuit;
         var resetinterview=req.query.resetinterview;

        var arrayq = [];

         if(resettalent)
         {
             arrayq.push(sequelize.query("UPDATE preliminaries SET talent=0").spread(function(results, metadata) {
                 // Results will be an empty array and metadata will contain the number of affected rows.

                 return metadata;
             }));


         }

        if(resetgown)
        {
            arrayq.push(sequelize.query("UPDATE preliminaries SET gown=0").spread(function(results, metadata) {
                // Results will be an empty array and metadata will contain the number of affected rows.

                return metadata;
            }));

        }

        if(resetswimsuit)
        {
            arrayq.push(sequelize.query("UPDATE preliminaries SET swimsuit=0").spread(function(results, metadata) {
                // Results will be an empty array and metadata will contain the number of affected rows.

                return metadata;
            }));

        }


        if(resetinterview)
        {
            arrayq.push(sequelize.query("UPDATE preliminaries SET witintelligence=0").spread(function(results, metadata) {
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
                    order: [['candidateNo', 'ASC']]
                })
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
            })

        }).then(function(preliminaries){
                res.json(preliminaries);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(404);
            });


    });


    router.put('/:id', function(req, res,next) {

        Preliminaries.findById(req.params.id).then(function(preliminary){
            if(preliminary==null)
            {
                res.sendStatus(404);
                next();
            }

            preliminary.updateAttributes(req.body).then(function(preliminary) {
                res.status(200).json(preliminary);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    return router;
}