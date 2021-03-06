import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Divider, Row, Col, Button, Modal } from 'antd'
import { withRouter, Link } from 'react-router-dom'

import * as domainActions from '../../../../actions/domain'

class DomainListPage extends Component {
    componentWillMount() {
        this.props.domainActions.getAllAction()
    }

    deleteAction = (id) => {
        this.props.domainActions.removeDomainAction(id).then(() => {
            this.props.domainActions.getAllAction()
        })
    }

    showDeleteConfirm = (record) => {
        Modal.confirm({
            title: '确定删除以下内容?',
            content: `Domain: ${record.name}`,
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
            <a onClick={this.showDeleteConfirm.bind(this, record)} href="#delete">删除</a>
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
                                this.props.history.push(`/domain/add/domain/-1`)
                            }}
                        >
                            新增
                        </Button>
                    </Col>
                </Row>
                <div>
                    <Table rowKey={'id'}
                        columns={columns}
                        dataSource={domainList}
                        loading={isLoading}
                    />
                </div>
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
