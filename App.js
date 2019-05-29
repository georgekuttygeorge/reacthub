import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import Router from './screens/router'
import { PersistGate } from 'redux-persist/integration/react'
import Splash from './screens/splashScreen'

export { store }

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <PersistGate loading={<Splash loading={true} />} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
}

export default App