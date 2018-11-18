import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

const SubMenu = Menu.SubMenu

class DashboardMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            selectKeys: [this.props.history.location.pathname] || null
        }
    }

    handleClick = (e) => {
        this.setState({
            selectKeys: [e.key]
        })
        this.props.history.push(e.key)
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                collapsed={this.props.collapsed}
                theme='dark'
                defaultSelectedKeys={['/proxy']}
                selectedKeys={this.state.selectKeys}
                mode='inline'>
                <Menu.Item key='/proxy'>
                    <Icon type='pie-chart' />
                    <span>代理设置</span>
                </Menu.Item>
                <Menu.Item key='/domain'>
                    <Icon type='desktop' />
                    <span>域名管理</span>
                </Menu.Item>
                <SubMenu
                    key='sub1'
                    title={<span><Icon type='user' /><span>系统设置</span></span>}
                >
                    <Menu.Item key='3'>用户管理</Menu.Item>
                    <Menu.Item key='4'>角色管理</Menu.Item>
                    <Menu.Item key='5'>授权</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardMenu))
