import React, { useState } from 'react'
import { Container, Grid, Button, Typography } from '@mui/material'

import { useProjectStore } from 'hooks/store/use-project-store'
import ProjectItem from './components/ProjectItem'
import CreateDialog from './components/CreateDialog'

const Admin = () => {
  const { projects } = useProjectStore()
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)

  return (
    <>
      <CreateDialog
        isOpen={createDialogIsOpen}
        setIsOpen={setCreateDialogIsOpen}
      />
      <Container maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disableElevation
              size="large"
              onClick={() => setCreateDialogIsOpen(true)}
            >
              <Typography textTransform="none">
                <b>Create Claimtags</b>
              </Typography>
            </Button>
          </Grid>
          {projects.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6">Past Exports</Typography>
            </Grid>
          )}
          {[...projects].map(project => {
            return (
              <Grid item xs={12} key={project.id}>
                <ProjectItem project={project} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default Admin
