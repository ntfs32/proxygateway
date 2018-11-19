import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider, Button, Row, Col } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

class ServerByServiceID extends Component {

    constructor(props) {
        super(props)
        console.log('api pages.')
        this.state = {
            collapsed: false,
        }
    }

    componentWillMount() {
        const { match } = this.props
        const service_id = _.get(match, 'params.service_id', null)
        this.props.domainActions.getApiAction(service_id)
    }

    deleteAction = (id) => {
        this.props.domainActions.removeApiAction(id)
    }

    render() {
        const { apiList, isLoading } = this.props.domain
        const columns = [{
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        }, {
            title: 'original_uri',
            dataIndex: 'original_uri',
            key: 'original_uri'
        }, {
            title: 'request_uri',
            dataIndex: 'request_uri',
            key: 'request_uri'
        }, {
            title: 'description',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: 'ip_uri_limit_seconds',
            dataIndex: 'ip_uri_limit_seconds',
            key: 'ip_uri_limit_seconds'
        }, {
            title: 'ip_uri_limit_times',
            dataIndex: 'ip_uri_limit_times',
            key: 'ip_uri_limit_times'
        }, {
            title: 'uri_limit_seconds',
            dataIndex: 'uri_limit_seconds',
            key: 'uri_limit_seconds'
        }, {
            title: 'uri_limit_times',
            dataIndex: 'uri_limit_times',
            key: 'uri_limit_times'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/domain/edit/api/${record.id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <a onClick={this.deleteAction.bind(this, record.id)} href="#delete">删除</a>
                </span>
            ),
        }]
        return (
            <div>
                <div>
                    <Button
                        style={{ marginBottom: '20px' }}
                        type='primary'
                        onClick={() => {
                            this.props.history.push('/domain/add/api')
                        }}
                    >
                        新增
                    </Button>
                </div>
                <div>
                    <Table rowKey={'id'}
                        columns={columns}
                        dataSource={apiList}
                        loading={isLoading}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        domain: state.domain
    }
}

function mapDispatchToProps(dispatch) {
    return {
        domainActions: bindActionCreators(domainActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServerByServiceID))
