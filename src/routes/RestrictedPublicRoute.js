import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from 'hooks/use-session'
import { useFetch } from 'hooks/use-fetch'

const RestrictedPublicRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user } = useSession()

  useFetch()

  if (!user) {
    return <ReactComponent />
  } else {
    return <Navigate replace to={redirectPath || '/'} />
  }
}

export default RestrictedPublicRoute
