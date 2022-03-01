import React from 'react'
import { Card, CardActionArea, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import { ArrowForward } from '@mui/icons-material'

const ProjectItem = ({ project }) => {
  const { createdAt, id } = project

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} to={'/admin/' + id}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" width="100%">
            {new Date(createdAt).toDateString()}{' '}
            {new Date(createdAt).toLocaleTimeString()}
            <ArrowForward size="small" color="disabled" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectItem
