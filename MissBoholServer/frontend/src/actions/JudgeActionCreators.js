'use strict';

var Reflux = require('reflux');

var JudgeActionCreators  =  Reflux.createActions([
 'RefreshList',
 'NewJudge',
 'CloseDialog',
 'SaveJudge'
]);


module.exports = JudgeActionCreators;
