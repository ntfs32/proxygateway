import * as actionTypes from '../constants/number'


let initialState = {
    text: '',
    count: 0
}

export default function number (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TEXT:
            return {...state, text:action.text}
        case actionTypes.COUNT:
            let oldCount = state.count
            return {...state, count: oldCount + action.count}
        default:
            return state
    }
}
