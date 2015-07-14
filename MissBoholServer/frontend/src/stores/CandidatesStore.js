'use strict';

var Reflux = require('reflux');
//var Actions = require('actions/..');


var CandidatesStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = CandidatesStore; 
