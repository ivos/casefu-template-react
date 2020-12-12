import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, SavingButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { patchOrder, useOrder } from './order-api'

const patch = (data, patch, action) => async () => {
  await action(() => patchOrder(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Order detail"
    entityTitle="Order"
    rows={4}
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
        <StaticGroup label="Customer" sm={[2, 10]}>
          <Link to={`/customers/${data.customer?.id}`}>
            {data.customer?.name}
          </Link>
        </StaticGroup>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
        <StaticGroup label="Note" sm={[2, 10]} value={data.note}/>
      </>
    }
  </DetailScreen>
