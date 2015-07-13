'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
// CSS
require('normalize.css');
require('../styles/main.css');
var createActiveRouteComponent = require('react-router-active-component');
var NavLink = createActiveRouteComponent('li');

var FrontendApp = React.createClass({
  render: function() {
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
                        <ul className="nav navbar-nav">
                            <NavLink to="/prelim">Preliminary</NavLink>
                            <NavLink to="/final">Final</NavLink>
                        </ul>
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
