import React from 'react'
import { sentenceCase } from 'change-case'
import { DetailScreen, SavingButton, StaticGroup } from '../../shared'
import { patchOrder, useOrder } from './order-api'

const patch = (data, patch, action) => async () => {
  await action(() => patchOrder(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Order detail"
    entityTitle="Order"
    rows={3}
    useResource={useOrder}
    buttons={
      (data, { isValidating, isChanging, action }) =>
        <>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'created'}
                        onClick={patch(data, { status: 'created' }, action)}>
            Created
          </SavingButton>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'submitted'}
                        onClick={patch(data, { status: 'submitted' }, action)}>
            Submitted
          </SavingButton>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'delivered'}
                        onClick={patch(data, { status: 'delivered' }, action)}>
            Delivered
          </SavingButton>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Order number" sm={[2, 10]} value={data.orderNumber}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
        <StaticGroup label="Note" sm={[2, 10]} value={data.note}/>
      </>
    }
  </DetailScreen>
