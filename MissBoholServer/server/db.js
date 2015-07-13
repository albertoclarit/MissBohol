
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


    Judge.sync({force: false});

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
        candidateNo: {
            type: Sequelize.INTEGER,
            unique: true
        },
        talent: {
            type: Sequelize.INTEGER
        },
        witintelligence: {
            type: Sequelize.INTEGER
        },
        gown: {
            type: Sequelize.INTEGER
        },
        swimsuit: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });




    return {
        Judge : Judge
    };
}