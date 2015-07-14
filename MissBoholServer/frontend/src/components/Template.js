'use strict';

var React = require('react/addons');
var Reflux = require('Reflux'); 

//var Actions = require('actions/xxx')

require('styles/Template.css');

var Template = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return {};
  },
  getDefaultProps: function() {},
  componentWillMount: function() {},
  componentDidMount: function() {},
  shouldComponentUpdate: function() {},
  componentDidUpdate: function() {},
  componentWillUnmount: function() {},

  render: function () {
    return (
        <div className="Template">
          <p>Content for Template</p>
        </div>
      );
  }
});

module.exports = Template;
