import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup, TextArea } from '../../shared'
import { CustomerSelect } from '../customer/CustomerSelects'
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
    <FieldGroup as={TextArea} name="note" label="Note" sm={[2, 9]} rows={5}/>

  </CreateScreen>
