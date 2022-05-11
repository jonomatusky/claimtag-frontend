import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'

const PrivateRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user, initializing } = useSession()
  let location = useLocation()

  useFetch()
  usePageTrack()

  if (initializing) {
    return <Loading />
  } else if (!!user) {
    return <ReactComponent />
  } else {
    return (
      <Navigate
        replace
        to={redirectPath || '/login'}
        state={{ from: location }}
      />
    )
  }
}

export default PrivateRoute
