'use strict';

var React = require('react/addons');

//var Actions = require('actions/xxx')

require('styles/secured/Judges.css');
var SessionStore = require('../../sessionmanager/SessionStore');
var Judges = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN'])],
  render: function () {
    return (
        <div className="Judges">
          <p>Content for Judges</p>
        </div>
      );
  }
});

module.exports = Judges;
