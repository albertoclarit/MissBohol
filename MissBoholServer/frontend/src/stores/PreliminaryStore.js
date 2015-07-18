'use strict';

var Reflux = require('reflux');
var PreliminaryActionCreators = require('../actions/PreliminaryActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();
var Promise  = require('bluebird');

var store = {
    list: [],
    summaries: []
};

var PreliminaryStore = Reflux.createStore({
  listenables: PreliminaryActionCreators,
    getInitialState: function() {
        return store;
    },
    onInit: function(){

        store.list = [];
        store.summaries = [];

        new Promise(function(resolve, reject){
            api.all('preliminaries').getAll().then(resolve).catch(reject);
        }).then(function(response){
                var preliminariesList = response.body();

                preliminariesList.forEach(function(preliminaryEntity) {
                    var preliminary = preliminaryEntity.data();
                    store.list.push(preliminary);
                });

                return api.all('preliminaries/summaries').getAll();
            }).then(function(response){
                var summariesList = response.body();

                summariesList.forEach(function(summaryEntity) {
                    var summary = summaryEntity.data();
                    store.summaries.push(summary);
                });


                PreliminaryStore.trigger(store);
            });


    },
    onMarkFinalist: function(summary, value){

        api.one('candidates', summary.id).get({
                isfinalist: value
            }).then(function(){

        });
    },
    onEditPreliminary: function(preliminary){

       // console.log(preliminary);

        var preliminaries = api.all('preliminaries');
        preliminaries.put(preliminary.id, preliminary).then(function(){
            PreliminaryActionCreators.Init();
        });


    },
    onResetTalent: function(){

        store.list = [];
        PreliminaryStore.trigger(store);
        var preliminaries = api.all('preliminaries');

        preliminaries.getAll({
            resettalent: true
        }).then(function(response) {
            var preliminariesList = response.body();

            preliminariesList.forEach(function(preliminaryEntity) {
                var preliminary = preliminaryEntity.data();
                store.list.push(preliminary);
            });

            PreliminaryStore.trigger(store);
        });
    },
    onResetGown: function () {

        store.list = [];
        PreliminaryStore.trigger(store);
        var preliminaries = api.all('preliminaries');

        preliminaries.getAll({
            resetgown: true
        }).then(function(response) {
            var preliminariesList = response.body();

            preliminariesList.forEach(function(preliminaryEntity) {
                var preliminary = preliminaryEntity.data();
                store.list.push(preliminary);
            });

            PreliminaryStore.trigger(store);
        });

    },
    onResetSwimsuit: function(){
        store.list = [];
        PreliminaryStore.trigger(store);
        var preliminaries = api.all('preliminaries');

        preliminaries.getAll({
            resetswimsuit: true
        }).then(function(response) {
            var preliminariesList = response.body();

            preliminariesList.forEach(function(preliminaryEntity) {
                var preliminary = preliminaryEntity.data();
                store.list.push(preliminary);
            });

            PreliminaryStore.trigger(store);
        });

    },
    onResetInterview: function(){
        store.list = [];

        PreliminaryStore.trigger(store);
        var preliminaries = api.all('preliminaries');

        preliminaries.getAll({
            resetinterview: true
        }).then(function(response) {
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
