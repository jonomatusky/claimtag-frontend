import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

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

  return (
    <>
      {!hideNavBar && <WebsiteNavBar {...props} />}
      <main style={{ backgroundColor }}>
        <Box height={hideNavBar ? '0px' : '64px'} width="100%" mb={4} />
        <Outlet />
      </main>
    </>
  )
}

export default PublicNav
