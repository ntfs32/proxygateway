import * as actionTypes from '../constants/domain'
import service from '../services'

export function getAllAction() {
    return {
        type: actionTypes.getAllDomain,
        payload: service.getAllDomain()
    }
}

// get services list by domain id
export function getServiceAction(data) {
    return {
        type: actionTypes.getServiceListByDomainId,
        payload: service.getServiceListByDomainId(data)
    }
}