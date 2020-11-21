import React from 'react'
import { sentenceCase } from 'change-case'
import { DetailScreen, SavingButton, StaticGroup } from '../../shared'
import { patchCustomer, useCustomer } from './customer-api'

const patch = (data, patch, action) => async () => {
  await action(() => patchCustomer(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Customer detail"
    entityTitle="Customer"
    rows={2}
    useResource={useCustomer}
    buttons={
      (data, { isValidating, isChanging, action }) =>
        <>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'active'}
                        onClick={patch(data, { status: 'active' }, action)}>
            Active
          </SavingButton>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'disabled'}
                        onClick={patch(data, { status: 'disabled' }, action)}>
            Disabled
          </SavingButton>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
      </>
    }
  </DetailScreen>
