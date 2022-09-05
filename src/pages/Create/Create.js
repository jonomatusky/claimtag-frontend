import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Download } from '@mui/icons-material'
import useProjectStore from 'hooks/store/use-project-store'
// import ButtonDownloadClaimtags from '../../components/ButtonDownloadClaimtags'
import { Email } from '@mui/icons-material'
import EmailDialog from './components/EmailDialog'
// import Download from 'components/Download'
import Link from 'components/Link'
import DialogDownload from 'components/DialogDownload'

const Create = () => {
  const [status, setStatus] = useState('ready')
  const [isDownloading, setIsDownloading] = useState(false)
  const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false)
  const { projects, createProject, createStatus } = useProjectStore()

  const project = projects[0] || {}

  const handleSubmit = async () => {
    setStatus('submitted')
    try {
      await createProject()
    } catch (err) {
      console.log(err)
      setStatus('done')
    }
  }

  useEffect(() => {
    if (status === 'submitted') {
      const timer = setTimeout(() => {
        if (status === 'submitted') {
          setStatus('done')
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  useEffect(() => {
    setStatus('ready')
  }, [])

  const handleCreateAccount = async () => {
    return
  }

  const handleOpenEmailDialog = () => {
    if (!!projects.length > 0) {
      setEmailDialogIsOpen(true)
    }
  }

  const qrList = (project.claimtags || []).map(claimtag => {
    return claimtag.path
  })

  const handleReset = () => {
    setStatus('ready')
  }

  const handleClose = () => {
    console.log('closing')
    setIsDownloading(false)
  }

  return (
    <>
      <EmailDialog
        isOpen={emailDialogIsOpen}
        setIsOpen={setEmailDialogIsOpen}
        pid={project.id}
      />
      <DialogDownload
        filename={'Claimtags'}
        qrList={qrList}
        isOpen={isDownloading}
        onClose={handleClose}
      />
      <Container maxWidth="xs">
        <Grid container justifyContent="center" spacing={1} mt={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                {createStatus === 'failed' && status !== 'ready' ? (
                  <Box
                    minHeight="300px"
                    display="flex"
                    alignContent="center"
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Box flexGrow={1} width="100%">
                      <Typography
                        variant="h4"
                        lineHeight={0.9}
                        mt={1}
                        mb={1}
                        textAlign="center"
                      >
                        Oops...
                      </Typography>
                      <Typography mb={1} textAlign="center">
                        Something went wrong. Please try again.
                      </Typography>
                    </Box>
                    <Box
                      flexGrow={1}
                      width="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <Button
                        size="large"
                        disableElevation
                        color="secondary"
                        onClick={handleReset}
                      >
                        <Typography textTransform={'none'}>
                          <b>Try Again</b>
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    {status === 'done' ? (
                      <Box
                        minHeight="300px"
                        display="flex"
                        alignContent="space-between"
                        justifyContent="center"
                        flexWrap="wrap"
                      >
                        <Box flexGrow={1} width="100%">
                          <Typography
                            variant="h3"
                            lineHeight={0.9}
                            mt={2}
                            mb={2}
                          >
                            Generated!
                          </Typography>
                          <Typography mb={1}>
                            Your Claimtags are ready. Download them now or send
                            them to your email.{' '}
                            <Link to="/signup">Create an account</Link> to
                            access them any time.
                          </Typography>
                        </Box>
                        <Box flexGrow={1} width="100%">
                          {/* <ButtonDownloadClaimtags
                            disabled={qrList.length === 0}
                            isDownloading={isDownloading}
                            setIsDownloading={() => {
                              setIsDownloading(true)
                            }}
                          /> */}
                          <LoadingButton
                            onClick={() => setIsDownloading(true)}
                            variant="contained"
                            size="large"
                            disableElevation
                            color="secondary"
                            fullWidth
                            endIcon={<Download />}
                            loading={isDownloading}
                            disabled={isDownloading}
                          >
                            <Typography textTransform={'none'}>
                              <b>Download</b>
                            </Typography>
                          </LoadingButton>

                          <Box mt={2}>
                            <Button
                              variant="outlined"
                              size="large"
                              disableElevation
                              color="secondary"
                              fullWidth
                              onClick={handleOpenEmailDialog}
                              endIcon={<Email />}
                            >
                              <Typography textTransform={'none'}>
                                <b>Send to Email</b>
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ) : status === 'ready' ? (
                      <Box
                        minHeight="300px"
                        display="flex"
                        alignContent="space-between"
                        justifyContent="center"
                        flexWrap="wrap"
                      >
                        <Box flexGrow={1} width="100%">
                          <Typography
                            variant="h3"
                            lineHeight={0.9}
                            mt={2}
                            mb={2}
                          >
                            Create Claimtags
                          </Typography>
                          <Typography mb={1}>
                            Create 40 ready-to-print Claimtags. Download them
                            immediately or send them to your email.
                          </Typography>
                          <Typography>
                            Need more? Create a{' '}
                            <Link to="/signup">free account</Link>.
                          </Typography>
                        </Box>
                        <Box flexGrow={1}>
                          <LoadingButton
                            variant="contained"
                            size="large"
                            disableElevation
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit}
                            loading={
                              createStatus !== 'idle' &&
                              createStatus !== 'failed'
                            }
                          >
                            <Typography textTransform={'none'}>
                              <b>Generate Claimtags</b>
                            </Typography>
                          </LoadingButton>

                          <Box mt={2}>
                            <Button
                              variant="outlined"
                              size="large"
                              disableElevation
                              color="secondary"
                              fullWidth
                              onClick={handleCreateAccount}
                            >
                              <Typography textTransform={'none'}>
                                <b>Create Account</b>
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        minHeight="300px"
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                        flexWrap="wrap"
                      >
                        <Box
                          flexGrow={1}
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <CircularProgress color="secondary" />
                        </Box>
                        <Box flexGrow={1} width="100%">
                          <Typography
                            variant="h4"
                            lineHeight={0.9}
                            mt={1}
                            mb={1}
                            textAlign="center"
                          >
                            <b>Generating...</b>
                          </Typography>
                          <Typography mb={1} textAlign="center">
                            Your Claimtags are being generated. They will be
                            valid for <b>14 days</b>. Remove the time limit by{' '}
                            <Link to="/signup">creating an account</Link>.
                          </Typography>
                          <Box width="100%" textAlign="center">
                            <Button onClick={() => setStatus('ready')}>
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={11}>
            {/* <Typography variant="body2" mb={1}>
            Create a free account to remove the 14 day time limit, generate more
            than 50 Claimtages at a time, and manage your project.
          </Typography> */}
            <Typography variant="body2" textAlign="center">
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography>
          </Grid>
        </Grid>
        {/* <Download
          qrList={qrList}
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
        /> */}
      </Container>
    </>
  )
}

export default Create
