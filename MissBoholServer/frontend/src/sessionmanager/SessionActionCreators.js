'use strict';

var Reflux = require('reflux');
var axios = require('axios');

var Cookies = require('cookies-js');



var SessionActionCreators = Reflux.createActions({
    'Login': {children: ['completed', 'failure']},
    'Logout': {children: ['completed', 'failure']},
    'Getuser': {},
    'CatchError': {},
    'Ping': {}
});


SessionActionCreators.Logout.listen(function(){

    var csrfCookie = Cookies.get('CSRF-TOKEN') || '';
    var self = this;
    axios({
        method: 'POST',
        url: '/api/logout',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfCookie
        },
        xsrfCookieName: 'CSRF-TOKEN',
        xsrfHeaderName: 'X-CSRF-TOKEN'
    })
        .then(function () {
            // console.log(response);
            self.completed();
        })
        .catch(function () {
            //console.log(response);
            self.failure();
            SessionActionCreators.Ping();
        });

});

SessionActionCreators.Login.listen(function(username, password, rememberme){


    var csrfCookie = Cookies.get('CSRF-TOKEN') || '';

    var self = this;
    axios({
        method: 'POST',
        url: '/api/authentication',
        params: {
        j_username: username,
        j_password: password,
        _spring_security_remember_me: rememberme,
        submit: 'Login'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-TOKEN': csrfCookie
        },
        xsrfCookieName: 'CSRF-TOKEN',
        xsrfHeaderName: 'X-CSRF-TOKEN'
    })
        .then(function (response) {
           // console.log(response);
            self.completed(username, password, rememberme, response);

        })
        .catch(function () {
           // console.log(response);
            self.failure();
            SessionActionCreators.Ping();
        });


});


module.exports = SessionActionCreators;
