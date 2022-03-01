import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField } from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { useSession } from 'hooks/use-session'
import { LoadingButton } from '@mui/lab'

const validationSchema = yup.object({
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .required('Password is required'),
})

const CreateAccountForm = ({ email, isSignIn }) => {
  const navigate = useNavigate()
  const { user, logout } = useSession()
  const { setError } = useAlertStore()
  const [status, setStatus] = useState('idle')

  const handleSubmit = async ({ password }) => {
    setStatus('submitted')
    if (status !== 'submitted') {
      try {
        logout()
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (err) {
        if (err.code === 'auth/invalid-email') {
          setError({ message: 'Please enter a valid email address' })
        } else if (err.code === 'auth/email-already-in-use') {
          setError({
            message: `Another account is using ${email}. Please sign in instead.`,
          })
        } else {
          setError({
            message:
              'There was an error creating your account. Please try again.',
          })
        }

        setStatus('error')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (user) {
      navigate(`/admin`)
    }
  }, [navigate, user])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Typography>
            {`Your Claimtags are on their way! ${
              isSignIn
                ? 'Enter your password to log in and save these claimtags to your account'
                : 'Enter a password to create an account and return to your Claimtags at any time.'
            }`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            label="Password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            fullWidth
            loading={formik.isSubmitting === true || status === 'submitted'}
          >
            <Typography
              letterSpacing={1}
              style={{ fontWeight: 900, textTransform: 'none' }}
            >
              <b>Create Account</b>
            </Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateAccountForm
