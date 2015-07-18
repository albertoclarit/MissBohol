'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
var PrelimRoundActionCreators = require('../../actions/PrelimRoundActionCreators');
var PrelimRoundStore = require('../../stores/PrelimRoundStore');
var Reflux = require('reflux');
var PreliminaryActionCreators = require('../../actions/PreliminaryActionCreators');



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
    gownChanged: function(){
        var newValue = React.findDOMNode(this.refs.gown).value;
        var state = this.state.currentPrelimData;
        state.gown = newValue;
        PreliminaryActionCreators.EditPreliminary(state);
        this.setState(this.state);
    },
    swimsuitChanged: function(){
        var newValue = React.findDOMNode(this.refs.swimsuit).value;
        var state = this.state.currentPrelimData;
        state.swimsuit = newValue;
        PreliminaryActionCreators.EditPreliminary(state);
        this.setState(this.state);
    },
    witintelligenceChanged: function(){
        var newValue = React.findDOMNode(this.refs.witintelligence).value;
        var state = this.state.currentPrelimData;
        state.witintelligence = newValue;
        PreliminaryActionCreators.EditPreliminary(state);
        this.setState(this.state);
    },
  render: function () {

      var candidateprofile = null;

      var hasNext = null;
      var hasPrevious = null;
      var prelimData = null;




      if(this.state.currentPrelimData){

          var swimsuitgown = [];
          for(var i = 0; i <= 25; i++)
          {
              swimsuitgown.push(
                  (<option value = {i} key={i}>{i}</option>)
              );
          }

          var intelligence = [];
          for(i = 0; i <= 30; i++)
          {
              intelligence.push(
                  (<option value = {i} key={i}>{i}</option>)
              );
          }

          prelimData = (
              <div className="form-horizontal">
                  <div className="form-group">
                      <label>Talent Competition</label>
                      <input type="text" className="form-control" readOnly value={this.state.currentPrelimData.talent}/>
                   </div>

                  <div className="form-group">
                      <label>Swimsuit Competition</label>
                      <select ref="swimsuit" className="form-control" onChange={this.swimsuitChanged} value={this.state.currentPrelimData.swimsuit}>
                          {swimsuitgown}
                      </select>
                  </div>
                  <div className="form-group">
                      <label>Gown</label>
                      <select ref="gown" className="form-control" onChange={this.gownChanged} value={this.state.currentPrelimData.gown}>
                          {swimsuitgown}
                      </select>
                  </div>
                  <div className="form-group">
                      <label>Wit and Intelligence</label>
                      <select ref="witintelligence" className="form-control" onChange={this.witintelligenceChanged} value={this.state.currentPrelimData.witintelligence}>
                          {intelligence}
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
            <legend>Preliminary Round</legend>
            {candidateprofile}
        </div>
      );
  }
});

module.exports = PrelimRound;
