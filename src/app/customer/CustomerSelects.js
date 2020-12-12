import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCustomers, useCustomer } from './customer-api'
import { useRestored } from '../../shared/utils'

export const CustomerSelect = ({ ...rest }) =>
  <AsyncSelect searchFn={query => listCustomers({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...rest}/>

export const CustomerSearchSelect = ({ ...rest }) =>
  <CustomerSelect restoredValue={useRestored('customerId', useCustomer)}
                  {...rest}/>
