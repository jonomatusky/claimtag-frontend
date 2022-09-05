import React from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import DownloadComponent from './DownloadComponent'
import { Box } from '@mui/system'

const DialogDownload = ({ filename, qrList, isOpen, onClose }) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} maxWidth="xs" onClose={handleClose}>
        <DialogTitle>Preparing Your Download</DialogTitle>
        <DialogContent>
          <Box width="100%" display="flex" justifyContent="center">
            <CircularProgress color="secondary" />
          </Box>
          {isOpen && (
            <DownloadComponent
              qrList={qrList}
              filename={filename}
              onClose={onClose}
            />
          )}
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogDownload
