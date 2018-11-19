import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'

import * as domainActions from '../../../../actions/domain'

class DomainListPage extends Component {

    constructor(props) {
    super(props)
        console.log(this.props)
        this.state ={
            collapsed: false,
        }
    }

    componentWillMount() {
        this.props.domainActions.getAllAction()
    }

    deleteAction = (id) => {
        this.props.domainActions.removeDomainAction(id)
    }

    render() {
        const { domainList, isLoading } = this.props.domain
        const columns = [{
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            <Link to={`${this.props.match.url}/service/${record.id}`}>管理</Link>
            <Divider type="vertical" />
            <Link to={`/domain/edit/domain/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={this.deleteAction.bind(this, record.id)} href="#delete">删除</a>
            </span>
        ),
        }]
        return (
            <div>
                <Table rowKey={'id'}
                    columns={columns}
                    dataSource={domainList}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DomainListPage))
