import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import GlobalFont from './assets/styles/globalFont'
import GlobalStyle from './assets/styles/globalStyle'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalFont />
      <GlobalStyle />
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById('root')
)
