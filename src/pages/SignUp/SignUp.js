import React from 'react'
import {
  Link,
  Container,
  Box,
  Grid,
  Typography,
  Button,
  // Divider,
  TextField,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import useSession from 'hooks/use-session'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
})

const SignUp = ({ title, text }) => {
  const navigate = useNavigate()
  const { logout } = useSession()

  const { setError, clearError } = useAlertStore()

  const handleSubmit = async ({ email, password }) => {
    try {
      logout()
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      clearError()
      navigate(`/admin`)
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/email-already-in-use') {
        setError({
          message: `Another account is using ${email}. Please sign in instead.`,
        })
      } else {
        console.log(err)
        setError({
          message:
            'There was an error creating your account. Please try again.',
        })
      }
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

  // var provider = new firebase.auth.GoogleAuthProvider()

  // const handleSignInWithGoogle = async () => {
  //   clearError()
  //   try {
  //     await firebase.auth().signInWithPopup(provider)
  //     navigate('/admin')
  //   } catch (err) {
  //     setError({ message: 'Unable to sign in' })
  //   }
  // }

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={3}>
            <Grid item xs={12} mb={2}>
              <Typography variant="h4">
                <b>{title || 'Sign Up'}</b>
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
                size="small"
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
                size="small"
                placeholder="password"
                {...formik.getFieldProps('password')}
                FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ height: '51.5px' }}
              >
                <Typography
                  letterSpacing={1}
                  style={{ fontWeight: 900, fontSize: '18px' }}
                >
                  Sign In
                </Typography>
              </Button>
            </Grid>
            {/* <Grid item xs={12} container alignItems="center" spacing={1}>
                <Grid item xs>
                  <Divider color="#999999" />
                </Grid>
                <Grid item>
                  <Typography color="#999999" variant="body2">
                    or
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Divider color="#999999" />
                </Grid>
              </Grid> */}

            {/* <Grid item xs={12}>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  color="secondary"
                  fullWidth
                  sx={{
                    height: '51.5px',
                    textTransform: 'none',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                  onClick={handleSignInWithGoogle}
                >
                  <Box display="flex" mr="24px">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </Box>
                  <Typography letterSpacing={1} style={{ fontWeight: 500 }}>
                    Sign in with Google
                  </Typography>
                </Button>
              </Grid> */}
            <Grid item container justifyContent="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/login" size="small">
                  <b>Sign In</b>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default SignUp
