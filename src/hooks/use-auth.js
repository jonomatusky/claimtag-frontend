import { useState, useEffect, useCallback } from 'react'
import firebase from 'config/firebase'
// import posthog from 'posthog-js'
import useUserStore from 'hooks/store/use-user-store'
import useProjectStore from 'hooks/store/use-project-store'

export const useAuth = () => {
  const { clearUser } = useUserStore()
  const { clearProjects } = useProjectStore()

  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
    }
  })

  const logout = useCallback(async () => {
    try {
      if (!!state.user) {
        clearProjects()
      }
      await firebase.auth().signOut()
      clearUser()
      // posthog.reset()
    } catch (err) {}
  }, [clearUser, clearProjects, state.user])

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setState({ initializing: false, user })
      // if (!!user) {
      //   posthog.identify(user.uid, {
      //     email: user.email,
      //     displayName: user.displayName,
      //   })
      // }
    })

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return { ...state, logout }
}
