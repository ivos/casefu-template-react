import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { FieldGroup } from '../../form'
import { EditScreen } from '../../screen'
import { updateCustomer, useCustomerEdit } from './customer-api'

export default () =>
  <EditScreen
    title="Edit customer"
    entityTitle="Customer"
    url="/customers"
    useResource={useCustomerEdit}
    rows={1}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required()
      })
    }
    update={data => updateCustomer(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

  </EditScreen>
