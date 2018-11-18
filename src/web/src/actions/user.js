import * as actionTypes from '../constants/user'
import service from '../services'

export function loginAction(data) {
    return {
        type: actionTypes.login,
        payload: service.login(data)
    }
}

export function logoutAction() {
    return {
        type: actionTypes.logout,
        payload: service.logout()
    }
}