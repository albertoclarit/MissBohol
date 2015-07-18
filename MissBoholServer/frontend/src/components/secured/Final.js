'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var FinalStore = require('../../stores/FinalStore');
var Reflux = require('reflux');
var FinalActionCreators = require('../../actions/FinalActionCreators');

require('styles/secured/Final.css');

var Final = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(FinalStore)],
    componentDidMount: function() {
        FinalActionCreators.Init();

        this.intervalHandle = setInterval(function(){
            FinalActionCreators.Init();
        }, 1000);
    },
    componentWillUnmount: function(){
        if(this.intervalHandle)
        {
            clearInterval(this.intervalHandle);
        }
    },
    resetFinalist: function(){
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
                    FinalActionCreators.ResetFinalist();
                }
            });


    },
    render: function () {

        //console.log('rendered');
        var list = this.state.list.map(function(finalist){
            return (
                <tr>
                    <td>{finalist.judgeNo}</td>
                    <td>{finalist.candidate.candidateNo}</td>
                    <td>{finalist.candidate.lastname + ', ' + finalist.candidate.firstname}</td>
                    <td><strong>{finalist.finalinterview}</strong></td>
                    <td><strong>{finalist.beautypoisecharm}</strong></td>
                </tr>
            );
        });
        var summaries = this.state.summaries.map(function(summary, index){

            return (
                <tr key={'summary' + summary.id}>
                    <td><strong style={{fontSize: 'large'}}>{summary.candidateNo}</strong></td>
                    <td><strong style={{fontSize: 'large'}}>{summary.lastname + ' ' + summary.firstname}</strong></td>
                    <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.finalinterviewaverage * 100) / 100).toFixed(2)}</strong></td>
                    <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.beautypoisecharmaverage * 100) / 100).toFixed(2)}</strong></td>
                    <td><strong style={{fontSize: 'large'}}>{parseFloat(Math.round(summary.totalaverage * 100) / 100).toFixed(2)}</strong></td>
                    <td><strong style={{fontSize: 'large'}}>{index + 1}</strong></td>
                </tr>
            );

        });
        return (
            <div className="Preliminary">
                <legend>Preliminary Round</legend>

                <h2>Summary</h2> <button className="btn btn-warning" onClick={this.resetFinalist}>Reset Finalist</button>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Candidate No.</th>
                        <th>Candidate Name</th>
                        <th>Final Interview</th>
                        <th>Beauty, Poise, Charm</th>
                        <th>Total Average</th>
                        <th>Rank</th>
                    </tr>
                    </thead>
                    <tbody>
                    {summaries}
                    </tbody>
                </table>
                <legend>Final Round Data</legend>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Judge No.</th>
                        <th>Candidate No.</th>
                        <th>Candidate Name</th>
                        <th>Final Interview</th>
                        <th>Beauty, Poise, Charm</th>
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

module.exports = Final;
