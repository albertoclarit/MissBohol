'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionActionCreators = require('../sessionmanager/SessionActionCreators');
var SessionStore = require('../sessionmanager/SessionStore');

// CSS
require('normalize.css');
require('../styles/main.css');

var createActiveRouteComponent = require('react-router-active-component');
var NavLink = createActiveRouteComponent('li');

var FrontendApp = React.createClass({
    mixins: [Reflux.connect(SessionStore)],
    componentDidMount: function() {
        $('.navbar-collapse a').click(function(){
            $('.navbar-collapse').collapse('hide');
        });
    },
    componentDidUpdate: function() {
        $('.navbar-collapse a').click(function(){
            $('.navbar-collapse').collapse('hide');
        });
    },
    Logout: function(){
        SessionActionCreators.Logout();
    },
  render: function() {

      var menuitem = null;


      //console.log(this.state);
      if(this.state.currentUser){

          if(this.state.currentUser.isInRole('ROLE_ADMIN')){
              menuitem = (
                  <ul className="nav navbar-nav">
                      <NavLink to="/judges">Judges</NavLink>
                      <NavLink to="/candidates">Candidates</NavLink>
                      <NavLink to="/prelim">Preliminary Round</NavLink>
                      <NavLink to="/final">Final Round</NavLink>
                      <li><a href="#/" onClick={this.Logout}>Logout</a></li>
                  </ul>
              );
          }
          else
          {
              menuitem = (
                  <ul className="nav navbar-nav">
                      <NavLink to="/prelimround">Preliminary Round</NavLink>
                      <NavLink to="/finalround">Final Round</NavLink>
                      <li><a  onClick={this.Logout}>Logout</a></li>
                  </ul>
              );
          }
      }
      else {
          menuitem = (
              <ul className="nav navbar-nav">
                  <NavLink to="/login">Login</NavLink>
              </ul>
          );
      }

    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Miss Bohol</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        {menuitem}
                    </div>
                </div>
            </nav>
            <div className="container">
                <RouteHandler/>
            </div>


            </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = FrontendApp;
