import React from 'react'
import { GuideConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import IfoCardV2Data from './components/IfoCardV2Data'
import IfoCardV1Data from './components/IfoCardV1Data'
import IfoLayout from './components/IfoLayout'

const inactiveIfo: Ifo[] = GuideConfig.filter((ifo) => !ifo.isActive)

const PastIfo = () => {
  return (
    <IfoLayout>
      {inactiveIfo.map((ifo) =>
        ifo.isV1 ? (
          <IfoCardV1Data key={ifo.id} ifo={ifo} />
        ) : (
          <IfoCardV2Data key={ifo.id} ifo={ifo} isInitiallyVisible={false} />
        ),
      )}
    </IfoLayout>
  )
}

export default PastIfo
