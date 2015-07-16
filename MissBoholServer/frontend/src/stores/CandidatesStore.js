'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/CandidatesActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store =  {
    list: [],
    selected: undefined,
    showDialog: false
};


var CandidatesStore = Reflux.createStore({
  listenables: Actions,
    getInitialState: function() {
        return store;
    },
    onRefreshList: function(){
        store.list = [];

        var candidates = api.all('candidates');

        candidates.getAll().then(function(response) {
            var candidateList = response.body();

            candidateList.forEach(function(candidateEntity) {
                var candidate = candidateEntity.data();
                candidate._entity = candidateEntity;
                store.list.push(candidate);
            });

            CandidatesStore.trigger(store);
        });


    },
    onNewCandidate: function(){
        store.selected = {};
        store.showDialog = true;
        CandidatesStore.trigger(store);
    },
    onCloseDialog: function(){
        store.selected = {};
        store.showDialog = false;
        CandidatesStore.trigger(store);
    },
    onSaveCandidate: function(candidate){


        var candidates = api.all('candidates');

        if(!candidate.id){
            candidate.post(candidate).then(function(){
                Actions.RefreshList();
            }).catch(function(){
            });
        }
        else {
            candidates.put(candidate.id, candidate).then(function(){
                Actions.RefreshList();
            }).catch(function(){
            });
        }


    },
    onEditCandidate: function(candidate){

        store.selected = candidate;
        store.showDialog = true;
        CandidatesStore.trigger(store);
    },
    onDeleteCandidate: function(candidate){

        var candidates = api.all('candidates');
        candidates.delete(candidate.id, candidate).then(function(){
            Actions.RefreshList();
        }).catch(function(){
        });
    }

});

module.exports = CandidatesStore;
