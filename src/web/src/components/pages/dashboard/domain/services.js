import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

class ServiceList extends Component {

    constructor(props) {
    super(props)
        console.log('domain pages.')
        this.state ={
            collapsed: false,
        }
    }

    componentWillMount() {
        const { match } = this.props
        const domain_id = _.get(match, 'params.id', null)
        this.props.domainActions.getServiceAction({domain_id})
    }

    render() {
        const { list, isLoading } = this.props.domain
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },{
        title: 'Id',
        key: 'id',
        dataIndex: 'id'
        }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            <a href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
            </span>
        ),
        }]
        return (
            <div>
                <Table rowKey={'id'}
                    columns={columns}
                    dataSource={list}
                    loading={isLoading}
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        domain: state.domain
    }
}

function mapDispatchToProps(dispatch) {
    return {
        domainActions: bindActionCreators(domainActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServiceList))
