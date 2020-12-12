import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup, TextArea } from '../../shared'
import { CustomerSelect } from '../customer/CustomerSelects'
import { updateOrder, useOrderEdit } from './order-api'

export default () =>
  <EditScreen
    title="Edit order"
    entityTitle="Order"
    url="/orders"
    useResource={useOrderEdit}
    rows={3}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        customer: Yup.object()
          .required(),
        note: Yup.string()
      })
    }
    update={data => updateOrder(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CustomerSelect} name="customer" label="Customer" sm={[2, 9]} required/>
    <FieldGroup as={TextArea} name="note" label="Note" sm={[2, 9]} rows={5}/>

  </EditScreen>
