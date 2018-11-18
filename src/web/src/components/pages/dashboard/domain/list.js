import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'

import * as domainActions from '../../../../actions/domain'

class DomainList extends Component {

    constructor(props) {
    super(props)
        console.log('domain pages.')
        this.state ={
            collapsed: false,
        }
    }

    componentWillMount() {
        this.props.domainActions.getAllAction()
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
            <Link to={`${this.props.match.url}/service/${record.id}`}>编辑</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DomainList))
