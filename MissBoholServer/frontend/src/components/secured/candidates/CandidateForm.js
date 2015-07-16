'use strict';

var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');
var BootstrapValidationMixin = require('../../../validation/BootstrapValidationMixin');
var CandidatesActionCreators = require('../../../actions/CandidatesActionCreators');


require('styles/secured/candidates/CandidateForm.css');

var CandidateForm = React.createClass({
    mixins: [ValidationMixin, React.addons.LinkedStateMixin, BootstrapValidationMixin],
    validatorTypes: {
        candidateNo: Joi.number().required().label('Candidate No'),
        age: Joi.number().required().label('Age'),
        lastname: Joi.string().required().label('Lastname'),
        firstname: Joi.string().required().label('Firstname'),
        representation: Joi.string().required().label('Representation')
    },
    getInitialState: function() {
        return this.props.candidate;
    },
    componentDidMount: function() {
        $(React.findDOMNode(this.refs.myModal)).modal();
        $(React.findDOMNode(this.refs.myModal)).on('hidden.bs.modal', function () {
            CandidatesActionCreators.CloseDialog();
        });

    },
    handleSubmit: function(event) {
        event.preventDefault();
        var onValidate = function(error/*, validationErrors*/) {
            if (!error) {
                $(React.findDOMNode(this.refs.myModal)).modal('hide');
                CandidatesActionCreators.SaveCandidate(this.state);
            }
        }.bind(this);
        this.validate(onValidate);
    },
  render: function () {

      var savelabel = this.state._entity ? 'Save Changes' : 'Add Candidate';
    return (
        <div className="CandidateForm">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="modal fade" ref="myModal" tabindex="-1" role="dialog" aria-labelledby="Edit Judge">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Add/Edit Candidate</h4>
                            </div>
                            <div className="modal-body">
                                <div className={this.getClasses('candidateNo')}>
                                    <label className="control-label col-md-3">Candidate No</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" valueLink={this.linkState('candidateNo')}/>
                                        {this.getValidationMessages('candidateNo').map(this.renderHelpText)}
                                    </div>
                                </div>
                                <div className={this.getClasses('lastname')}>
                                    <label className="control-label col-md-3">Lastname </label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" valueLink={this.linkState('lastname')} />
                                        {this.getValidationMessages('lastname').map(this.renderHelpText)}
                                    </div>
                                </div>
                                <div className={this.getClasses('firstname')}>
                                    <label className="control-label col-md-3">Firstname </label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" valueLink={this.linkState('firstname')} />
                                        {this.getValidationMessages('firstname').map(this.renderHelpText)}
                                    </div>
                                </div>
                                <div className={this.getClasses('age')}>
                                    <label className="control-label col-md-3">Age</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" valueLink={this.linkState('age')}/>
                                        {this.getValidationMessages('age').map(this.renderHelpText)}
                                    </div>
                                </div>
                                <div className={this.getClasses('representation')}>
                                    <label className="control-label col-md-3">Representation </label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" valueLink={this.linkState('representation')} />
                                        {this.getValidationMessages('representation').map(this.renderHelpText)}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">{savelabel}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
      );
  }
});

module.exports = CandidateForm;
