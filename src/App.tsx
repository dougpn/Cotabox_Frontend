import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './components/main.component'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
      </Switch>
    </Router>
  )
}

export default App
