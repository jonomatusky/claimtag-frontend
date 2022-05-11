import React from 'react'
import { Outlet } from 'react-router-dom'

import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'
import AdminNavBar from 'layouts/AdminNav/components/NavBarAdmin'

const AdminNav = ({
  children,
  hideFooter,
  hideNavBar,
  backgroundColor,
  ...props
}) => {
  useFetch()
  usePageTrack()

  return (
    <>
      {!hideNavBar && <AdminNavBar {...props} />}
      <main style={{ backgroundColor }}>
        <Outlet />
      </main>
    </>
  )
}

export default AdminNav
