import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchClaimtags,
  createClaimtag,
  updateClaimtag,
  deleteClaimtag,
  clearClaimtags,
} from 'redux/claimtagSlice'

export const useClaimtagStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchClaimtags = useCallback(async () => {
    await dispatchThunk(fetchClaimtags)
  }, [dispatchThunk])

  const _createClaimtag = useCallback(
    async claimtag => {
      const newClaimtag = await dispatchThunk(createClaimtag, claimtag)
      return newClaimtag
    },
    [dispatchThunk]
  )

  const _updateClaimtag = useCallback(
    async ({ id, ...claimtag }) => {
      await dispatchThunk(updateClaimtag, { id, ...claimtag })
    },
    [dispatchThunk]
  )

  const _deleteClaimtag = useCallback(
    async id => {
      await dispatchThunk(deleteClaimtag, { id })
    },
    [dispatchThunk]
  )

  const _clearClaimtags = useCallback(
    image => {
      dispatch(clearClaimtags())
    },
    [dispatch]
  )

  const { claimtags, status, error, updateStatus, createStatus } = useSelector(
    state => state.claimtags
  )

  const selectClaimtag = claimtagId => {
    return (claimtags || []).find(claimtag => claimtag.id === claimtagId)
  }

  return {
    fetchClaimtags: _fetchClaimtags,
    createClaimtag: _createClaimtag,
    updateClaimtag: _updateClaimtag,
    deleteClaimtag: _deleteClaimtag,
    clearClaimtags: _clearClaimtags,
    selectClaimtag,
    claimtags,
    status,
    error,
    updateStatus,
    createStatus,
  }
}

export default useClaimtagStore
