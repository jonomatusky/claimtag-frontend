import { useEffect, useState } from 'react'

import { useUserStore } from './store/use-user-store'
import { useProjectStore } from './store/use-project-store'
import useSession from './use-session'
import useAlertStore from './store/use-alert-store'

export const useFetch = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  const [status, setStatus] = useState('idle')

  const {
    fetchUser,
    status: fetchUserStatus,
    user: storeUser,
    subscribe,
  } = useUserStore()
  const { fetchProjects, fetchStatus: fetchProjectsStatus } = useProjectStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        setStatus('loading')
        await fetchUser()
        setStatus('succeeded')
      } catch (err) {
        setStatus('failed')
        setError({ message: err.message })
      }
    }

    if (!!user && fetchUserStatus === 'idle') {
      fetch()
    }
  }, [user, fetchUser, fetchUserStatus, setError, subscribe])

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchProjects()
        setStatus('succeeded')
      } catch (err) {
        setStatus('failed')
      }
    }
    if (
      fetchUserStatus === 'succeeded' &&
      fetchProjectsStatus === 'idle' &&
      !!user &&
      !!storeUser._id
    ) {
      fetch()
    }
  }, [fetchUserStatus, fetchProjectsStatus, fetchProjects, user, storeUser])

  return { status }
}
