'use strict';

var React = require('react/addons');

//var Actions = require('actions/xxx')

require('styles/Index.css');

var Index = React.createClass({

  render: function () {
    return (
        <div className="Index">
            <div className="starter-template">
                <h1>Miss Bohol 2015 Tabulation System</h1>
                <p className="lead">Sponsored By Cristal e-College.</p>
            </div>
        </div>
      );
  }
});

module.exports = Index;
