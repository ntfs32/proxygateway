import * as actionTypes from '../constants/user'
import service from '../services'
console.log(service.login)
export function loginAction(data) {
    return {
        type: actionTypes.login,
        payload: service.login(data)
    }
}

export function logoutAction(data) {
    return {
        type: actionTypes.logout,
        // payload: logout()
    }
}