import React from 'react'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
} from '@mui/material'

import useSession from 'hooks/use-session'
import logo from 'images/claimtag-logo.svg'
import { NavLink } from 'react-router-dom'

const NavBarAdmin = ({ left, right, position, opacity }) => {
  const { logout } = useSession()

  const handleLogout = async () => {
    logout()
  }

  return (
    <AppBar position="sticky" top="0" color="transparent" elevation={0}>
      <Toolbar>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
        >
          {!!left ? (
            left
          ) : (
            <Box flexGrow={1}>
              <Grid container>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <img
                        src={logo}
                        alt="Claimtag Logo"
                        style={{ width: '20px', marginRight: '7px' }}
                      />
                      <Typography variant="h6">
                        <b>Claimtags</b>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}

          {right ? (
            right
          ) : (
            <Box display="flex" alignItems="center">
              <Box pr={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link
                  component={NavLink}
                  to="/contact"
                  color="inherit"
                  underline="none"
                >
                  Contact
                </Link>
              </Box>
              <Box>
                <Button onClick={handleLogout} color="secondary">
                  <Typography textTransform="none">Logout</Typography>
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBarAdmin
