import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'

import errorMiddleware from './error'

export default [
    thunk,
    errorMiddleware,
    promiseMiddleware(),
    createLogger({ collapsed: true }),
]