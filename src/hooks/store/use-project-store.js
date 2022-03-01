import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchProjects,
  createProject,
  deleteProject,
  clearProjects,
} from 'redux/projectSlice'

export const useProjectStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchProjects = useCallback(async () => {
    await dispatchThunk(fetchProjects)
  }, [dispatchThunk])

  const _createProject = useCallback(
    async count => {
      const newProject = await dispatchThunk(createProject, { count })
      return newProject
    },
    [dispatchThunk]
  )

  const _deleteProject = useCallback(
    async id => {
      await dispatchThunk(deleteProject, { id })
    },
    [dispatchThunk]
  )

  const _clearProjects = useCallback(
    image => {
      dispatch(clearProjects)
    },
    [dispatch]
  )

  const { projects, status, error, createStatus } = useSelector(
    state => state.projects
  )

  const selectProject = projectId => {
    return (projects || []).find(project => project.id === projectId)
  }

  return {
    fetchProjects: _fetchProjects,
    createProject: _createProject,
    deleteProject: _deleteProject,
    clearProjects: _clearProjects,
    selectProject,
    projects,
    status,
    error,
    createStatus,
  }
}

export default useProjectStore
