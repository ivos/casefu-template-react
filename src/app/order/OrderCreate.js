import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CustomerSelect } from '../customer/CustomerSelects'
import { CreateScreen, FieldGroup } from '../../shared'
import { createOrder } from './order-api'

export default () =>
  <CreateScreen
    title="Create order"
    entityTitle="Order"
    url="/orders"
    rows={2}
    initialValues={{ orderNumber: '', customer: '', note: '' }}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        customer: Yup.object()
          .required(),
        note: Yup.string()
      })
    }
    create={createOrder}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CustomerSelect} name="customer" label="Customer" sm={[2, 9]} required/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </CreateScreen>
