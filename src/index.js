import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Home from './pages/Home'
import reducers from 'store'
import React from 'react'
import './main.styl'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))
const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path='/' component={Home} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
