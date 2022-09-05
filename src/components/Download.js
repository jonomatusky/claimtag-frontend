import React, { useEffect, useRef } from 'react'
import TemplateImage from 'images/claimtag-template.png'
import QRCode from 'qrcode.react'
import { jsPDF } from 'jspdf'

const { REACT_APP_SCAN_URL } = process.env

const Download = ({ filename, qrList, isDownloading, setIsDownloading }) => {
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
    if (isDownloading) {
      const xOffset =
        (3.4684 -
          qrBoxWidthInches / 2 +
          (qrBoxWidthInches - qrWidthInches) / 2) *
        pixelsPerInch
      const yOffset =
        (2.1737 -
          qrBoxWidthInches / 2 +
          (qrBoxWidthInches - qrWidthInches) / 2) *
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

      console.log('generated images')

      const pdf = new jsPDF({ unit: 'in', format: 'letter' })

      console.log('generated pdf')

      let timer = setTimeout(async () => {
        let imgData = refs.current[0].toDataURL('image/jpeg', 1.0)
        pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11, '', 'NONE')

        for (let i = 1; i < pageNumber; i++) {
          pdf.addPage('letter')
          imgData = refs.current[i].toDataURL('image/jpeg', 1.0)
          console.log('adding page ' + i)
          pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11, '', 'NONE')
          console.log('added page ' + i)
        }

        console.log('saving pdf')

        pdf.save(`${filename || 'claimtags'}.pdf`)

        console.log('saved pdf')

        setIsDownloading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [
    isDownloading,
    setIsDownloading,
    filename,
    pageNumber,
    refs,
    qrList,
    qrWidth,
  ])

  return (
    <>
      {isDownloading &&
        qrList.map((qr, i) => {
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
      {isDownloading && pages}
    </>
  )
}

export default Download
