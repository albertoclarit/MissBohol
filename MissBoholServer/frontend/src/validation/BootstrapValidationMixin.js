/*eslint-disable no-unused-vars*/
var React = require('react');
/*eslint-enable no-unused-vars*/
var classNames = require('classnames');


var BootstrapValidationMixin = {

    renderHelpText: function(message) {
        return (
            <span className="help-block">{message}</span>
        );
    },
    getClasses: function(field) {
        return classNames({
            'form-group': true,
            'has-error': !this.isValid(field)
        });
    },
    handleReset: function(event) {
        event.preventDefault();
        this.clearValidations();
        this.setState(this.getInitialState());
    }
};


module.exports = BootstrapValidationMixin;
