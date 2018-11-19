import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider, Tooltip, Progress } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

class ServiceListByID extends Component {

    constructor(props) {
        super(props)
        console.log('domain pages.')
        this.state = {
            collapsed: false,
        }
    }

    componentWillMount() {
        const { match } = this.props
        const domain_id = _.get(match, 'params.domain_id', null)
        this.props.domainActions.getServiceAction(domain_id)
    }

    deleteAction = (id) => {
        this.props.domainActions.removeServiceAction(id)
    }

    render() {
        const { serviceList, isLoading } = this.props.domain
        const columns = [{
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: 'Host',
            dataIndex: 'host',
            key: 'host'
        }, {
            title: 'Status',
            key: 'status',
            render: (text, record) => {
                let serverCount = 0
                let statusObj = {} 
                _.map(_.split(record.status, ','), o =>{
                    let item = _.split(o, ' ')
                    serverCount += _.toInteger(item[1])
                    statusObj[item[0]] = _.toInteger(item[1])
                })
                console.log(statusObj.up / serverCount * 100)
                return (
                    <Tooltip placement='topLeft' title={`活跃：${statusObj.up}, 异常：${statusObj.down}`} arrowPointAtCenter>
                        <Progress type='circle' percent={statusObj.up / serverCount * 100} width={40} status={statusObj.up / serverCount === 1? 'success' : 'exception'} />
                    </Tooltip>
                )
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/server/${record.id}`}>后端服务器</Link>
                    <Divider type="vertical" />
                    <Link to={`${this.props.match.url}/api/${record.id}`}>URL映射</Link>
                    <Divider type="vertical" />
                    <Link to={`/domain/edit/service/${record.id}`}>编辑</Link>
                    <Divider type="vertical" />
                    <a onClick={this.deleteAction.bind(this, record.id)} href="#delete">删除</a>
                </span>
            ),
        }]
        return (
            <div>
                <Table rowKey={'id'}
                    columns={columns}
                    dataSource={serviceList}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServiceListByID))
