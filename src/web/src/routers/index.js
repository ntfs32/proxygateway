import React, {Component} from 'react'
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'

import asyncComponent from '../components/asyncComponent'

const createComponent = (component) => {
    return asyncComponent(() => import(`../${component}`))
}

export default class classBrowserRouter extends Component {
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
                        <ul>
                            <li><Link to='/'>首页</Link></li>
                            <li><Link to='/about'>about</Link></li>
                        </ul>
                        <hr/>
                        <Route exact path='/' component={createComponent('containers/index')}/>
                        <Route path='/about' component={createComponent('containers/about')}/>
                        {/* <Route path='*' component={createComponent('containers/notFound')}/> */}
                    </div>
                </Router>
            </Provider>
        )
    }
}