import { PENDING, FULFILLED } from 'redux-promise-middleware'

import * as actionTypes from '../constants/domain'


let initialState = {
    list: [],
    isLoading: false
}

export default function domain (state = initialState, action) {
    switch (action.type) {
        case `${actionTypes.getAllDomain}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.getAllDomain}_${FULFILLED}`:
            return {
                ...state,
                list: action.payload.info || [],
                isLoading: false
            }

        default:
            return state
    }
}
