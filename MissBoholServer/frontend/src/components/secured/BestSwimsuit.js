'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var BestSwimsuitStore = require('../../stores/BestSwimsuitStore');
var Reflux = require('reflux');
var BestSwimsuitActionCreators = require('../../actions/BestSwimsuitActionCreators');

require('styles/secured/BestSwimsuit.css');

var BestSwimsuit = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN']), Reflux.connect(BestSwimsuitStore)],
    componentDidMount: function() {
        BestSwimsuitActionCreators.Start();

        this.intervalHandle = setInterval(function(){
            BestSwimsuitActionCreators.Start();
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
                  <td><strong>{parseFloat(Math.round(bestswimsuit.swimsuitaverage * 100) / 100).toFixed(2)}</strong></td>
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
          <legend>Best in Swimsuit Winner On Top</legend>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Candidate No.</th>
                    <th>Candidate Name</th>
                    <th>Swimsuit Average</th>
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

module.exports = BestSwimsuit;
