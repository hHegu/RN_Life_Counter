import Main from './src/views/Main'
import { Provider } from 'react-redux'
import React from 'react'
import { store } from './src/store'
import { useKeepAwake } from 'expo-keep-awake'

export default function App() {
  useKeepAwake()
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
