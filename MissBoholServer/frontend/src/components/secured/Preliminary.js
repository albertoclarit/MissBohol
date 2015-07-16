'use strict';

var React = require('react/addons');


require('styles/secured/Preliminary.css');
var SessionStore = require('../../sessionmanager/SessionStore');
var PreliminaryStore = require('../../stores/PreliminaryStore');
var Reflux = require('reflux');
var PreliminaryActionCreators = require('../../actions/PreliminaryActionCreators');



var Preliminary = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(PreliminaryStore)],
    componentDidMount: function() {
        PreliminaryActionCreators.Init();
    },
  render: function () {

      var list = this.state.list.map(function(preliminary){
          return (
              <tr key={preliminary.id}>
                  <td>{preliminary.judgeNo}</td>
                  <td>{preliminary.candidate.candidateNo}</td>
                  <td>{preliminary.candidate.lastname + ', ' + preliminary.candidate.firstname}</td>
                  <td>{preliminary.talent}</td>
                  <td>{preliminary.gown}</td>
                  <td>{preliminary.swimsuit}</td>
                  <td>{preliminary.witintelligence}</td>
                  <td></td>
              </tr>
          );
      });
    return (
        <div className="Preliminary">
            <legend>Preliminary Round</legend>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Judge No.</th>
                    <th>Candidate No.</th>
                    <th>Candidate Name</th>
                    <th>Talent</th>
                    <th>Gown</th>
                    <th>Swimsuit</th>
                    <th>Interview</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
        </div>
      );
  }
});

module.exports = Preliminary;
