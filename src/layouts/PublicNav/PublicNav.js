import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid, Typography, Link } from '@mui/material'

import { use100vh } from 'hooks/use-100-vh'
import usePageTrack from 'hooks/use-page-track'
import WebsiteNavBar from 'layouts/PublicNav/components/NavBarPublic'

const PublicNav = ({
  children,
  hideFooter,
  hideNavBar,
  backgroundColor,
  ...props
}) => {
  usePageTrack()

  const height = use100vh()

  return (
    <Box minHeight={height} position="relative" width="100%">
      {!hideNavBar && <WebsiteNavBar {...props} />}
      <main style={{ backgroundColor }}>
        <Box height={hideNavBar ? '0px' : '64px'} width="100%" mb={4} />
        <Outlet />
      </main>
      {!hideFooter && (
        <footer>
          <Box height="64px" width="100%" />

          <Box position="sticky" bottom={0} left={0} width="100%" pb={1}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography
                  fontSize="14px"
                  // color="#ffffff99"
                  textAlign="center"
                >
                  Created by the <Link href="https://plynth.com">Plynth</Link>{' '}
                  team
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </footer>
      )}
    </Box>
  )
}

export default PublicNav
