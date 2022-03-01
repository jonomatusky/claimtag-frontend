import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import EmailForm from './EmailForm'
import CreateAccountForm from './CreateAccountForm'

const EmailDialog = ({ isOpen, setIsOpen, pid }) => {
  const [emailStatus, setEmailStatus] = useState('idle')
  const [email, setEmail] = useState('')

  const handldeClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} maxWidth="xs" onClose={handldeClose}>
      {emailStatus !== 'success' && (
        <>
          <DialogTitle>Enter your email</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <EmailForm
                  status={emailStatus}
                  setStatus={setEmailStatus}
                  pid={pid}
                  setEmail={setEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handldeClose}
                  type="button"
                >
                  <Typography textTransform={'none'}>
                    <b>Cancel</b>
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
      {emailStatus === 'success' && (
        <>
          <DialogTitle>Sent!</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CreateAccountForm
                  email={email}
                  pid={pid}
                  setEmail={setEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Typography textTransform={'none'}>
                    <b>Cancel</b>
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default EmailDialog
