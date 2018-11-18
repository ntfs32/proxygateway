import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'

import * as numberActions from '../../../actions/number'

class App extends Component {

  AddCount = () => {
    this.props.numberActions.addCount(1)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Dashboard
          </p>
          <p>
            count: {this.props.number.count}
            </p>
          <Button type='primary' onClick={this.AddCount}>click</Button>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    numberActions: bindActionCreators(numberActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
