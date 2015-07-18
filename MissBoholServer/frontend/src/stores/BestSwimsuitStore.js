'use strict';

var Reflux = require('reflux');
var BestSwimsuitActionCreators = require('../actions/BestSwimsuitActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store = {
    list: []
};

var BestSwimsuitStore = Reflux.createStore({
    listenables: BestSwimsuitActionCreators,
    getInitialState: function() {
        return store;
    },
    onStart: function(){

        store.list = [];
        api.all('preliminaries/bestswimsuit').getAll().then(function(response){

            var bestswimsuitlists = response.body();

            bestswimsuitlists.forEach(function(bestswimsuitentity) {
                var swimsuit = bestswimsuitentity.data();
                store.list.push(swimsuit);
            });

            BestSwimsuitStore.trigger(store);

        });

    }


});

module.exports = BestSwimsuitStore;
