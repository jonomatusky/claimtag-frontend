import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Link,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { request } from 'util/client'
import useProjectStore from 'hooks/store/use-project-store'
import ButtonDownloadClaimtags from './components/ButtonDownloadClaimtags'
import { Email, Send } from '@mui/icons-material'
import useAlertStore from 'hooks/store/use-alert-store'

const Create = () => {
  const [status, setStatus] = useState('idle')
  const [project, setProject] = useState()
  const [claimtags, setClaimtags] = useState([])
  const { createProject, createStatus } = useProjectStore()
  const { setError } = useAlertStore()

  const qrList = claimtags.map(claimtag => {
    return claimtag.path
  })

  useEffect(() => {
    const getClaimtags = async () => {
      try {
        const claimtags = await request({
          url: '/api/claimtags',
        })
        setClaimtags(claimtags)
        setStatus('success')
      } catch (err) {
        setError({
          message: 'Failed to retrieve claimtags. Please refresh the page.',
        })
      }
    }

    if (status === 'idle') {
      getClaimtags()
    }
  }, [status, setError])

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box
                minHeight="300px"
                display="flex"
                alignContent="space-between"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Box flexGrow={1} width="100%">
                  <Typography variant="h3" lineHeight={0.9} mt={2} mb={2}>
                    <b>Download your claimtags</b>
                  </Typography>
                  <Typography mb={1}>
                    Download them now or send them to your email.
                  </Typography>
                </Box>
                <Box flexGrow={1} width="100%">
                  <ButtonDownloadClaimtags qrList={qrList} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Create
