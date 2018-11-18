import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { createComponent } from '../../../../routers'
import * as domainActions from '../../../../actions/domain'

const DomainList = createComponent('pages/dashboard/domain/list')
const ServicesList = createComponent('pages/dashboard/domain/services')
class Doamin extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/service/:id`} component={ServicesList} />
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
