import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Link,
} from '@mui/material'

const AdminCreate = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const CountForm = () => {
    const [count, setCount] = useState()

    return (
      <form onSubmit={() => {}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h5">
              Create Your Claimtags
            </Typography>
            <Typography textAlign="center" variant="subtitle1">
              <Link color="inherit" underline="always">
                How does this work
              </Link>
              ?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="count-label">Count</InputLabel>
              <Select
                labelId="count-label"
                id="count-select"
                value={count}
                label="Count"
                onChange={event => {
                  setCount(event.target.value)
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={'50+'}>50+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              To create more than 50 claimtags at once,{' '}
              <Link component={RouterLink} to="/signup">
                create a free account
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Button type="submit" fullWidth>
          Create 40 Claimtags
        </Button>
        <Button type="button" href="#" fullWidth>
          Create An Account
        </Button>
      </form>
    )
  }

  if (!isSubmitted) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h5">
            Create Your Claimtags
          </Typography>
        </Grid>
        <Grid>
          <Button type="submit" fullWidth>
            Print them at home and use them at your next event. Scan once to
            claim, scan again to
          </Button>
        </Grid>
        <Typography variant="subtitle1">
          Don't need 50? Print fewer pages! To create more than 50 claimtags at
          once,{' '}
          <Link component={RouterLink} to="/signup">
            create a free account
          </Link>
        </Typography>
        <CountForm />
      </Grid>
    )
  }
  return <></>
}

export default AdminCreate
