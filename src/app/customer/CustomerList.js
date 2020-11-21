import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { useCustomers } from './customer-api'

let searchValuesCache = { name: null, status: null }

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    url="/customers"
    title={
      <>
        Customers
        <CreateButton to="/customers/new" title="Create new customer..."/>
      </>
    }
    useResource={useCustomers}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} autoFocus isValid={false}/>
        <FieldGroup name="status" label="Status" sm={[2, 9]} isValid={false}>
          {({ field }) =>
            <Form.Control as="select" {...field}>
              <option/>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </Form.Control>
          }
        </FieldGroup>
      </>
    }
    tableHeader={
      <>
        <th>#</th>
        <th>Name</th>
        <th>Status</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{sentenceCase(item.status)}</td>
      </>
    }
  />
