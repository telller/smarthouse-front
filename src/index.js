import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { init } from 'actions/app'
import ReactDOM from 'react-dom'
import Home from './pages/Home'
import thunk from 'redux-thunk'
import reducers from './store'
import React from 'react'
import './main.styl'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)]
export const store = createStore(combineReducers(reducers), applyMiddleware(...middlewares))
store.dispatch(init())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
