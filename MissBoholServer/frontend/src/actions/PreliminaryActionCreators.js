'use strict';

var Reflux = require('reflux');

var PreliminaryActionCreators  =  Reflux.createActions([
     'Init',
     'EditPreliminary',
     'ResetTalent',
     'ResetGown',
     'ResetSwimsuit',
     'ResetInterview',
     'MarkFinalist'
]);


module.exports = PreliminaryActionCreators;
