import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import * as actionTypes from '../constants/user'


let initialState = {
    data: null,
    isLoading: false
}

export default function user (state = initialState, action) {
    switch (action.type) {
        case `${actionTypes.login}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.login}_${FULFILLED}`:
        let loginInfo = action.payload.info
            return {...state, data: loginInfo }
        default:
            return state
    }
}
