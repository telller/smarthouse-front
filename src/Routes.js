import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Home from './pages/Home'
import React from 'react'

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    )
  }
}

export default hot(module)(App)
