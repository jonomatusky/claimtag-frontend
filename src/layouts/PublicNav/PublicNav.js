import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toolbar } from '@mui/material'

import usePageTrack from 'hooks/use-page-track'
import WebsiteNavBar from 'layouts/PublicNav/components/NavBarPublic'
import ScrollToTop from 'components/ScrollToTop'

const PublicNav = ({ children, hideFooter, hideNavBar, ...props }) => {
  usePageTrack()

  return (
    <>
      <ScrollToTop />
      {!hideNavBar && <WebsiteNavBar {...props} />}
      <main>
        <Toolbar />
        <Outlet />
      </main>
    </>
  )
}

export default PublicNav
