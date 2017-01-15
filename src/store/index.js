import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import logger from '../middlewares/logger'
import generator from '../middlewares/generator'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(logger, generator))

const store = createStore(reducer, {}, enhancer)
//not for prod
window.store = store

export default store