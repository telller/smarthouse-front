import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Routes from './Routes'
import reducers from 'store'
import React from 'react'
import './app.styl'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))
const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
)
