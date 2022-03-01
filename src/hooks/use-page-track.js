// import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import posthog from 'posthog-js'
import ReactGA from 'react-ga'
// import useUserStore from './store/use-user-store'

// const { REACT_APP_POSTHOG_KEY } = process.env

export default function usePageTrack() {
  // const { pathname, search, hash } = useLocation()
  const { pathname, search } = useLocation()
  // const { user } = useUserStore()

  // useEffect(() => {
  //   if (REACT_APP_POSTHOG_KEY) {
  //     posthog.capture('$pageview')
  //   }
  // }, [pathname, hash, user])

  ReactGA.pageview(pathname + search)
}
