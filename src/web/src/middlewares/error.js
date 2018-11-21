import isPromise from 'is-promise'
import _ from 'lodash'
import { message } from 'antd'



export default store => next => action => {
    if (!isPromise(action.payload)) {
        return next(action)
    }
    if (_.isUndefined(action.type)) {
        return next(action)
    }
    return action.payload.then(res=>{
        let errno = _.toNumber(_.get(res, 'errno'))
        let msg = _.get(res, 'msg')
        switch (errno) {
            case 40100:
                localStorage.clear()
                window.location.pathname = '/login'
                store.dispatch({
                    type: action.type,
                    payload: {
                        info: {}
                    }
                })
                break
            case 102:
                localStorage.clear()
                message.error(msg)
                store.dispatch({
                    type: action.type,
                    payload: {
                        info: {}
                    }
                })
                break
            case 0:
                next(action)
                break
            default:
                message.error(msg)
                break
        }  
    })
}