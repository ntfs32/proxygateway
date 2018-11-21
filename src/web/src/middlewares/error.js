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
        // let status  = _.toNumber(_.get(res, 'status'))
        let msg = _.get(res, 'msg')
        switch (errno) {
            case 40100:
                localStorage.clear()
                window.location.pathname = '/login'
            case 102:
                localStorage.clear()
                message.error(msg)
                return store.dispatch({
                    type: action.type,
                    payload: {
                        info: {}
                    }
                })
            case 0:
                return next(action)
            default:
                message.error(msg)
                return
        }  
    })
    return next(action)
}