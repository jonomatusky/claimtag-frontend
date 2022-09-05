import React from 'react'
import QRCode from 'qrcode.react'
import { Box } from '@mui/system'

const qrs = [
  'www.pqr.so/tIUNo4',
  'pq.ws/123456789012',
  'pq.ws/1234567890123',
  'ta9.cc/1234567890123456789012',
  'ta9.cc/123456789012',
  'ta9.cc/12345678901',
  'ta9.cc/1234567890',
  'pq.ws/12345678901',
  'ta9.cc/123456789',
  'ta9.cc/12345678',
  'ta9.cc/a_34567890',
  'http://ta9.cc/t/123',
  'http://ta9.cc/t/12345',
  'HTTP://TA9.CC/T/123456789',
  'ta9.cc/t/12345',
  'http://ta9.cc/t/123456',
  'ta9.cc/t/1-a1',
  'ta9.cc/t/1as-78-91',
  'http://ta9.cc/t/123456789',
  'www.ta9.cc/t/12345678',
  'https://ta9.cc/t/12345',
  'ta9.cc/t/1as-78-91',
  'https://www.ta9.cc/t/1234567',
  'HTTP://TA9.CC/T/12-89',
  'www.ta9.cc/t/123456',
  'http://ta9.cc/t/1as=78-91',
  'www.ta9.cc/t/12345',
  'ta9.cc/t/1234567891',
  'http://ta9.cc/t/123',
]

const QRTest = () => {
  return qrs.map((qr, i) => (
    <Box p={1} key={i}>
      {i + 1}
      <QRCode size={120} value={qr} />
    </Box>
  ))
}

export default QRTest
