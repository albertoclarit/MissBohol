
var Sequelize = require('sequelize');

module.exports = function (sequelize) {


    var Judge = sequelize.define('judge', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        judgeNo: {
            type: Sequelize.INTEGER,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Judge.sync({force: false}).then(function () {
        // Table created
        return Judge.create({
            judgeNo: '999',
            password: 'itsawesome'
        });
    }).catch(function(error) {
      console.log('999 user already created');
    });

    var Candidates = sequelize.define('candidates', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        candidateNo: {
            type: Sequelize.INTEGER,
            unique: true
        },
        age: {
            type: Sequelize.INTEGER
        },
        lastname: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        representation: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Candidates.sync({force: false});


    var Preliminaries = sequelize.define('preliminaries', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        talent: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        witintelligence: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        gown: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        swimsuit: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    Candidates.hasMany(Preliminaries,{onUpdate:'CASCADE', onDelete:'CASCADE'});
    Judge.hasMany(Preliminaries,{onUpdate:'CASCADE', onDelete:'CASCADE'});
    Preliminaries.sync({force: false});





    return {
        Judge : Judge,
        Preliminaries:Preliminaries,
        Candidates:Candidates
    };
}