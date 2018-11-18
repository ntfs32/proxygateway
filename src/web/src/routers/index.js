import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider, connect } from 'react-redux'

import asyncComponent from '../components/asyncComponent'
import DevTools from '../components/common/devtools'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from '../components/common/auth'


const createComponent = (component) => {
    return asyncComponent(() => import(`../components/${component}`))
}

const Login = userIsNotAuthenticatedRedir(createComponent('pages/login'))
const Protected = userIsAuthenticatedRedir(createComponent('pages/dashboard'))

class classBrowserRouter extends Component {
    constructor(args) {
        super(args)
        this.history = createBrowserHistory()
    }

    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <Router history={this.history}>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Protected} />
                            <Route path='/login' component={Login} />
                        </Switch>
                        <DevTools />
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