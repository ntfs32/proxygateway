import { createStore } from 'redux'
import { compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configStore(initState){
    return createStore(
        reducer,
        initState,
        composeEnhancer(
            applyMiddleware(thunk)
        )
    )
}

export default configStore() 