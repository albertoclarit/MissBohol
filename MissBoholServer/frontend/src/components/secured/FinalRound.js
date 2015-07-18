'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var FinalRoundActionCreators = require('../../actions/FinalRoundActionCreators');
var FinalRoundStore = require('../../stores/FinalRoundStore');
var Reflux = require('reflux');
var FinalActionCreators = require('../../actions/FinalActionCreators');


require('styles/secured/FinalRound.css');


var FinalRound = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_USER']), Reflux.connect(FinalRoundStore)],
    componentDidMount: function() {
        FinalRoundActionCreators.Start();
    },
    next: function(){
        FinalRoundActionCreators.Next();
    },
    previous: function(){
        FinalRoundActionCreators.Previous();
    },
    finalinterviewChanged: function(){
        var newValue = React.findDOMNode(this.refs.finalinterview).value;
        var state = this.state.currentFinalData;
        state.finalinterview = newValue;
        FinalActionCreators.EditPreliminary(state);
        this.setState(this.state);
    },
    beautypoisecharmChanged: function(){
        var newValue = React.findDOMNode(this.refs.beautypoisecharm).value;
        var state = this.state.currentFinalData;
        state.beautypoisecharm = newValue;
        FinalActionCreators.EditPreliminary(state);
        this.setState(this.state);
    },
    render: function () {

        var candidateprofile = null;

        var hasNext = null;
        var hasPrevious = null;
        var prelimData = null;




        if(this.state.currentFinalData){

            var finalinterview = [];
            for(var i = 0; i <= 50; i++)
            {
                finalinterview.push(
                    (<option value = {i} key={i}>{i}</option>)
                );
            }

            var beautypoisecharm = [];
            for(i = 0; i <= 50; i++)
            {
                beautypoisecharm.push(
                    (<option value = {i} key={i}>{i}</option>)
                );
            }

            prelimData = (
                <div className="form-horizontal">

                    <div className="form-group">
                        <label>Final Interview</label>
                        <select ref="finalinterview" className="form-control" onChange={this.finalinterviewChanged} value={this.state.currentFinalData.finalinterview}>
                            {finalinterview}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gown</label>
                        <select ref="beautypoisecharm" className="form-control" onChange={this.beautypoisecharmChanged} value={this.state.currentFinalData.beautypoisecharm}>
                            {beautypoisecharm}
                        </select>
                    </div>
                </div>
            );


        }



        if(this.state.currentCandidate){

            if(this.state.hasNext){
                hasNext = (  <div className="btn-group btn-group-lg" role="group">
                        <button type="button" className="btn btn-primary" onTouchTap={this.next}>NEXT &gt;&gt;</button>
                    </div>
                );
            }

            if(this.state.hasPrevious){
                hasPrevious = (   <div className="btn-group btn-group-lg" role="group">
                        <button type="button" className="btn btn-primary" onTouchTap={this.previous}>&lt;&lt; PREV </button>
                    </div>
                );
            }


            candidateprofile = (
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <h2>Candidate #{this.state.currentCandidate.candidateNo} </h2>
                            <img src={'/images/' + this.state.currentCandidate.candidateNo + '.jpg'} width="190px" height="250px"
                                 className="img-responsive  img-circle center-block"
                                 alt={this.state.currentCandidate.lastname + ', ' + this.state.currentCandidate.firstname}/>
                            <h2>{this.state.currentCandidate.lastname + ', ' + this.state.currentCandidate.firstname}</h2>
                            <h4>Age:{this.state.currentCandidate.age }</h4>
                            <h4>{this.state.currentCandidate.representation }</h4>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="well">
                            <h4>Candidate #{this.state.currentCandidate.candidateNo} </h4>

                            {prelimData}
                            <br/>
                            <div className="btn-group btn-group-justified btn-group-lg" role="group">
                                {hasPrevious}
                                {hasNext}
                            </div>

                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="PrelimRound">
                <legend>Final Round</legend>
                {candidateprofile}
            </div>
        );
    }
});

module.exports = FinalRound;
