import { createStore } from 'redux'
import { compose, applyMiddleware } from 'redux'

import DevTools from '../components/common/devtools'
import reducer from '../reducers'
import middlewares from '../middlewares'

function configStore(initState){
    return createStore(
        reducer,
        initState,
        compose(
            applyMiddleware.apply(this, middlewares),
            // window.devToolsExtension ? window.devToolsExtension() : f => f, // redux tools with broswer tools
            DevTools.instrument() //redux tools with selfs,
        )
    )
}

export const store = configStore() 