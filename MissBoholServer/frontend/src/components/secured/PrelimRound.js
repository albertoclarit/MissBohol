'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var PrelimRoundActionCreators = require('../../actions/PrelimRoundActionCreators');
var PrelimRoundStore = require('../../stores/PrelimRoundStore');
var Reflux = require('reflux');

require('styles/secured/PrelimRound.css');

var PrelimRound = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_USER']), Reflux.connect(PrelimRoundStore)],
    componentDidMount: function() {
        PrelimRoundActionCreators.Start();
    },
    next: function(){

        PrelimRoundActionCreators.Next();
    },
    previous: function(){
        PrelimRoundActionCreators.Previous();
    },
  render: function () {

      var candidateprofile = null;

      var hasNext = null;
      var hasPrevious = null;




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
                          <h4>{this.state.currentCandidate.age }</h4>
                          <h4>{this.state.currentCandidate.representation }</h4>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="well">
                          <h4>Candidate #{this.state.currentCandidate.candidateNo} </h4>
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
            <legend>Preliminary Round</legend>
            {candidateprofile}
        </div>
      );
  }
});

module.exports = PrelimRound;
