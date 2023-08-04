import createSagaMiddleware from '@redux-saga/core'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import rootSaga from 'saga/rootsaga'
import { authReducer } from './auth/loginSlice'
const middlewares: any = []
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)
const appReducer = combineReducers({
    auth: authReducer,
})

const rootReducer = (state: any, action: AnyAction) => {
    // if (action.type === 'Auth/logout' || action.type === 'OTP/logout') {
    //     return appReducer(undefined, action)
    // }
    return appReducer(state, action)
}
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
})

sagaMiddleware.run(rootSaga)

export default store
