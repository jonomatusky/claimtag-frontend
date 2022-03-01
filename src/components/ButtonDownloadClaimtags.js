import React from 'react'
import { Typography } from '@mui/material'
import { Download } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const ButtonDownloadClaimtags = ({
  diabled,
  isDownloading,
  setIsDownloading,
}) => {
  const handleClick = () => {
    if (!isDownloading) {
      setIsDownloading(true)
    }
  }

  return (
    <LoadingButton
      onClick={handleClick}
      variant="contained"
      size="large"
      disableElevation
      color="secondary"
      fullWidth
      endIcon={<Download />}
      loading={isDownloading}
      disabled={diabled}
    >
      <Typography textTransform={'none'}>
        <b>Download</b>
      </Typography>
    </LoadingButton>
  )
}

export default ButtonDownloadClaimtags
