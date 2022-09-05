import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const Recover = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const { setError } = useAlertStore()

  const handleSubmit = async ({ email }) => {
    setIsSubmitted(true)
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      setIsSent(true)
    } catch (err) {
      console.log(err)
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code !== 'auth/user-not-found') {
        setError({
          message: 'Unable to send password reset email. Please try again.',
        })
      }
    }
    setIsSubmitted(false)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        {isSent && (
          <Grid container justifyContent="flex-start" spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4">
                <b>Check your email</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                If an account exists, we've sent a reset link to the email
                address provided.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                component={RouterLink}
                to="/login"
                color="secondary"
                endIcon={<Close color="secondary" />}
              >
                <Typography textTransform="none">
                  <b>Close</b>
                </Typography>
              </Button>
            </Grid>
          </Grid>
        )}
        {!isSent && (
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4">
                  <b>Password recovery</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6">
                  Enter the email you're using for your account.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="large"
                  placeholder="email"
                  {...formik.getFieldProps('email')}
                  FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  loading={isSubmitted}
                >
                  <Typography
                    letterSpacing={1}
                    style={{ fontWeight: 900, fontSize: '18px' }}
                  >
                    Continue
                  </Typography>
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  component={RouterLink}
                  to="/login"
                  fullWidth
                >
                  <Typography>Cancel</Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Container>
  )
}

export default Recover
