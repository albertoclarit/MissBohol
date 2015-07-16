'use strict';

var React = require('react/addons');
var SessionStore = require('../../sessionmanager/SessionStore');
//var Actions = require('actions/xxx')

require('styles/secured/Final.css');

var Final = React.createClass({
    mixins: [SessionStore.authenticate(['ROLE_ADMIN'])],
    render: function () {
    return (
        <div className="Final">
          <p>Content for Final</p>
        </div>
      );
  }
});

module.exports = Final;
