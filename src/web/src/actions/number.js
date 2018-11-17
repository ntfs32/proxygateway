import * as actionTypes from '../constants/number'

export function addCount(count) {
    return {
        type: actionTypes.COUNT,
        count
    }
}

export function changeText(text) {
    return {
        type: actionTypes.TEXT,
        text
    }
}