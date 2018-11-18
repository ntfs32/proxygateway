import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Spin, Icon } from 'antd'

import './index.css'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Loading extends Component {

    render() {
        return (
            <div className='Loading'>
                <Spin size='large' delay={500} tip='Loading' indicator={antIcon}><div/></Spin>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);
