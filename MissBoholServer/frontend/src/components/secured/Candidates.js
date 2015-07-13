'use strict';

var React = require('react/addons');

//var Actions = require('actions/xxx')

require('styles/secured/Candidates.css');
var SessionStore = require('../../sessionmanager/SessionStore');
var Candidates = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN'])],
  render: function () {
    return (
        <div className="Candidates">
            <legend>Candidates</legend>
        </div>
      );
  }
});

module.exports = Candidates;
