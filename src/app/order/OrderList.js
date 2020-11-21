import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { useOrders } from './order-api'

let searchValuesCache = { orderNumber: null, status: null }

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    url="/orders"
    title={
      <>
        Orders
        <CreateButton to="/orders/new" title="Create new order..."/>
      </>
    }
    useResource={useOrders}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} autoFocus isValid={false}/>
        <FieldGroup name="status" label="Status" sm={[2, 9]} isValid={false}>
          {({ field }) =>
            <Form.Control as="select" {...field}>
              <option/>
              <option value="created">Created</option>
              <option value="submitted">Submitted</option>
              <option value="delivered">Delivered</option>
            </Form.Control>
          }
        </FieldGroup>
      </>
    }
    tableHeader={
      <>
        <th>#</th>
        <th>Order number</th>
        <th>Status</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.orderNumber}</td>
        <td>{sentenceCase(item.status)}</td>
      </>
    }
  />
