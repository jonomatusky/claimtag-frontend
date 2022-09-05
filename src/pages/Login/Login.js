import React, { useState } from 'react'
import {
  Link,
  Container,
  Box,
  Grid,
  Typography,
  TextField,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { LoadingButton } from '@mui/lab'
import useSession from 'hooks/use-session'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
})

const NewPortalSignUp = ({ title, text }) => {
  const { logout } = useSession()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const { setError } = useAlertStore()

  const handleSubmit = async ({ email, password }) => {
    setIsSubmitted(true)
    try {
      logout()
      await firebase.auth().signInWithEmailAndPassword(email, password)
      navigate(`/admin`)
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        try {
          let signInMethods = await firebase
            .auth()
            .fetchSignInMethodsForEmail(email)

          if (
            signInMethods.length !== 0 &&
            !signInMethods.includes('password')
          ) {
            setError({
              message:
                'No password found for this account. Try a different login method.',
            })
          } else {
            setError({
              message: `Incorrect email or password. Please try again.`,
            })
          }
        } catch (err) {
          setError({
            message: `Incorrect email or password. Please try again.`,
          })
        }
      } else if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/user-not-found') {
        setError({
          message: `Incorrect email or password. Please try again.`,
        })
      } else {
        setError({
          message: `Incorrect email or password. Please try again.`,
        })
      }
      setIsSubmitted(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item xs={12} mb={2}>
              <Typography variant="h4">
                <b>{title || 'Sign In'}</b>
              </Typography>
            </Grid>
            {text && (
              <Grid item xs={12} mb={2}>
                <Typography variant="h6">
                  <b>{text}</b>
                </Typography>
              </Grid>
            )}
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
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                size="large"
                placeholder="password"
                {...formik.getFieldProps('password')}
                FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Typography mt={1}>
                <Link
                  component={RouterLink}
                  to="/recover"
                  color="secondary"
                  underline="hover"
                >
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ height: '51.5px' }}
                loading={isSubmitted}
              >
                <Typography
                  letterSpacing={1}
                  style={{ fontWeight: 900, fontSize: '18px' }}
                >
                  Sign In
                </Typography>
              </LoadingButton>
            </Grid>
            <Grid item container justifyContent="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/signup" size="small">
                  <b>Sign Up</b>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default NewPortalSignUp
