'use strict';

var React = require('react/addons');

//var Actions = require('actions/xxx')

require('styles/secured/FinalRound.css');
var SessionStore = require('../../sessionmanager/SessionStore');

var FinalRound = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN'])],
  render: function () {
    return (
        <div className="FinalRound">
          <legend>Final Round</legend>
        </div>
      );
  }
});

module.exports = FinalRound;
