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
    deleteJudge: function(judge){


        if(judge.judgeNo === 999){
            swal({   title: 'Error!',
                text: 'Not allowed to delete this record',
                type: 'error',   confirmButtonText: 'OK' });
            return;
        }

        swal({   title: 'Are you sure?',
                 text: 'You will not be able to recover this imaginary file!',
                 type: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#DD6B55',
                 confirmButtonText: 'Yes, delete it!',
                 cancelButtonText: 'No, cancel plx!',
                 closeOnConfirm: true,
                 closeOnCancel: true
            },
                     function(isConfirm){
                         if (isConfirm) {
                             JudgeActionCreators.DeleteJudge(judge);
                         }
                     });


    },
    render: function () {

        var judgeForm = (this.state.showDialog) ? (<JudgeForm judge={this.state.selected}/>) : '';

        var self = this;
        var list = this.state.list.map(function(judge){
            return (
                <tr key={judge.id}>
                    <td>{judge.judgeNo}</td>
                    <td>{judge.password}</td>
                    <td><button type="button" className="btn btn-sm btn-warning" onClick={()=>{JudgeActionCreators.EditJudge(judge); }}>Edit</button>&nbsp;
                        <button type="button" className="btn btn-sm btn-danger" onClick={self.deleteJudge.bind(self, judge)}>Delete</button></td>
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
                  <th>Judge Password (Please dont show it)</th>
                  <th>#</th>
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
