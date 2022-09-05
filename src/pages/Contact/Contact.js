import React from 'react'
import { Box, Grid, Typography, Container, Paper } from '@mui/material'
import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup'

import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useRequest from 'hooks/use-request'

const Contact = () => {
  const { status, request } = useRequest()

  const formFields = [
    {
      name: 'name',
      label: 'Name*',
      type: 'text',
      validation: Yup.string()
        .required('First name is required')
        .max(50, 'Must be under 100 characters'),
    },
    {
      name: 'email',
      label: 'Email*',
      type: 'email',
      validation: Yup.string()
        .required('Email is required')
        .email('Must be a valid email address'),
    },
    {
      name: 'company',
      label: 'Company (Optional)',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
    {
      name: 'message',
      label: 'Message (Optional)',
      type: 'textarea',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
  ]

  const handleSubmit = async values => {
    try {
      await request({
        url: `/inquiries`,
        method: 'POST',
        data: values,
      })
    } catch (err) {}
  }

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  console.log(status)

  return (
    <Container maxWidth="xs">
      <Box mb={5} mt={4}>
        <Paper variant="outlined">
          <Box p={2} pb={4}>
            {status === 'succeeded' && (
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={11}>
                  <Typography variant="h6" textAlign="center">
                    Thanks for reaching out! We'll get back to you as soon as we can.
                  </Typography>
                </Grid>
              </Grid>
            )}
            {status !== 'succeeded' && (
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h4" mb={2} textAlign="center">
                    Contact Us
                  </Typography>
                  <Typography textAlign="center">
                    Need to get in touch? Drop us a line and we'll get right
                    back to you.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Form
                    formFields={formFields}
                    submit={submit}
                    control={control}
                    spacing={2}
                  />
                </Grid>
                {status === 'error' && (
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      color="error.main"
                    >
                      Something went wrong. Please try again.
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    onClick={submit}
                    size="large"
                    loading={status === 'loading'}
                    endIcon={<Send />}
                  >
                    Send
                  </LoadingButton>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Contact
