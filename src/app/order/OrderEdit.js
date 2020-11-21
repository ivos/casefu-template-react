import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { FieldGroup } from '../../form'
import { EditScreen } from '../../screen'
import { updateOrder, useOrderEdit } from './order-api'

export default () =>
  <EditScreen
    title="Edit order"
    entityTitle="Order"
    url="/orders"
    useResource={useOrderEdit}
    rows={2}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        note: Yup.string()
      })
    }
    update={data => updateOrder(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </EditScreen>
