import React, { useEffect, useRef, useState } from 'react'
import TemplateImage from 'images/claimtag-template.png'
import QRCode from 'qrcode.react'
import { Typography } from '@mui/material'
import { jsPDF } from 'jspdf'
import { Download } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const { REACT_APP_SCAN_URL } = process.env

const ButtonDownloadClaimtags = ({ filename, qrList }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const claimtagsPerPage = 8
  const pageNumber = Math.ceil(qrList.length / claimtagsPerPage)
  const pages = []
  const refs = useRef()
  refs.current = []

  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

  for (var i = 0; i < pageNumber; i++) {
    console.log('adding page')
    pages.push(
      <canvas
        key={'page-' + i}
        ref={addToRefs}
        width={5100}
        height={6600}
        hidden
      />
    )
  }

  const qrWidthInches = 1.05
  const qrBoxWidthInches = 1.2
  const pixelsPerInch = 600
  const qrWidth = qrWidthInches * pixelsPerInch

  useEffect(() => {
    const xOffset =
      (3.4684 - qrBoxWidthInches / 2 + (qrBoxWidthInches - qrWidthInches) / 2) *
      pixelsPerInch
    const yOffset =
      (2.1737 - qrBoxWidthInches / 2 + (qrBoxWidthInches - qrWidthInches) / 2) *
      pixelsPerInch
    const xSpacing = (6.9719 - 3.4684) * pixelsPerInch
    const ySpacing = (4.3912 - 2.1737) * pixelsPerInch

    const qrArray = []

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 3; j++) {
        qrArray.push([xOffset + i * xSpacing, yOffset + j * ySpacing])
      }
    }

    for (let i = 0; i < pageNumber; i++) {
      console.log('drawing page')
      const context = refs.current[i].getContext('2d')
      const image = new Image()
      image.src = TemplateImage

      image.onload = () => {
        context.drawImage(image, 0, 0, 5100, 6600)
        for (let j = 0; j < qrArray.length; j++) {
          if (claimtagsPerPage * i + j < qrList.length) {
            console.log('drawing qr')
            const qrCanvas = document.getElementById(
              `qr${claimtagsPerPage * i + j}`
            )
            context.drawImage(
              qrCanvas,
              qrArray[j][0],
              qrArray[j][1],
              qrWidth,
              qrWidth
            )
          }
        }
      }
    }
  }, [qrList, qrWidth, refs, pageNumber, pages])

  const handleClick = () => {
    if (!isDownloading) {
      setIsDownloading(true)
    }
  }

  useEffect(() => {
    if (isDownloading) {
      const pdf = new jsPDF({ unit: 'in', format: 'letter' })

      let timer = setTimeout(async () => {
        let imgData = refs.current[0].toDataURL('image/jpeg', 1.0)
        await pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11)

        for (let i = 1; i < pageNumber; i++) {
          pdf.addPage('letter')
          imgData = refs.current[i].toDataURL('image/jpeg', 1.0)
          pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11)
        }

        await pdf.save(`${filename || 'claimtags'}.pdf`)

        setIsDownloading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isDownloading, filename, pageNumber, refs])

  return (
    <>
      {qrList.map((qr, i) => {
        return (
          <QRCode
            size={qrWidth}
            id={`qr${i}`}
            key={qr}
            value={REACT_APP_SCAN_URL + '/' + qr}
            hidden
          />
        )
      })}
      <LoadingButton
        onClick={handleClick}
        variant="contained"
        size="large"
        disableElevation
        color="secondary"
        fullWidth
        endIcon={<Download />}
        loading={isDownloading}
        disabled={qrList.length === 0}
      >
        <Typography textTransform={'none'}>
          <b>Download</b>
        </Typography>
      </LoadingButton>
      {pages}
    </>
  )
}

export default ButtonDownloadClaimtags
