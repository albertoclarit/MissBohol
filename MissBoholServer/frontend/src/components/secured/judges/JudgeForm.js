'use strict';

var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');
var BootstrapValidationMixin = require('../../../validation/BootstrapValidationMixin');

var JudgeActionCreators = require('../../../actions/JudgeActionCreators');



require('styles/secured/judges/JudgeForm.css');

var JudgeForm = React.createClass({
    mixins: [ValidationMixin, React.addons.LinkedStateMixin, BootstrapValidationMixin],
    validatorTypes: {
        judgeNo: Joi.number().required().label('Judge No'),
        password: Joi.string().required().label('Password')
    },
    getInitialState: function() {
        /*return {
            judgeNo: this.props.judge.judgeNo,
            password: this.props.judge.password,
            id: this.props.judge.id
        };*/
        return this.props.judge;
    },

  componentDidMount: function() {
      $(React.findDOMNode(this.refs.myModal)).modal();
      $(React.findDOMNode(this.refs.myModal)).on('hidden.bs.modal', function () {
          JudgeActionCreators.CloseDialog();
      });

  },
  handleSubmit: function(event) {
        event.preventDefault();
        var onValidate = function(error/*, validationErrors*/) {
            if (!error) {
                $(React.findDOMNode(this.refs.myModal)).modal('hide');
                JudgeActionCreators.SaveJudge(this.state);
            }
        }.bind(this);
        this.validate(onValidate);
    },
  render: function () {

      var savelabel = this.state._entity ? 'Save Changes' : 'Add Judge';
    return (
        <div className="JudgeForm">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="modal fade" ref="myModal" tabindex="-1" role="dialog" aria-labelledby="Edit Judge">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel">Add/Edit Judge</h4>
                                </div>
                                <div className="modal-body">
                                          <div className={this.getClasses('judgeNo')}>
                                               <label className="control-label col-md-2">Judge No</label>
                                              <div className="col-md-10">
                                                   <input type="text" className="form-control" valueLink={this.linkState('judgeNo')}/>
                                                  {this.getValidationMessages('judgeNo').map(this.renderHelpText)}
                                              </div>
                                          </div>
                                            <div className={this.getClasses('password')}>
                                                <label className="control-label col-md-2">Password </label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control" valueLink={this.linkState('password')} />
                                                    {this.getValidationMessages('password').map(this.renderHelpText)}
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

module.exports = JudgeForm;
