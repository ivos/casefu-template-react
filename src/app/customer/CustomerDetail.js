import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DetailScreen, SavingButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
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
          <SavingButton variant="warning" className="mr-3"
                        disabled={isChanging || isValidating || data.status === 'disabled'}
                        onClick={patch(data, { status: 'disabled' }, action)}>
            Disabled
          </SavingButton>

          <Button variant="outline-secondary" className="mr-3"
                  as={NavLink} to={`/orders?customerId=${data.id}`}>
            Customers&nbsp;
            <FontAwesomeIcon icon={'chevron-right'}/>
          </Button>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
      </>
    }
  </DetailScreen>
