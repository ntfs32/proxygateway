import { PENDING, FULFILLED } from 'redux-promise-middleware'
import localStorage from 'localStorage'
import _ from 'lodash'

import * as actionTypes from '../constants/user'


let initialState = {
    data: localStorage.getItem('token') || null,
    isLoading: false
}

export default function user (state = initialState, action) {
    switch (action.type) {
        case `${actionTypes.login}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.login}_${FULFILLED}`:
        let loginInfo = action.payload.info
            localStorage.setItem('token', _.get(loginInfo, 'token'))
            return {...state, data: loginInfo }

        // case `${actionTypes.logout}_${PENDING}`:
        //     return {...state, isLoading: true}
        case `${actionTypes.logout}_${FULFILLED}`:
            localStorage.removeItem('token')
            return {...state, data: null }
        default:
            return state
    }
}
