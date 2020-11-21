import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { FieldGroup } from '../../form'
import { CreateScreen } from '../../screen'
import { createOrder } from './order-api'

export default () =>
  <CreateScreen
    title="Create order"
    entityTitle="Order"
    url="/orders"
    initialValues={{ orderNumber: '', note: '' }}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        note: Yup.string()
      })
    }
    create={createOrder}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </CreateScreen>
