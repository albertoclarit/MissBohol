'use strict';

var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionActionCreators = require('../sessionmanager/SessionActionCreators');


require('styles/JudgeFrontend.css');

var createActiveRouteComponent = require('react-router-active-component');
var NavLink = createActiveRouteComponent('li');


var JudgeFrontend = React.createClass({
    Logout: function(){
        SessionActionCreators.Logout();
    },
  render: function () {
    return (
        <div className="JudgeFrontend">
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
                            <NavLink to="/judges">Preliminary</NavLink>
                            <NavLink to="/candidates">Final</NavLink>
                            <li><a  onClick={this.Logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <RouteHandler/>
            </div>

        </div>
      );
  }
});

module.exports = JudgeFrontend;
