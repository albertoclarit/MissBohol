'use strict';

var React = require('react/addons');


require('styles/secured/Preliminary.css');
var SessionStore = require('../../sessionmanager/SessionStore');
var PreliminaryStore = require('../../stores/PreliminaryStore');
var Reflux = require('reflux');
var PreliminaryActionCreators = require('../../actions/PreliminaryActionCreators');

var PreliminaryEditRow = require('./PreliminaryEditRow');


var Preliminary = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(PreliminaryStore)],
    componentDidMount: function() {
        PreliminaryActionCreators.Init();

       this.intervalHandle = setInterval(function(){
            PreliminaryActionCreators.Init();
        }, 1000);
    },
    componentWillUnmount: function(){
        if(this.intervalHandle)
        {
           clearInterval(this.intervalHandle);
        }
    },
    resetTalent: function(){
        swal({   title: 'Are you sure?',
                text: 'You will not be able to recover thes record!',
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
                    PreliminaryActionCreators.ResetTalent();
                }
            });
    },
    resetGown: function(){
        swal({   title: 'Are you sure?',
                text: 'You will not be able to recover thes record!',
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
                    PreliminaryActionCreators.ResetGown();
                }
            });
    },
    resetSwimsuit: function(){
        swal({   title: 'Are you sure?',
                text: 'You will not be able to recover thes record!',
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
                    PreliminaryActionCreators.ResetSwimsuit();
                }
            });
    },
    resetInterview: function(){
        swal({   title: 'Are you sure?',
                text: 'You will not be able to recover thes record!',
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
                    PreliminaryActionCreators.ResetInterview();
                }
            });
    },
    markedFinalist: function(summary){
        //console.log(summary);
       // console.log($(React.findDOMNode(this.refs['chk_' + summary.id])).is(":checked"));
        PreliminaryActionCreators.MarkFinalist(summary, $(React.findDOMNode(this.refs['chk_' + summary.id])).is(':checked'));
    },
  render: function () {

      //console.log('rendered');
      var list = this.state.list.map(function(preliminary){
          return (
              <PreliminaryEditRow preliminary={preliminary} key={preliminary.id}/>
          );
      });
      var self = this;
      var summaries = this.state.summaries.map(function(summary, index){

          var checkbox = null;

          if(summary.finalist > 0)
          {
              checkbox  = (<input type="checkbox" ref={'chk_' + summary.id}  checked onChange={self.markedFinalist.bind(self, summary)}/>);
          }
          else {
              checkbox  = (<input type="checkbox" ref={'chk_' + summary.id} onChange={self.markedFinalist.bind(self, summary)}/>);
          }

          return (
            <tr key={'summary' + summary.id}>
                <td><strong style={{fontSize: 'large'}}>{summary.candidateNo}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{summary.lastname + ' ' + summary.firstname}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.talentaverage * 100) / 100).toFixed(2)}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.swimsuitaverage * 100) / 100).toFixed(2)}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.gownaverage * 100) / 100).toFixed(2)}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.witavarage * 100) / 100).toFixed(2)}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.totalaverage * 100) / 100).toFixed(2)}</strong></td>
                <td><strong style={{fontSize: 'large'}}>{index + 1}</strong></td>
                <td>{checkbox}</td>
            </tr>
          );

      });
    return (
        <div className="Preliminary">
            <legend>Preliminary Round</legend>

            <h2>Summary</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Candidate No.</th>
                    <th>Candidate Name</th>
                    <th>Talent Average</th>
                    <th>Swimsuit Average</th>
                    <th>Gown Average</th>
                    <th>Interview Average</th>
                    <th>Total Average</th>
                    <th>Rank</th>
                    <th>Mark Finalist</th>
                </tr>
                </thead>
                <tbody>
                {summaries}
                </tbody>
            </table>
            <legend>Preliminary Data</legend>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Judge No.</th>
                    <th>Candidate No.</th>
                    <th>Candidate Name</th>
                    <th>Talent <button className="btn btn-danger" onClick={this.resetTalent}>Reset</button></th>
                    <th>Swimsuit  <button className="btn btn-danger" onClick={this.resetSwimsuit}>Reset</button></th>
                    <th>Gown  <button className="btn btn-danger" onClick={this.resetGown}>Reset</button></th>
                    <th>Interview  <button className="btn btn-danger" onClick={this.resetInterview}>Reset</button></th>

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
