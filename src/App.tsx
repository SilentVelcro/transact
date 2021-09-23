import React, { useEffect, useState } from 'react'

import { localAuth } from './auth'
import Login from './auth/Login'
import { Layout, Transactions } from './components'
import { sampleData } from './data'
import { AppState } from './types'

// API URL
// `https://transact-example.herokuapp.com`

const initialState = {
  data: undefined,
  loggedIn: false,
  authError: false,
}

const App:React.FC<{}> = () => {
  const [appState, setAppState] = useState<AppState>(initialState)

  const signOut = () => {
    setAppState(initialState)
  }

  const loadData = () => {
    setAppState({
      loggedIn: true,
      authError: false,
      data: sampleData,
    })
  }

  useEffect(() => {
    const checkLocalAuth = async () => {
      const authFailed = appState.authError

      if (!authFailed) {
        const localAuthSucceeded = await localAuth(loadData)

        if (localAuthSucceeded) {
          setAppState({ ...appState, loggedIn: true })
        } else {
          setAppState({ ...appState, authError: true })
        }
      }
    }

    checkLocalAuth()
  }, [])
  
    if (appState.loggedIn) {
      return (
        // Add 'Sign out' button
        <Layout>
          <h1>Recent Transactions</h1>
          <Transactions transactions={appState.data} />
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>Check Recent Transactions</h1>
          <Login onSignIn={loadData} />
        </Layout>
      )
    }

}

export default App
