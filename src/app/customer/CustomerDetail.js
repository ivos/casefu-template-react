import React from 'react'
import { DetailScreen, EditButton, NavigationButton, SavingButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { patchCustomer, useCustomer } from './customer-api'

const patch = (data, patch, wrapAction) => async () => {
  await wrapAction(() => patchCustomer(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Customer detail"
    entityTitle="Customer"
    rows={2}
    useResourceGet={useCustomer}
    buttons={
      (data, { isValidating, isChanging, wrapAction }) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || data.status === 'active'}
                        onClick={patch(data, { status: 'active' }, wrapAction)}>
            Active
          </SavingButton>
          <SavingButton variant="warning" className="mr-3"
                        disabled={isChanging || isValidating || data.status === 'disabled'}
                        onClick={patch(data, { status: 'disabled' }, wrapAction)}>
            Disabled
          </SavingButton>

          <NavigationButton label="Customers" className="mr-3"
                            to={`/orders?customerId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
      </>
    }
  </DetailScreen>
