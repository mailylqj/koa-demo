import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { Router, Route, browserHistory } from 'react-router'
//import { routerMiddleware, push } from 'react-router-redux'
import reducer from './reducers';
import sagas from './sagas'; 

const sagaMiddleware = createSagaMiddleware();
// const middleware = routerMiddleware(browserHistory)

const store = createStore(
    reducer,
    composeWithDevTools( // 3：把 sagaMiddleware 当做一个中间件，引用调试工具
        applyMiddleware(sagaMiddleware)
    )
);//传入reducer

sagaMiddleware.run(sagas);

export default store;