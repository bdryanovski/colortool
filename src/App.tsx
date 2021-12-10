import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, HashRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import Navigation from './component/navigation'

import { Navigator } from './router'

import Compare from './screen/compare'

// Styles
import './styles/index.scss'

import configureStore, { history } from './redux/store'
const store = configureStore()

type AppProps = {}

export default class App extends Component<AppProps> {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <HashRouter>
            <div className='App container-full'>
              <ToastContainer autoClose={2000} />
              <Navigation />
              <div className='view'>
                <Switch>
                  {
                    Navigator.map((route, index) => {
                      return <Route key={index} path={route.path} component={route.component} />
                    })
                  }
                  <Route component={Compare} />
                </Switch>
              </div>
            </div>
          </HashRouter>
        </ConnectedRouter>
      </Provider>
    )
  }
}
