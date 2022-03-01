// import React, { useState } from 'react'
import React from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  // Menu,
  // MenuItem,
  // IconButton,
  // Divider,
  // Link,
  Button,
} from '@mui/material'
// import { Menu as MenuIcon } from '@mui/icons-material'

import { useSession } from 'hooks/use-session'
import logo from 'images/claimtag-logo.svg'

const WebsiteNavBar = ({ left, right, position, opacity }) => {
  // const { user, logout } = useSession()
  const { logout } = useSession()

  // const [anchorEl, setAnchorEl] = useState(null)

  // const handleOpen = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  const handleLogout = async () => {
    logout()
  }

  return (
    <AppBar position="absolute" top="0" color="transparent" elevation={0}>
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
            // <>
            //   <IconButton onClick={handleOpen}>
            //     <MenuIcon color="secondary" />
            //   </IconButton>
            //   <Menu
            //     id="simple-menu"
            //     anchorEl={anchorEl}
            //     open={Boolean(anchorEl)}
            //     transitionDuration={0}
            //     anchorOrigin={{
            //       horizontal: 'left',
            //       vertical: 'bottom',
            //     }}
            //     anchorPosition={{ left: 0, top: -20 }}
            //     onClose={handleClose}
            //     MenuListProps={{ onMouseLeave: handleClose }}
            //   >
            //     <MenuItem component={RouterLink} to="/admin/account">
            //       Change Email
            //     </MenuItem>
            //     <MenuItem component={RouterLink} to="/admin/account">
            //       Change Password
            //     </MenuItem>
            //     <MenuItem
            //       component={Link}
            //       href="https://help.plynth.com"
            //       target="_blank"
            //     >
            //       Get Help
            //     </MenuItem>
            //     <Divider />
            //     <MenuItem onClick={handleLogout}>Logout</MenuItem>
            //   </Menu>
            // </>
            <Button onClick={handleLogout} color="secondary">
              <Typography textTransform="none">Logout</Typography>
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
