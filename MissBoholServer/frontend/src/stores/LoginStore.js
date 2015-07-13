'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/LoginActionCreators');
var SessionActionCreators = require('../sessionmanager/SessionActionCreators');


var LoginStore = Reflux.createStore({
  listenables: Actions,
    getInitialState: function()
    {
        return {
            username: '',
            password: ''
        };
    },
    onLogin: function(username, password){
        SessionActionCreators.Login(username, password, false);
    }
});

module.exports = LoginStore;
