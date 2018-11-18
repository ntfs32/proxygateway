import React, { Component } from 'react';
import { Icon } from 'antd'

import './index.css'
class NotFound extends Component {
  render() {
    return (
      <div className='errorPage'>
      <Icon type="frown-o" />
      <h1>404 Not Found</h1>
    </div>
    );
  }
}

export default NotFound;
