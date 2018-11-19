import request from '../utils/request'
import { apiPrefix } from '../utils/config'
import  _ from 'lodash'
import queryString from 'querystring'
import api from './api'

const gen = params => {
    let requestParams = {
        url: apiPrefix + params,
        method: 'GET',
    }
    if(_.isObject(params)) {
        requestParams = params
        requestParams.url = !_.isUndefined(requestParams.url) ? apiPrefix + requestParams.url : requestParams.url
        requestParams.method = !_.isUndefined(requestParams.method) ? requestParams.method : 'GET'
    } else{
        const paramsArray = params.split(' ')
        if (paramsArray.length === 2) {
            requestParams.method = paramsArray[0]
            requestParams.url = apiPrefix + paramsArray[1]
        }
    }

    return function (data) {
        // 本项目post数据目前非json
        requestParams.headers = {}
        requestParams.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        data = queryString.stringify(data)
        return request({...requestParams, data})
    }
}

const APIFunction = {}
for (const key in api) {
    APIFunction[key] = gen(api[key])
}

export default APIFunction