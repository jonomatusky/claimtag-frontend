import { useEffect } from 'react'

import { useUserStore } from './store/use-user-store'
import { useProjectStore } from './store/use-project-store'
import { useSession } from './use-session'
import useAlertStore from './store/use-alert-store'

export const useFetch = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  const {
    fetchUser,
    status: fetchUserStatus,
    user: storeUser,
    createMeStatus,
    createMe,
    subscribe,
  } = useUserStore()
  const { fetchProjects, status: fetchProjectsStatus } = useProjectStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUser()
      } catch (err) {
        setError({ message: err.message })
      }
    }

    if (!!user && fetchUserStatus === 'idle') {
      fetch()
    }
  }, [user, fetchUser, fetchUserStatus, setError, subscribe])

  useEffect(() => {
    if (
      fetchUserStatus === 'succeeded' &&
      !storeUser._id &&
      createMeStatus === 'idle'
    ) {
      try {
        createMe({})
      } catch (err) {}
    }
  }, [createMe, fetchUserStatus, storeUser, createMeStatus])

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchProjects()
      } catch (err) {}
    }
    if (
      fetchUserStatus === 'succeeded' &&
      fetchProjectsStatus === 'idle' &&
      !!storeUser._id
    ) {
      fetch()
    }
  }, [fetchUserStatus, fetchProjectsStatus, fetchProjects, user, storeUser])

  return
}
