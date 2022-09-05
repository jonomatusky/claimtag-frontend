import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material'

import { useProjectStore } from 'hooks/store/use-project-store'
import ProjectItem from './components/ProjectItem'
import CreateDialog from './components/CreateDialog'
import { Box } from '@mui/system'
import { Add } from '@mui/icons-material'
import useUserStore from 'hooks/store/use-user-store'

const Admin = () => {
  const { user } = useUserStore()
  const { projects, updateProject, fetchStatus, updateStatus } =
    useProjectStore()
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)

  useEffect(() => {
    const claimProject = async id => {
      try {
        await updateProject(id)
      } catch (err) {}
    }

    if (user && updateStatus === 'idle') {
      for (let i = 0; i < projects.length; i++) {
        if (!projects[i].owner) {
          console.log('claiming ' + projects[i].id)
          claimProject(projects[i].id)
        }
      }
    }
  }, [projects, updateProject, user, updateStatus])

  return (
    <>
      <CreateDialog
        isOpen={createDialogIsOpen}
        setIsOpen={setCreateDialogIsOpen}
      />
      <Box
        top={0}
        pt="64px"
        position="fixed"
        zIndex={100}
        sx={{ bgcolor: 'background.default' }}
        width="100%"
      >
        <Container maxWidth="xs">
          <Grid container spacing={3} mt={2} pb={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disableElevation
                size="large"
                onClick={() => setCreateDialogIsOpen(true)}
                endIcon={<Add />}
              >
                <Typography textTransform="none">
                  <b>Create Claimtags</b>
                </Typography>
              </Button>
            </Grid>
            {/* {projects.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                  Past Exports
                </Typography>
              </Grid>
            )} */}
          </Grid>
        </Container>
        <Divider />
      </Box>
      <Container maxWidth="xs">
        <Grid container spacing={3} mt={13} mb={2}>
          {fetchStatus !== 'succeeded' && fetchStatus !== 'failed' && (
            <Grid item xs={12}>
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress color="secondary" />
              </Box>
            </Grid>
          )}
          {fetchStatus === 'succeeded' && projects.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                Previous Claimtags
              </Typography>
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
