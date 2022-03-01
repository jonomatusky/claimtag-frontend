import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'

const PrivateRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user, initializing } = useSession()

  useFetch()
  usePageTrack()

  if (initializing) {
    return <Loading />
  } else if (!!user) {
    return <ReactComponent />
  } else {
    return <Navigate replace to={redirectPath || '/login'} />
  }
}

export default PrivateRoute
