import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider, Progress, Tooltip } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

class ServerByServiceID extends Component {

    constructor(props) {
        super(props)
        console.log('domain pages.')
        this.state = {
            collapsed: false,
        }
    }

    componentWillMount() {
        const { match } = this.props
        const service_id = _.get(match, 'params.service_id', null)
        this.props.domainActions.getServerAction(service_id)
    }

    deleteAction = (id) => {
        this.props.domainActions.removeServerAction(id)
    }

    render() {
        const { serverList, isLoading } = this.props.domain
        const columns = [{
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        }, {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: 'Port',
            dataIndex: 'port',
            key: 'port'
        }, {
            title: 'Protocol',
            key: 'protocol',
            render: (text, record) => (
                <span>{ record.protocol === 'http://' ? 'HTTP' : 'HTTPS'}</span>
            )
        }, {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight'
        }, {
            title: 'Status',
            key: 'status',
            render: (text, record) => {
                let isActive = _.toString(record.status) === '1'
                return (
                    <Tooltip placement='topLeft' title={isActive? '活跃' : '异常'} arrowPointAtCenter>
                        <Progress type='circle' percent={100} width={40} status={isActive? 'success' : 'exception'} />
                    </Tooltip>
                )
            }
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/domain/edit/server/${record.id}`}>编辑</Link>
                    <Divider type='vertical' />
                    <a onClick={this.deleteAction.bind(this, record.id)} href='#delete'>删除</a>
                </span>
            ),
        }]
        return (
            <div>
                <Table rowKey={'id'}
                    columns={columns}
                    dataSource={serverList}
                    loading={isLoading}
                />
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
