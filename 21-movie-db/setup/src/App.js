import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return (
    <Switch>
      <Route path='/' exact><Home /></Route>
      <Route path='/movies/:id'><Movie /></Route>
    </Switch>
  )
}

export default App
