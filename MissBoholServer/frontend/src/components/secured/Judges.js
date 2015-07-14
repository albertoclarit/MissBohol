'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var JudgeActionCreators = require('../../actions/JudgeActionCreators');
var JudgeStore =  require('../../stores/JudgeStore');
var JudgeForm = require('./judges/JudgeForm');


require('styles/secured/Judges.css');
var SessionStore = require('../../sessionmanager/SessionStore');
var Judges = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(JudgeStore)],
    componentDidMount: function() {
        JudgeActionCreators.RefreshList();
    },
    addJudge: function(){

        JudgeActionCreators.NewJudge();

    },
    render: function () {
        var judgeForm = (this.state.showDialog) ? (<JudgeForm judge={this.state.selected}/>) : '';
        var list = this.state.list.map(function(judge){

            return (
                <tr>
                    <td>{judge.judgeNo}</td>
                    <td>{judge.password}</td>
                </tr>
            );
        });
    return (
        <div className="Judges">
            <legend>Judges</legend>
            <button className="btn btn-primary" onClick={this.addJudge}> Add A Judge </button>
            <table className="table table-bordered">
                <thead>
                 <tr>
                 <th>Judge No</th>
                  <th>Judge Password</th>
                 </tr>
                </thead>
            <tbody>
            {list}
            </tbody>
            </table>
            {judgeForm}
        </div>
      );
  }
});

module.exports = Judges;
