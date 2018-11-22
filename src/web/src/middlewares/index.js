import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'

import errorMiddleware from './error'

let middlewares = [
    thunk,
    errorMiddleware,
    promiseMiddleware()
]
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({ collapsed: true }))
}

export default middlewares
