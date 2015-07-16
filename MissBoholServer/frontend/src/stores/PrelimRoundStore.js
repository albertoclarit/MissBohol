'use strict';

var Reflux = require('reflux');
var PrelimRoundActionCreators = require('../actions/PrelimRoundActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');
var api = SessionStore.getApiResource();

var store = {
    list: [],
    currentCandidate: undefined,
    hasNext: false,
    hasPrevious: false,
    currentIndex: -1,
    totalCandidates: 0
};


var PrelimRoundStore = Reflux.createStore({
  listenables: PrelimRoundActionCreators,
  getInitialState: function() {
        return store;
  },
  onStart: function(){
      store.list = [];

      var candidates = api.all('candidates');

      candidates.getAll().then(function(response) {
          var candidateList = response.body();

          candidateList.forEach(function(candidateEntity) {
              var candidate = candidateEntity.data();
              candidate._entity = candidateEntity;
              store.list.push(candidate);
          });
          store.totalCandidates = store.list.length;
          if(store.totalCandidates > 0)
          {
              store.currentIndex = 0;
          }
          PrelimRoundStore.updateStoreData();
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
      }


      PrelimRoundStore.trigger(store);

  },
  onNext: function () {

      store.currentIndex ++;
      PrelimRoundStore.updateStoreData();
  },
  onPrevious: function(){
      store.currentIndex --;
      PrelimRoundStore.updateStoreData();
  }

});

module.exports = PrelimRoundStore;
