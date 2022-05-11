import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, Typography, Divider } from '@mui/material'

import { useProjectStore } from 'hooks/store/use-project-store'
import ProjectItem from './components/ProjectItem'
import CreateDialog from './components/CreateDialog'
import { Box } from '@mui/system'
import { Add } from '@mui/icons-material'
import useUserStore from 'hooks/store/use-user-store'

const Admin = () => {
  const { user } = useUserStore()
  const { projects, updateProject } = useProjectStore()
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)

  console.log(projects)
  console.log(user)

  useEffect(() => {
    const claimProjects = async id => {
      updateProject(id)
    }

    if (user) {
      for (let i = 0; i < projects.length; i++) {
        if (!projects[i].owner) {
          console.log('claiming project')
          claimProjects(projects[i].id)
        }
      }
    }
  }, [projects, updateProject, user])
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
        <Grid container spacing={3} mt={13}>
          {/* <Box> */}
          {[...projects].map(project => {
            return (
              <Grid item xs={12} key={project.id}>
                <ProjectItem project={project} />
              </Grid>
            )
          })}
          {/* </Box> */}
        </Grid>
      </Container>
    </>
  )
}

export default Admin
