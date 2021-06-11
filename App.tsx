import React, { useEffect } from 'react'

import Main from './src/views/Main'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { store } from './src/store'
import { useKeepAwake } from 'expo-keep-awake'

export default function App() {
  useKeepAwake()

  useEffect(() => {
    StatusBar.setHidden(true)
  }, [])

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
