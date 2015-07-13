'use strict';

var Reflux = require('reflux');
var Actions = require('./SessionActionCreators');
var _ = require('lodash');

var axios = require('axios');
var when = require('when');

var restful = require('restful.js');
var Cookies = require('cookies-js');

var RouterStore = require('./RouterStore');
var RouterActionCreators  = require('./RouterActionCreators');


var SessionStore = {};


var api = restful(window.location.hostname + ':' + window.location.port)
           .prefixUrl('api');


api.addResponseInterceptor(function(data) {

    //console.log(arguments);
    if(_.isObject(data))
    {
        if(data.status === 401)
        {
            SessionStore.router.transitionTo('/unauthorized');
        }
    }

    return data;
});

api.addRequestInterceptor(function(data, headers) {
    var csrfCookie = Cookies.get('CSRF-TOKEN') || '';
    headers['X-Csrf-Token'] = csrfCookie;
    return data;
});

var UserConfig = {
    isInRole: function(role){
       return _.includes(this.roles || [], role);
    },
    isInAnyRole: function(roles){

        roles = _.isArray(roles) ? roles : [];
        var self = this;
        var found = false;
        roles.forEach(function(i){

            if(self.isInRole(i))
            {
                found = true;
            }

        });


        return found;
    }
};

SessionStore = Reflux.createStore({
    listenables: Actions,
    onPing: function(){

        axios.get('/api/public/ping').then(function () {

        })
         .catch(function () {

       });


    },
   onLoginCompleted: function(username){
       console.log('Login Succeed');
       localStorage.setItem('loggedtoken', btoa(username));

       var path  = RouterStore.getNextRouterPath();

       if(path){

           SessionStore.router.transitionTo(path);
           RouterActionCreators.ChangePath('');
       }
       else
       {
           SessionStore.router.transitionTo('/');
       }
   },
   onLoginFailure: function(){
       console.log('Login Failed');
       localStorage.removeItem('loggedtoken');
       SessionStore.router.transitionTo('/login', {}, { error: 'Login Failed' });
   },
    onLogoutCompleted: function(){
        console.log('Logout completed');
        localStorage.removeItem('loggedtoken');
        Actions.Ping();
        SessionStore.router.transitionTo('/login', {}, { error: 'Successfully Logged-out' });

    },
    onLogoutFailure: function(){
        console.log('Logout failed');
        localStorage.removeItem('loggedtoken');
        Actions.Ping();
        SessionStore.router.transitionTo('/login');
    },
    onCatchError: function(){
        console.log('onCatchError');
    },
    getApiResource: function(){
        return api;
    },
    isLoggedIn: function(){

        return !!localStorage.token;
    },
    getUserData: function(){


        var csrfCookie = Cookies.get('CSRF-TOKEN') || '';
        var d = when.defer();

        axios({
            method: 'GET',
            url: '/api/users/user',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-TOKEN': csrfCookie
            },
            xsrfCookieName: 'CSRF-TOKEN',
            xsrfHeaderName: 'X-CSRF-TOKEN'
          }).then(function (response) {
              var data = response.data;

             data = _.assign(data, UserConfig);

               d.resolve(data, response);
            })
            .catch(function (response) {
                d.reject(response);
            });



        return d.promise;

    }

});


var SessionStoreMixinFunction = function(roles){

    roles = _.isArray(roles) ?  roles : [];


    return {
        statics: {
            willTransitionTo: function(transition, params, query, callback){

               SessionStore.getUserData().then(function(user){

                  // console.log(user.isInAnyRole(roles));

                   if(!user.isInAnyRole(roles))
                   {
                      // transition.abort();

                       RouterActionCreators.ChangePath(transition.path);

                       transition.redirect('/unauthorized');

                   }
                   callback();
               }, function(){
                   RouterActionCreators.ChangePath(transition.path);
                   transition.redirect('/login');
                   callback();
               });



            },
            willTransitionFrom: function (/*transition, component*/) {
             //   console.log('willTransitionFrom');
            }
        }
    };

};

SessionStore.authenticate = SessionStoreMixinFunction;


module.exports = SessionStore;
