'use strict';

var Reflux = require('reflux');
//var Actions = require('actions/..');


var FinalStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = FinalStore; 
