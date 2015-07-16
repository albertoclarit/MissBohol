'use strict';

var Reflux = require('reflux');
var PreliminaryActionCreators = require('../actions/PreliminaryActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();


var store = {
    list: []
};

var PreliminaryStore = Reflux.createStore({
  listenables: PreliminaryActionCreators,
    getInitialState: function() {
        return store;
    },
    onInit: function(){

        store.list = [];
        var preliminaries = api.all('preliminaries');

        preliminaries.getAll().then(function(response) {
            var preliminariesList = response.body();

            preliminariesList.forEach(function(preliminaryEntity) {
                var preliminary = preliminaryEntity.data();
                store.list.push(preliminary);
            });

            PreliminaryStore.trigger(store);
        });
    }


});

module.exports = PreliminaryStore;
