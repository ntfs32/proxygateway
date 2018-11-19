import { PENDING, FULFILLED } from 'redux-promise-middleware'
import _ from 'lodash'

import * as actionTypes from '../constants/domain'


let initialState = {
    domainList: [],
    serviceList: [],
    serverList: [],
    apiList: [],
    isLoading: false
}

export default function domain (state = initialState, action) {
    switch (action.type) {
        // get domain list 
        case `${actionTypes.getAllDomain}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.getAllDomain}_${FULFILLED}`:
            return {
                ...state,
                domainList: action.payload.info || [],
                isLoading: false
            }
        
        // get service list by domain id
        case `${actionTypes.getServiceListByDomainId}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.getServiceListByDomainId}_${FULFILLED}`:
            console.log(action.payload.info)
            return {
                ...state,
                serviceList: !_.isEmpty(action.payload.info) ? action.payload.info : [],
                isLoading: false
            }
        
        // get server list by service id
        case `${actionTypes.getServerListByServiceId}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.getServerListByServiceId}_${FULFILLED}`:
            return {
                ...state,
                serverList: !_.isEmpty(action.payload.info) ? action.payload.info : [],
                isLoading: false
            }

        // get api list by service id
        case `${actionTypes.getApiListByServiceId}_${PENDING}`:
            return {...state, isLoading: true}
        case `${actionTypes.getApiListByServiceId}_${FULFILLED}`:
            return {
                ...state,
                apiList: !_.isEmpty(action.payload.info) ? action.payload.info : [],
                isLoading: false
            }
        
        
        default:
            return state
    }
}
