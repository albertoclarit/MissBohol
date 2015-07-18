'use strict';

var React = require('react/addons');


var PreliminaryActionCreators = require('../../actions/PreliminaryActionCreators');
require('styles/secured/PreliminaryEditRow.css');

var PreliminaryEditRow = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
/*    getInitialState: function() {
        return this.props.preliminary;
    },*/
    talentChanged: function(){
        var newValue = React.findDOMNode(this.refs.talent).value;

       /* var state = this.state;
        state.talent = newValue;
        PreliminaryActionCreators.EditPreliminary(this.state);
        this.setState(state);*/

         var state = this.props.preliminary;
         state.talent = newValue;
         PreliminaryActionCreators.EditPreliminary(state);
        // this.setState(state);

        //console.log(this.state);
    },
  render: function () {

      var options = [];
      for(var i = 0; i <= 20; i++)
      {
          options.push(
              (<option value = {i} key={i}>{i}</option>)
          );
      }

    return (
        <tr>
            <td>{this.props.preliminary.judgeNo}</td>
            <td>{this.props.preliminary.candidate.candidateNo}</td>
            <td>{this.props.preliminary.candidate.lastname + ', ' + this.props.preliminary.candidate.firstname}</td>
            <td>
             <select ref="talent" className="form-control" onChange={this.talentChanged} value={this.props.preliminary.talent}>
                 {options}
             </select>
            </td>
            <td><strong>{this.props.preliminary.swimsuit}</strong></td>
            <td><strong>{this.props.preliminary.gown}</strong></td>
            <td><strong>{this.props.preliminary.witintelligence}</strong></td>
        </tr>
      );
  }
});

module.exports = PreliminaryEditRow;
