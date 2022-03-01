import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'

const CreateLayout = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box pt={10}>
        <Outlet />
      </Box>
    </Container>
  )
}

export default CreateLayout
