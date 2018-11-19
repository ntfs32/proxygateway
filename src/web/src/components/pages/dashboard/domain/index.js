import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { createComponent } from '../../../../routers'
import * as domainActions from '../../../../actions/domain'

const DomainList = createComponent('pages/dashboard/domain/list')
const ServiceList = createComponent('pages/dashboard/domain/service')
const ServerList = createComponent('pages/dashboard/domain/server')
const ApiList = createComponent('pages/dashboard/domain/api')
const EditForm = createComponent('pages/dashboard/domain/form')
class Doamin extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/service/:domain_id/api/:service_id`} component={ApiList} />
                    <Route path={`${this.props.match.url}/service/:domain_id/server/:service_id`} component={ServerList} />
                    <Route path={`${this.props.match.url}/edit/:type/:id`} component={EditForm} />
                    <Route path={`${this.props.match.url}/add/:type`} component={EditForm} />                    
                    <Route path={`${this.props.match.url}/service/:domain_id`} component={ServiceList} />
                    <Route component={DomainList} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        domainActions: bindActionCreators(domainActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Doamin))
