import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserContext } from 'contexts/user-context'
import { useAuth } from 'hooks/use-auth'
import firebase from 'config/firebase'
// import posthog from 'posthog-js'
import ReactGA from 'react-ga'

import PrivateRoute from 'routes/PrivateRoute'
import Login from 'pages/Login/Login'
import SignUp from 'pages/SignUp/SignUp'
import Recover from 'pages/Recover/Recover'
import Home from 'pages/Home/Home'
import Admin from 'pages/Admin/Admin'
import Account from 'pages/Account/Account'

import AlertBar from 'components/AlertBar'
import Create from 'pages/Create/Create'
import PublicNav from 'layouts/PublicNav/PublicNav'
import RestrictedPublicRoute from 'routes/RestrictedPublicRoute'
import AdminNav from 'layouts/AdminNav/AdminNav'
import NotFound from 'components/NotFound'
import AdminProject from 'pages/AdminProject/AdminProject'

// const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  const { user, logout, initializing } = useAuth()

  // posthog.init(REACT_APP_POSTHOG_KEY, {
  //   api_host: 'https://app.posthog.com',
  // })

  ReactGA.initialize('UA-136166229-3')

  firebase.analytics()

  return (
    <UserContext.Provider
      value={{ user: user, logout: logout, initializing: initializing }}
    >
      <Router>
        <AlertBar />
        <Routes>
          <Route path="/" element={<PublicNav />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/create"
              element={
                <RestrictedPublicRoute
                  component={Create}
                  redirectPath="/admin"
                />
              }
            />
            <Route path="/recover" element={<Recover />} />
          </Route>
          <Route path="/" element={<PublicNav right={<></>} hideFooter />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute component={AdminNav} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:pid" element={<AdminProject />} />
          </Route>
          <Route path="/account" element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
