'use strict';

var React = require('react/addons');

var JudgeActionCreators = require('../../../actions/JudgeActionCreators');



require('styles/secured/judges/JudgeForm.css');

var JudgeForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            judgeNo: this.props.judgeNo,
            password: this.props.password
        };
    },

  componentDidMount: function() {
      $(React.findDOMNode(this.refs.myModal)).modal();
      $(React.findDOMNode(this.refs.myModal)).on('hidden.bs.modal', function () {
          JudgeActionCreators.CloseDialog();
      });

  },
  render: function () {
    return (
        <div className="JudgeForm">
            <div className="modal fade" ref="myModal" tabindex="-1" role="dialog" aria-labelledby="Edit Judge">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Add/Edit Judge</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal">
                              <div className="form-group">
                                   <label className="control-label col-md-2">Judge No</label>
                                  <div className="col-md-10">
                                      <input type="text" className="form-control" valueLink={this.linkState('judgeNo')}/>
                                  </div>
                              </div>
                                <div className="form-group">
                                    <label className="control-label col-md-2">Password</label>
                                    <div className="col-md-10">
                                        <input type="password" className="form-control" valueLink={this.linkState('password')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }


});

module.exports = JudgeForm;
