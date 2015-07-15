'use strict';

var Reflux = require('reflux');

var JudgeActionCreators  =  Reflux.createActions([
 'RefreshList',
 'NewJudge',
  'EditJudge',
 'CloseDialog',
 'SaveJudge',
  'DeleteJudge'
]);


module.exports = JudgeActionCreators;
