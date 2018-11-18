import React, { Component } from 'react';
import { connect } from 'react-redux'
class Info extends Component {

    constructor(props) {
    super(props)
        console.log('info pages.')
        this.state ={
            collapsed: false,
        }
    }

    render() {
        return (
            <div>info dashboard</div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Info)
