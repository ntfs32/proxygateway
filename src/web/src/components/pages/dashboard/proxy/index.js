import React, { Component } from 'react';
import { connect } from 'react-redux'
class Proxy extends Component {

    constructor(props) {
    super(props)
        console.log('proxy pages.')
        this.state ={
            collapsed: false,
        }
    }

    render() {
        return (
            <div>proxy list</div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Proxy)
