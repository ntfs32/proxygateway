import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'

import * as numberActions from '../../actions/number'
import './index.css';

class App extends Component {
  constructor (props) {
    super(props)
  }


  AddCount = () => {
    this.props.numberActions.addCount(1)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>containers/index/index.js</code> and save to reload.
            text:{this.props.number.text}
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
