import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useProjectStore from 'hooks/store/use-project-store'

const CreateDialog = ({ isOpen, setIsOpen }) => {
  const { createProject } = useProjectStore()
  const [count, setCount] = useState(40)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
  }

  const dropdownValues = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160, 200]

  const handleSubmit = async () => {
    setIsSubmitted(true)
    let res
    try {
      res = await createProject({ count })

      const timer = setTimeout(() => {
        if (res) {
          navigate(`/admin/${res.project.id}`)
        }
      }, 1000)
      return () => clearTimeout(timer)
    } catch (err) {}
  }

  return (
    <Dialog open={isOpen} maxWidth="xs" onClose={handleClose}>
      <DialogTitle>Choose how many Claimtags to create:</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} mt={1}>
            <FormControl fullWidth>
              <InputLabel id="count-label">Count</InputLabel>
              <Select
                labelId="count-label"
                id="count-select"
                value={count}
                label="Count"
                displayEmpty
                color="secondary"
                onChange={event => {
                  setCount(event.target.value)
                }}
              >
                {dropdownValues.map(value => (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              variant="contained"
              size="large"
              disableElevation
              color="secondary"
              fullWidth
              onClick={handleSubmit}
              loading={isSubmitted}
            >
              <Typography textTransform={'none'}>
                <b>Generate Claimtags</b>
              </Typography>
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleClose}
              type="button"
            >
              <Typography textTransform={'none'}>
                <b>Cancel</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDialog
