import React, { useEffect, useRef, useCallback } from 'react'
import TemplateImage from 'images/claimtag-template-s.jpg'
// import QRCode from 'qrcode.react'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

const { REACT_APP_SCAN_URL } = process.env

const DownloadComponent = ({ filename, qrList, onClose }) => {
  // const [percentComplete, setPercentComplete] = useState(0)
  const claimtagsPerPage = 8

  // const [pdf, setPdf] = useState(null)

  const ref = useRef()
  // const templateRef = useRef()

  // templateRef.current = document.createElement('canvas')
  // templateRef.current.width = 8.5
  // templateRef.current.height = 11

  // console.log(percentComplete)

  const generatePDF = useCallback(async () => {
    const qrWidthInches = 1.05
    const qrBoxWidthInches = 1.2
    // const pixelsPerInch = 600
    const qrWidth = qrWidthInches

    const xOffset =
      3.4684 - qrBoxWidthInches / 2 + (qrBoxWidthInches - qrWidthInches) / 2
    const yOffset =
      2.1737 - qrBoxWidthInches / 2 + (qrBoxWidthInches - qrWidthInches) / 2
    const xSpacing = 6.9719 - 3.4684
    const ySpacing = 4.3912 - 2.1737

    const qrArray = []

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 3; j++) {
        qrArray.push([xOffset + i * xSpacing, yOffset + j * ySpacing])
      }
    }

    ref.current = document.createElement('canvas')
    ref.current.width = qrWidth
    ref.current.height = qrWidth

    let index = 0

    const pdf = new jsPDF({ unit: 'in', format: 'letter', compress: true })
    try {
      while (index < qrList.length) {
        if (index % claimtagsPerPage === 0) {
          pdf.addImage(TemplateImage, 'JPEG', 0, 0, 8.5, 11, '', 'FAST')
        }

        await QRCode.toCanvas(
          ref.current,
          REACT_APP_SCAN_URL + '/' + qrList[index],
          { margin: 1 }
        )

        pdf.addImage(
          ref.current,
          'JPEG',
          qrArray[index % claimtagsPerPage][0],
          qrArray[index % claimtagsPerPage][1],
          qrWidth,
          qrWidth,
          '',
          'FAST'
        )

        if (
          (index + 1) % claimtagsPerPage === 0 &&
          index !== qrList.length - 1
        ) {
          pdf.addPage('letter')
        }

        index = index + 1
      }
      pdf.save(`${filename || 'claimtags'}.pdf`)
    } catch (err) {
      console.log(err)
    }

    onClose()
  }, [filename, qrList, onClose])

  useEffect(() => {
    setTimeout(() => {
      generatePDF()
    }, 500)
  }, [generatePDF])

  // const [index, setIndex] = useState(0)

  return (
    <>
      {/* <Typography>Progress... {percentComplete}%</Typography> */}

      {/* <QRCode
        size={qrWidth * pixelsPerInch}
        id={`qr-code`}
        // key={qr}
        value={REACT_APP_SCAN_URL + '/' + qrList[index]}
        hidden
      /> */}

      {/* {pages} */}
    </>
  )
}

export default DownloadComponent
