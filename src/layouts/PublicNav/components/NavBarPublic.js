import React from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button as MuiButton,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Link,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import logo from 'images/claimtag-logo.svg'

import useSession from 'hooks/use-session'

const WebsiteNavBar = ({ left, right, position, opacity }) => {
  const { user, initializing } = useSession()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" top="0" elevation={1} color="inherit">
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
            <>
              <Box>
                <Grid container>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Link
                        component={RouterLink}
                        to="/"
                        underline="none"
                        color="secondary"
                      >
                        <Box display="flex" alignItems="center">
                          <img
                            src={logo}
                            alt="Claimtag Logo"
                            style={{ width: '20px', marginRight: '4px' }}
                          />
                          <Typography variant="h6">
                            <b>Claimtags</b>
                          </Typography>
                        </Box>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box pl={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link
                  component={NavLink}
                  to="/how-it-works"
                  color="inherit"
                  underline="none"
                >
                  How It Works
                </Link>
              </Box>
              <Box
                flexGrow={1}
                pl={2}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                <Link
                  component={NavLink}
                  to="/contact"
                  color="inherit"
                  underline="none"
                >
                  Contact
                </Link>
              </Box>
            </>
          )}

          {right ? (
            right
          ) : (
            <>
              {!initializing && (
                <Box>
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* <MuiButton
                      variant="contained"
                      component={RouterLink}
                      to="/signup"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      <Typography>
                        <b>Sign Up</b>
                      </Typography>
                    </MuiButton> */}
                    <IconButton
                      edge="end"
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      color="inherit"
                      size="large"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu"
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem component={RouterLink} to="/how-it-works">
                        How It Works
                      </MenuItem>
                      <MenuItem component={RouterLink} to="/contact">
                        Contact
                      </MenuItem>
                      <MenuItem component={RouterLink} to="/signup">
                        Sign Up
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to={user ? '/admin' : '/login'}
                      >
                        Sign In
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box mr={1}>
                      <MuiButton
                        component={RouterLink}
                        to={user ? '/admin' : '/login'}
                        size="small"
                        sx={{ textTransform: 'none' }}
                        color="secondary"
                      >
                        <Typography>Sign In</Typography>
                      </MuiButton>
                    </Box>

                    <MuiButton
                      variant="contained"
                      component={RouterLink}
                      to="/signup"
                      size="small"
                      sx={{ textTransform: 'none' }}
                      color="secondary"
                      disableElevation
                    >
                      <Typography>
                        <b>Get Started</b>
                      </Typography>
                    </MuiButton>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
