
export default {
    // login
    login: 'POST /login',

    logout: '/logout',

    // domain
    getAllDomain: 'POST /domain/all',
    getOneDomain: 'POST /domain/get',
    addDomain: 'POST /domain/add',
    removeDomain: 'POST /domain/delete',
    updateDomain: 'POST /domain/update',

    // service
    getServiceListByDomainId: 'POST /service/list',
    getOneServiceByServiceId: 'POST /service/get',
    addService: 'POST /service/add',
    removeService: 'POST /service/remove',
    updateService: 'POST /service/edit',

    

    // server
    getServerListByServiceId: 'POST /server/list',
    getOneServerByServerId: 'POST /server/get',
    addServer: 'POST /server/add',
    removeServer: 'POST /server/remove',
    updateServer: 'POST /server/edit',

    // api
    getApiListByServiceId: 'POST /api/list',
    getOneApiByApiId: 'POST /api/get',
    addApi: 'POST /api/add',
    removeApi: 'POST /api/remove',
    updateApi: 'POST /api/edit',
}