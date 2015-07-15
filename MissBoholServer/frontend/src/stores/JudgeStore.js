'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/JudgeActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');

var api = SessionStore.getApiResource();

var store =  {
    list: [],
    selected: undefined,
    showDialog: false
};

var JudgeStore = Reflux.createStore({
  listenables: Actions,
    getInitialState: function() {
        return store;
    },
  onRefreshList: function(){
      store.list = [];

      var judges = api.all('judges');

      judges.getAll().then(function(response) {
          var judgesList = response.body();

          judgesList.forEach(function(judgeEntity) {
              var judge = judgeEntity.data();
             store.list.push(judge);
          });

          JudgeStore.trigger(store);
      });


  },
    onNewJudge: function(){
        store.selected = {};
        store.showDialog = true;
        JudgeStore.trigger(store);
    },
    onCloseDialog: function(){
        store.selected = {};
        store.showDialog = false;
        JudgeStore.trigger(store);
    },
    onSaveJudge: function(judge){

        var judges = api.all('judges');
        judges.post(judge).then(function(){
            Actions.RefreshList();
        }).catch(function(){
        });

    }

});

module.exports = JudgeStore;
