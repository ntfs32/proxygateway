import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider, connect } from 'react-redux'

import asyncComponent from '../components/asyncComponent'
import DevTools from '../components/common/devtools'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from '../components/common/auth'


export const createComponent = (component) => {
    return asyncComponent(() => import(`../components/${component}`))
}
export const history = createBrowserHistory()

const Login = userIsNotAuthenticatedRedir(createComponent('pages/login'))
const Dashboard = userIsAuthenticatedRedir(createComponent('pages/dashboard'))
const NotFound = createComponent('pages/notFound')

class classBrowserRouter extends Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route path='/login' component={Login} />
                            <Route extra path='/' component={Dashboard} />
                            <Route component={NotFound} />
                        </Switch>
                        {/* <DevTools /> */}
                    </div>
                </Router>
            </Provider>
        )
    }
}

const mapStateToProps = state => ({
    user: state.number
})
export default connect(mapStateToProps, { })(classBrowserRouter)