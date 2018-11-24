import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider, Progress, Tooltip, Col, Row, Button, Modal } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

class ServerByServiceID extends Component {

    constructor(props) {
        super(props)
        console.log('domain pages.')
        this.service_id = _.get(this.props.match, 'params.service_id', null)
    }

    componentWillMount() {
        this.props.domainActions.getServerAction(this.service_id)
    }

    deleteAction = (id) => {
        this.props.domainActions.removeServerAction(id).then(() => {
            this.props.domainActions.getServerAction(this.service_id)
        })
    }

    showDeleteConfirm = (record) => {
        Modal.confirm({
            title: '确定删除以下内容?',
            content: `后端服务器: ${record.protocol}${record.ip}:${record.port}`,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                this.deleteAction(record.id)
            },
            onCancel() {
                console.log('Cancel')
            }
        })
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
                    <a onClick={this.showDeleteConfirm.bind(this, record)} href='#delete'>删除</a>
                </span>
            ),
        }]
        return (
            <div>
                <Row>
                    <Col style={{ margin: '0 0px 10px', float: 'right' }}>
                        <Button
                            type='primary'
                            onClick={() => {
                                this.props.history.push(`/domain/add/server/${this.service_id}`)
                            }}
                        >
                            新增
                        </Button>
                    </Col>
                </Row>
                <div>
                    <Table rowKey={'id'}
                        columns={columns}
                        dataSource={serverList}
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
