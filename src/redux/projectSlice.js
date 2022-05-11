import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  projects: [],
  fetchStatus: 'idle',
  error: null,
  createStatus: 'idle',
  updateStatus: 'idle',
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({ headers }) => {
    const { projects } = await client.request({
      headers,
      url: `/me/projects`,
    })
    return projects
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ headers, ...inputs }) => {
    const { claimtags, project } = await client.request({
      headers,
      url: `/me/projects`,
      method: 'POST',
      data: inputs,
    })
    return { claimtags, project }
  }
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ headers, id, ...inputs }) => {
    const { project } = await client.request({
      headers,
      url: `/me/projects/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return { project }
  }
)

export const deleteProject = createAsyncThunk(
  'projectss/deleteProjects',
  async ({ headers, id }) => {
    await client.request({
      headers,
      url: `/me/projects/${id}`,
      method: 'DELETE',
    })
    return id
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action) {
      const { projects } = action.payload
      state.projects = projects
    },
    clearProjects(state, action) {
      state.projects = []
      state.fetchStatus = 'idle'
      state.error = null
      state.createStatus = 'idle'
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.fetchStatus = 'loading'
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.fetchStatus = 'succeeded'
      state.projects = action.payload
    },
    [fetchProjects.rejected]: (state, action) => {
      state.fetchStatus = 'failed'
      state.error = action.error.message
    },
    [createProject.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createProject.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const project = action.payload.project
      state.projects = [project, ...state.projects]
    },
    [createProject.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [updateProject.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updateProject.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      const updatedProject = action.payload
      const matchingIndex = state.projects.findIndex(
        project => project.id === updatedProject.id
      )
      const newProjects = state.projects
      newProjects[matchingIndex] = updatedProject
      state.projects = newProjects
    },
    [updateProject.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [deleteProject.fulfilled]: (state, action) => {
      const id = action.payload
      const matchingIndex = state.projects.findIndex(
        project => project.id === id
      )

      if (matchingIndex >= 0) {
        state.project = [
          ...state.project.slice(0, matchingIndex),
          ...state.project.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setProjects, setProject, clearProjects } = projectsSlice.actions

export default projectsSlice.reducer

export const selectProject = (state, projectId) => {
  return (state.projects.projects || []).find(
    project => project.id === projectId
  )
}
