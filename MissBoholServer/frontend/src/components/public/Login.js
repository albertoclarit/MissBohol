'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var LoginActionCreators = require('../../actions/LoginActionCreators');
var LoginStore = require('../../stores/LoginStore');

require('styles/public/Login.css');

var Login = React.createClass({
    mixins: [React.addons.LinkedStateMixin, Reflux.connect(LoginStore)],

    login: function(){

        LoginActionCreators.Login(this.state.username, this.state.password);
    },
  render: function () {

      var error = '';
      if(this.props.query.error)
      {
          error = (
          <div className="alert alert-danger"><strong>{this.props.query.error}</strong><br/></div>
          );
      }

    return (
        <div className="Login">
            <br/>
            <br/>
            {error}
            <div className="row">
             <div className="col-md-6 col-md-offset-3">

                     <div className="panel panel-default">
                         <div className="panel-heading">
                             <h3 className="panel-title">Login</h3>
                         </div>
                         <div className="panel-body">
                             <form className="form-horizontal">
                                 <div className="form-group">
                                     <label htmlFor="username" className="col-md-3 control-label">Judge No</label>
                                     <div className="col-md-9">
                                         <input type="username" className="form-control" id="username" placeholder="Judge No" valueLink={this.linkState('username')} />
                                         </div>
                                  </div>
                                 <div className="form-group">
                                     <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                     <div className="col-md-9">
                                         <input type="password" className="form-control" id="password" placeholder="Password" valueLink={this.linkState('password')}/>
                                     </div>
                                 </div>
                                 <div className="text-center">
                                     <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                                 </div>

                             </form>
                         </div>
                     </div>
             </div>
            </div>

        </div>
      );
  }
});

module.exports = Login;
