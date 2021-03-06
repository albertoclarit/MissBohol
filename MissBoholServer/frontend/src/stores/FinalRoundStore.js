'use strict';

var Reflux = require('reflux');
var FinalRoundActionCreators = require('../actions/FinalRoundActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store = {
    list: [],
    listEntity: [],
    currentCandidate: undefined,
    hasNext: false,
    hasPrevious: false,
    currentIndex: -1,
    totalCandidates: 0,
    currentFinalData: undefined
};


var FinalRoundStore = Reflux.createStore({
  listenables: FinalRoundActionCreators,
    getInitialState: function() {
        return store;
    },
    onStart: function(){
        store.list = [];
        store.listEntity = [];

        var candidates = api.all('candidates');

        candidates.getAll({
            finalist: true
        }).then(function(response) {
            var candidateList = response.body();

            candidateList.forEach(function(candidateEntity) {
                var candidate = candidateEntity.data();
                candidate._entity = candidateEntity;
                store.list.push(candidate);
                store.listEntity.push(candidateEntity);
            });
            store.totalCandidates = store.list.length;
            if(store.totalCandidates > 0)
            {
                store.currentIndex = 0;
            }
            FinalRoundStore.updateStoreData();
        });

    },
    updateStoreData: function(){
        if(store.currentIndex < (store.totalCandidates - 1))
        {
            store.hasNext = true;
        }
        else
        {
            store.hasNext = false;
        }

        if(store.currentIndex > 0)
        {
            store.hasPrevious = true;
        }
        else {
            store.hasPrevious = false;
        }

        if(store.currentIndex >= 0 && store.currentIndex < store.totalCandidates)
        {
            store.currentCandidate = store.list[store.currentIndex];
            var currentEntity = store.listEntity[store.currentIndex];
            SessionStore.getUserData().then(function(user){
                currentEntity.one('finaldata', user.id).get().then(function(response){
                    var entity = response.body();
                    store.currentFinalData = entity.data();
                    FinalRoundStore.trigger(store);
                });
            });
        }







    },
    onNext: function () {
        store.currentIndex ++;
        FinalRoundStore.updateStoreData();
    },
    onPrevious: function(){
        store.currentIndex --;
        FinalRoundStore.updateStoreData();
    }

});

module.exports = FinalRoundStore;
