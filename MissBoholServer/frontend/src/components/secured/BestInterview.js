'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var BestInterviewStore = require('../../stores/BestInterviewStore');
var Reflux = require('reflux');
var BestInterviewActionCreators = require('../../actions/BestInterviewActionCreators');

require('styles/secured/BestInterview.css');

var BestInterview = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(BestInterviewStore)],
    componentDidMount: function() {
        BestInterviewActionCreators.Start();

        this.intervalHandle = setInterval(function(){
            BestInterviewActionCreators.Start();
        }, 1000);
    },
    componentWillUnmount: function(){
        if(this.intervalHandle)
        {
            clearInterval(this.intervalHandle);
        }
    },
    render: function () {
        var list = this.state.list.map(function(bestswimsuit, index){
            return (
                <tr>
                    <td>{bestswimsuit.candidateNo}</td>
                    <td>{bestswimsuit.lastname + ', ' + bestswimsuit.firstname}</td>
                    <td><strong>{parseFloat(Math.round(bestswimsuit.witavarage * 100) / 100).toFixed(2)}</strong></td>
                    <td>{index + 1}</td>
                </tr>
            );
        });


        return (
            <div className="BestSwimsuit">
                <br/>
                <br/>
                <br/>
                <br/>
                <legend>Best in Interview Winner On Top</legend>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Candidate No.</th>
                        <th>Candidate Name</th>
                        <th>Interview Average</th>
                        <th>Rank</th>
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

module.exports = BestInterview;
