'use strict';

var Reflux = require('reflux');
var BestGownActionCreators = require('../actions/BestGownActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store = {
    list: []
};
var BestGownStore = Reflux.createStore({
  listenables: BestGownActionCreators,
    getInitialState: function() {
        return store;
    },
    onStart: function(){

        store.list = [];
        api.all('preliminaries/bestgown').getAll().then(function(response){

            var bestswimsuitlists = response.body();

            bestswimsuitlists.forEach(function(bestswimsuitentity) {
                var swimsuit = bestswimsuitentity.data();
                store.list.push(swimsuit);
            });

            BestGownStore.trigger(store);

        });

    }

});

module.exports = BestGownStore;
