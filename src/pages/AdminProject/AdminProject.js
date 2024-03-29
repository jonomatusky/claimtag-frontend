import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Grid, Typography, Container } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Download } from '@mui/icons-material'
// import { request } from 'util/client'
import useProjectStore from 'hooks/store/use-project-store'
// import ButtonDownloadClaimtags from 'components/ButtonDownloadClaimtags'
import { Send, ArrowBack } from '@mui/icons-material'
import useAlertStore from 'hooks/store/use-alert-store'
import useSession from 'hooks/use-session'
import { useRequest } from 'hooks/use-request'
import DialogDownload from 'components/DialogDownload'

const AdminProject = () => {
  const { pid } = useParams()
  const [status, setStatus] = useState('idle')
  const [isDownloading, setIsDownloading] = useState(false)
  const { user } = useSession()
  const [claimtags, setClaimtags] = useState([])
  const { selectProject } = useProjectStore()
  const { setError } = useAlertStore()
  const { request } = useRequest()
  const [sendEmailStatus, setSendEmailStatus] = useState('idle')

  const project = selectProject(pid) || {}

  useEffect(() => {
    const getClaimtags = async () => {
      setStatus('pending')
      try {
        const res = await request({ url: `/me/projects/${pid}/claimtags` })
        setClaimtags(res.claimtags)
        setStatus('success')
      } catch (err) {
        setError({
          message: 'Failed to retrieve claimtags. Please refresh the page.',
        })
        setStatus('error')
      }
    }

    if (!!user && status === 'idle' && sendEmailStatus === 'idle') {
      getClaimtags()
    }
  }, [status, setError, pid, user, request, sendEmailStatus])

  const qrList = claimtags.map(claimtag => {
    return claimtag.path
  })

  const handleSendToEmail = async () => {
    let timer

    if (sendEmailStatus !== 'pending') {
      setSendEmailStatus('pending')
      try {
        await request({
          url: `/project-emails/${pid}`,
          method: 'POST',
        })
        timer = setTimeout(() => {
          console.log('setSendEmailStatus success')
          setSendEmailStatus('success')
          timer = setTimeout(() => {
            setSendEmailStatus('idle')
          }, 2000)
        }, 1000)
      } catch (err) {
        setError({
          message:
            'There was an error sending your Claimtags. Please try again',
        })
        setSendEmailStatus('error')
      }
    }

    return () => clearTimeout(timer)
  }

  const name =
    claimtags.length && project.createdAt
      ? 'Claimtags ' +
        claimtags.length +
        'x - ' +
        (project.createdAt
          ? new Date(project.createdAt).toLocaleDateString() +
            ' ' +
            new Date(project.createdAt).toLocaleTimeString()
          : '')
      : 'Claimtags'

  return (
    <Container maxWidth="xs">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            color="secondary"
            startIcon={<ArrowBack />}
            component={Link}
            to="/admin"
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="outlined"
            size="large"
            disableElevation
            color="secondary"
            fullWidth
            endIcon={sendEmailStatus === 'success' ? null : <Send />}
            loading={sendEmailStatus === 'pending'}
            disabled={
              sendEmailStatus === 'success' || sendEmailStatus === 'pending'
            }
            onClick={handleSendToEmail}
          >
            <Typography textTransform={'none'}>
              <b>{sendEmailStatus !== 'success' ? 'Send to Email' : 'Sent!'}</b>
            </Typography>
          </LoadingButton>
        </Grid>
      </Grid>
      {/* <Download
        qrList={qrList}
        isDownloading={isDownloading}
        setIsDownloading={setIsDownloading}
      /> */}
      <DialogDownload
        filename={'Claimtags ' + name}
        qrList={qrList}
        isOpen={isDownloading}
        onClose={() => setIsDownloading(false)}
      />
    </Container>
  )
}

export default AdminProject
