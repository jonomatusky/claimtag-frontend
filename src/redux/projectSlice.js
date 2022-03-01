import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  projects: [],
  status: 'idle',
  error: null,
  createStatus: 'idle',
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
      state.status = 'idle'
      state.error = null
      state.createStatus = 'idle'
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.projects = action.payload
    },
    [fetchProjects.rejected]: (state, action) => {
      state.status = 'failed'
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

export const selectPack = (state, packId) => {
  return (state.packs.packs || []).find(pack => pack.id === packId)
}
