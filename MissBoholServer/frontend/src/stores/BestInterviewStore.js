'use strict';

var Reflux = require('reflux');
var BestInterviewActionCreators = require('../actions/BestInterviewActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store = {
    list: []
};


var BestInterviewStore = Reflux.createStore({
  listenables: BestInterviewActionCreators,
    getInitialState: function() {
        return store;
    },
    onStart: function(){

        store.list = [];
        api.all('preliminaries/bestinterview').getAll().then(function(response){

            var bestswimsuitlists = response.body();

            bestswimsuitlists.forEach(function(bestswimsuitentity) {
                var swimsuit = bestswimsuitentity.data();
                store.list.push(swimsuit);
            });

            BestInterviewStore.trigger(store);

        });

    }



});

module.exports = BestInterviewStore;
