import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createCustomer } from './customer-api'

export default () =>
  <CreateScreen
    title="Create customer"
    entityTitle="Customer"
    url="/customers"
    rows={1}
    initialValues={{
      name: ''
    }}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required()
      })
    }
    create={createCustomer}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

  </CreateScreen>
