'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
//var Actions = require('actions/xxx')

require('styles/public/Unauthorized.css');

var Unauthorized = React.createClass({

  render: function () {
    return (
        <div className="Unauthorized">
            <div className="text-center">
                <div className="alert alert-danger"><strong>You are not allowed to access this page</strong><br/>
                Please <Link to="/login">Login</Link></div>




                </div>

        </div>
      );
  }
});

module.exports = Unauthorized;
