import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'

const EmailForm = ({ pid, status, setStatus, setEmail }) => {
  const validationSchema = Yup.object({
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    isSubscribed: Yup.boolean('Subscribe to newsletter'),
  })

  const handleSendToEmail = async values => {
    if (status !== 'pending') {
      setStatus('pending')
      setEmail(values.email)
      try {
        await request({
          url: `/project-emails/${pid}`,
          method: 'POST',
          data: values,
        })
        setStatus('success')
      } catch (err) {
        setStatus('error')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      isSubscribed: true,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSendToEmail,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Enter your email to send yourself a copy of the claimtags:
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
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="Keep me up to date on new features and updates"
            checked={formik.values.isSubscribed}
            onChange={() =>
              formik.setFieldValue('isSubscribed', !formik.values.isSubscribed)
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: status === 'error' ? 'flex' : 'none' }}
        >
          <Typography color="error.main" variant="subtitle2">
            Sorry, there was an error sending your claimtags. Please try again.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            endIcon={status === 'success' ? null : <Send />}
            type="submit"
            loading={status === 'pending'}
          >
            <Typography textTransform={'none'}>
              <b>Send</b>
            </Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default EmailForm
