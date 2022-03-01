import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../util/client'

let initialState = {
  user: {},
  status: 'idle',
  createStatus: 'idle',
  updateStatus: 'idle',
  error: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ headers }) => {
    const { user } = await client.request({
      headers,
      url: '/me',
    })
    return user
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: '/me',
      method: 'POST',
      data: inputs,
    })
    return user
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/me`,
      method: 'PATCH',
      data: inputs,
    })
    return user
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ headers }) => {
    await client.request({
      headers,
      url: '/me',
      method: 'DELETE',
    })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state, action) {
      state.status = 'idle'
      state.user = {}
      state.error = null
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.scanRoute = '/'
    },
    [createUser.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createUser.fulfilled]: (state, action) => {
      state.createStatus = 'succeeded'
      state.user = action.payload
    },
    [createUser.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [updateUser.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      state.user = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
  },
})

export const { setUser, pushLocation, clearError, clearUser } =
  userSlice.actions

export default userSlice.reducer
