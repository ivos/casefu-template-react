import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCustomers, useCustomer } from './customer-api'
import { useRestored } from '../../shared/utils'

export const CustomerSelect = props =>
  <AsyncSelect searchFn={query => listCustomers({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const CustomerSearchSelect = props =>
  <CustomerSelect restoredValue={useRestored('customerId', useCustomer)}
                  {...props}/>
