
export default {
    // login
    login: {
        method: 'POST',
        url: '/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },

    logout: 'POST /logout',
    // 域名
    addDomain: 'POST /domain/add',
    removeDomain: 'POST /domain/delete',
    updateDomain: 'POST /domain/update',
    getAllDomain: 'POST /domain/all',
}