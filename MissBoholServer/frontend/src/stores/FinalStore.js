'use strict';

var Reflux = require('reflux');
var FinalActionCreators = require('../actions/FinalActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();
var Promise  = require('bluebird');

var store = {
    list: [],
    summaries: []
};

var FinalStore = Reflux.createStore({
  listenables: FinalActionCreators,
    getInitialState: function() {
        return store;
    },
    onInit: function(){

        store.list = [];
        store.summaries = [];

        new Promise(function(resolve, reject){
            api.all('finalist').getAll().then(resolve).catch(reject);
        }).then(function(response){
                var finalistsList = response.body();

                finalistsList.forEach(function(finalistEntity) {
                    var finalist = finalistEntity.data();
                    store.list.push(finalist);
                });

                return api.all('finalist/summaries').getAll();
            }).then(function(response){
                var summariesList = response.body();

                summariesList.forEach(function(summaryEntity) {
                    var summary = summaryEntity.data();
                    store.summaries.push(summary);
                });


                FinalStore.trigger(store);
            });


    },
    onEditFinal: function(finalist){

        // console.log(preliminary);

        var apifinalist = api.all('finalist');
        apifinalist.put(finalist.id, finalist).then(function(){
            FinalActionCreators.Init();
        });


    },
    onResetFinalist: function(){
        store.list = [];
        FinalStore.trigger(store);
        var finalistapi = api.all('finalist');

        finalistapi.getAll({
            resetfinalist: true
        }).then(function(response) {
            var finalistsList = response.body();

            finalistsList.forEach(function(finalistEntity) {
                var finalist = finalistEntity.data();
                store.list.push(finalist);
            });

            FinalStore.trigger(store);
        });
    }
});

module.exports = FinalStore;
