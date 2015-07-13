'use strict';

var React = require('react/addons');

//var Actions = require('actions/xxx')

require('styles/secured/Preliminary.css');
var SessionStore = require('../../sessionmanager/SessionStore');

var Preliminary = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN'])],
  render: function () {
    return (
        <div className="Preliminary">
            <legend>Preliminary Round</legend>
        </div>
      );
  }
});

module.exports = Preliminary;
