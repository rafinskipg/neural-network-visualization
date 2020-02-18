import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Routes from './routes'

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <Switch>
          {Routes.map(r => (
            <Route
              path={r.path}
              key={r.path || 'not-found'}
              exact={r.exact}
              render={routeProps => (
                <r.component {...routeProps} metadata={r.metadata} />
              )}
            />
          ))}
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(App)
