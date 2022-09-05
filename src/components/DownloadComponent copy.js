import React, { useEffect, useRef, useCallback } from 'react'
import TemplateImage from 'images/claimtag-template.png'
// import QRCode from 'qrcode.react'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

const { REACT_APP_SCAN_URL } = process.env

const DownloadComponent = ({ filename, qrList, onClose }) => {
  // const [percentComplete, setPercentComplete] = useState(0)
  const claimtagsPerPage = 8

  // const [pdf, setPdf] = useState(null)

  const ref = useRef()

  // console.log(percentComplete)

  const generatePDF = useCallback(async () => {
    console.log('generating pdf')
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

    // console.log('generating pdf')
    const pdf = new jsPDF({ unit: 'in', format: 'letter', compress: true })
    // console.log('generated pdf')

    // pdf.addImage(TemplateImage, 'JPEG', 0, 0, 8.5, 11, '', 'FAST')

    // console.log('added image')

    // setPdf(pdf)

    // setPercentComplete(Math.round(100 / (pageNumber + 1)))

    // let imgData = refs.current[0]

    // let i = index / claimtagsPerPage

    // if (index < qrList.length) {
    // console.log('getting image')

    // imgData = refs.current[i]
    // console.log('adding page ' + i)

    while (index < qrList.length) {
      if (index % claimtagsPerPage === 0) {
        // pdf.addImage(TemplateImage, 'JPEG', 0, 0, 8.5, 11, '', 'FAST')
        // setPercentComplete(
        // index / claimtagsPerPage
        // Math.round(
        //   (100 / (qrList.length / claimtagsPerPage)) *
        //     (index / claimtagsPerPage)
        // )
        // )
      }

      try {
        // console.log('drawing qr')
        // const qrCanvas = ref.current

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
        // }

        index = index + 1
      } catch (err) {
        onClose()
        console.log(err)
      }

      // console.log(index)
    }

    pdf.save(`${filename || 'claimtags'}.pdf`)
    onClose()
  }, [filename, qrList, onClose])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      console.log('generating the pdf')
      await generatePDF()
    }, 1000)
    // clearTimeout(timeout)
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
