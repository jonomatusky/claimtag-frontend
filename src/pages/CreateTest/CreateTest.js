import React from 'react'
import ButtonDownloadClaimtags from 'components/ButtonDownloadClaimtags'

const CreateTest = () => {
  const qrList = [
    '620tac20d5862bb15aeec041',
    '620fac20d5u62bb15aeec042',
    '620fac20d5862bb15aedc042',
    '620fac20d5862bb15aeec442',
    '620fac20s5872bb15aeec042',
    '620fac20d5862bb151eec042',
    '620fac20a5862bb15aenc042',
    '520fac20d5862bb15aeec043',
    '620tac20d5862bb16aeec041',
    '620fac20d5u62bb16aeec042',
    '620fac20d5862bb16aedc042',
    '620fac20d5862bb16aeec442',
    '620fac20s5872bb16aeec042',
    '620fac20d5862bb161eec042',
    '620fac20a5862bb16aenc042',
    '520fac20d5862bb16aeec043',
  ]

  return (
    <>
      <ButtonDownloadClaimtags qrList={qrList} />
    </>
  )
}

export default CreateTest
