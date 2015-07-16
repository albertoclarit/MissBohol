'use strict';

var Reflux = require('reflux');

var CandidatesActionCreators  =  Reflux.createActions([
    'RefreshList',
    'NewCandidate',
    'EditCandidate',
    'CloseDialog',
    'SaveCandidate',
    'DeleteCandidate'
]);


module.exports = CandidatesActionCreators;
