'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var BestGownStore = require('../../stores/BestGownStore');
var Reflux = require('reflux');
var BestGownActionCreators = require('../../actions/BestGownActionCreators');

//var Actions = require('actions/xxx')

require('styles/secured/BestGown.css');

var BestGown = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(BestGownStore)],
    componentDidMount: function() {
        BestGownActionCreators.Start();

        this.intervalHandle = setInterval(function(){
            BestGownActionCreators.Start();
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
                    <td><strong>{parseFloat(Math.round(bestswimsuit.gownaverage * 100) / 100).toFixed(2)}</strong></td>
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
                <legend>Best in Gown Winner On Top</legend>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Candidate No.</th>
                        <th>Candidate Name</th>
                        <th>Gown Average</th>
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

module.exports = BestGown;
