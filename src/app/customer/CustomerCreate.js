import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { FieldGroup } from '../../form'
import { CreateScreen } from '../../screen'
import { createCustomer } from './customer-api'

export default () =>
  <CreateScreen
    title="Create customer"
    entityTitle="Customer"
    url="/customers"
    initialValues={{ name: '' }}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required()
      })
    }
    create={createCustomer}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

  </CreateScreen>
