'use strict';

var Reflux = require('reflux');
var Actions = require('./RouterActionCreators');



var RouterStore = Reflux.createStore({
  listenables: Actions,
  onChangePath: function(path){
      if(path)
      {
          localStorage.setItem('routerNextPath', path);
      }
      else {
          localStorage.removeItem('routerNextPath');
      }
  },
 getNextRouterPath: function () {
     return localStorage.routerNextPath;
 }

});

module.exports = RouterStore;
