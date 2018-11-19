
export default {
    // login
    login: 'POST /login',

    logout: '/logout',

    // domain
    getAllDomain: 'POST /domain/all/1',
    getOneDomain: 'POST /domain/get',
    addDomain: 'POST /domain/add',
    removeDomain: 'POST /domain/delete',
    updateDomain: 'POST /domain/update',

    // service
    getServiceListByDomainId: 'POST /service/list',
    getOneServiceByServiceId: 'POST /service/get',
    addService: 'POST /service/add',
    removeService: 'POST /service/delete',
    updateService: 'POST /service/edit',

    

    // server
    getServerListByServiceId: 'POST /server/list',
    getOneServerByServerId: 'POST /server/get',
    addServer: 'POST /server/add',
    removeServer: 'POST /server/delete',
    updateServer: 'POST /server/edit',

    // api
    getApiListByServiceId: 'POST /api/list',
    getOneApiByApiId: 'POST /api/get',
    addApi: 'POST /api/add',
    removeApi: 'POST /api/delete',
    updateApi: 'POST /api/edit',
}