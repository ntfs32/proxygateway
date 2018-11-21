import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout, Breadcrumb, Icon, Dropdown, Menu } from 'antd'
import { withRouter, Route, Switch  } from 'react-router-dom'

import DashboardMenu from './menu'
import { createComponent } from '../../../routers'
import * as userActions from '../../../actions/user'
import './index.css'

const { Header, Content, Footer, Sider } = Layout
const Info = createComponent('pages/dashboard/info')
const Proxy = createComponent('pages/dashboard/proxy')
const Domain = createComponent('pages/dashboard/domain')

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state ={
      collapsed: false,
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  logout = () => {
    this.props.userActions.logoutAction()
  }

  render() {
    const userMenu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.logout}>注销</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className='dashboard-layout'>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <DashboardMenu collapsed={this.state.collapsed.toString()} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Dropdown overlay={userMenu} trigger={['hover']}>
              <Icon
                  className='userBtn'
                  type={'user'}
                />
            </Dropdown>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '75vh' }}>
              <Switch>
                <Route path='/proxy' component={Proxy} />
                <Route path='/domain' component={Domain} />
                <Route path='/' component={Info} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ProxyGateway ©2018 Created by Shaddock
          </Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
