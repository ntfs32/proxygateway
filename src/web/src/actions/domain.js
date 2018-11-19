import * as actionTypes from '../constants/domain'
import service from '../services'

// get all list [domain , service , server , api]
export function getAllAction() {
    return {
        type: actionTypes.getAllDomain,
        payload: service.getAllDomain()
    }
}
export function getServiceAction(domain_id) {
    return {
        type: actionTypes.getServiceListByDomainId,
        payload: service.getServiceListByDomainId({domain_id})
    }
}
export function getServerAction(service_id) {
    return {
        type: actionTypes.getServerListByServiceId,
        payload: service.getServerListByServiceId({service_id})
    }
}
export function getApiAction(service_id) {
    return {
        type: actionTypes.getApiListByServiceId,
        payload: service.getApiListByServiceId({service_id})
    }
}


//get single data [domain , service , server , api]
export function getOneAction(data) {
    return {
        type: actionTypes.getOneDomain,
        payload: service.getOneDomain(data)
    }
}
export function getOneServiceAction(data) {
    return {
        type: actionTypes.getOneServiceByServiceId,
        payload: service.getOneServiceByServiceId(data)
    }
}
export function getOneServerAction(data) {
    return {
        type: actionTypes.getOneServerByServerId,
        payload: service.getOneServerByServerId(data)
    }
}
export function getOneApiAction(data) {
    return {
        type: actionTypes.getOneApiByApiId,
        payload: service.getOneApiByApiId(data)
    }
}


// update domain
export function updateDomainAction(data) {
    return {
        type: actionTypes.updateDomain,
        payload: service.updateDomain(data)
    }
}
export function updateServiceAction(data) {
    return {
        type: actionTypes.updateService,
        payload: service.updateService(data)
    }
}
export function updateServerAction(data) {
    return {
        type: actionTypes.updateServer,
        payload: service.updateServer(data)
    }
}
export function updateApiAction(data) {
    return {
        type: actionTypes.updateApi,
        payload: service.updateApi(data)
    }
}

// add domain
export function addDomainAction(data) {
    return {
        type: actionTypes.addDomain,
        payload: service.addDomain(data)
    }
}
export function addServiceAction(data) {
    return {
        type: actionTypes.addService,
        payload: service.addService(data)
    }
}
export function addServerAction(data) {
    return {
        type: actionTypes.addServer,
        payload: service.addServer(data)
    }
}
export function addApiAction(data) {
    return {
        type: actionTypes.addApi,
        payload: service.addApi(data)
    }
}

// remove domain
export function removeDomainAction(domain_id) {
    return {
        type: actionTypes.removeDomain,
        payload: service.removeDomain({domain_id})
    }
}
export function removeServiceAction(service_id) {
    return {
        type: actionTypes.removeService,
        payload: service.removeService({service_id})
    }
}
export function removeServerAction(server_id) {
    return {
        type: actionTypes.removeServer,
        payload: service.removeServer({server_id})
    }
}
export function removeApiAction(api_id) {
    return {
        type: actionTypes.removeApi,
        payload: service.removeApi({api_id})
    }
}