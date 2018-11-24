import * as actionTypes from '../constants/ '


let initialState = {
    breadcrumbs: []
}

export default function breadcrumbs (state = initialState, action) {
    switch (action.type) {
        case actionTypes.BREADCRUM_UPDATE:
            return {...state, breadcrumbs:action.breadcrumbs}
        default:
            return state
    }
}
