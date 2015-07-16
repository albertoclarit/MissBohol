'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var CandidatesActionCreators = require('../../actions/CandidatesActionCreators');
var CandidatesStore = require('../../stores/CandidatesStore');
var CandidateForm = require('./candidates/CandidateForm');


require('styles/secured/Candidates.css');



var SessionStore = require('../../sessionmanager/SessionStore');
var Candidates = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(CandidatesStore)],
    componentDidMount: function() {
        CandidatesActionCreators.RefreshList();
    },
    addCandidate: function(){

        CandidatesActionCreators.NewCandidate();

    },
    deleteCandidate: function(candidate){



        swal({   title: 'Are you sure?',
                text: 'You will not be able to recover this record!',
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
                    CandidatesActionCreators.DeleteCandidate(candidate);
                }
            });


    },
  render: function () {


      var candidateForm = (this.state.showDialog) ? (<CandidateForm candidate={this.state.selected}/>) : '';

      var self = this;
      var list = this.state.list.map(function(candidate){
          return (
              <tr key={candidate.id}>
                  <td>{candidate.candidateNo}</td>
                  <td>{candidate.lastname}</td>
                  <td>{candidate.firstname}</td>
                  <td>{candidate.representation}</td>
                  <td><button type="button" className="btn btn-sm btn-warning" onClick={()=>{CandidatesActionCreators.EditJudge(judge); }}>Edit</button>&nbsp;
                      <button type="button" className="btn btn-sm btn-danger" onClick={self.deleteCandidate.bind(self, judge)}>Delete</button></td>
              </tr>
          );
      });
    return (
        <div className="Candidates">
            <legend>Candidates</legend>
            <button className="btn btn-primary" onClick={this.addCandidate}> Add A Candidate </button>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Candidate No.</th>
                    <th>Lastname</th>
                    <th>First Name</th>
                    <th>Representation</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
            {candidateForm}
        </div>
      );
  }
});

module.exports = Candidates;
