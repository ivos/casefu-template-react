import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { CustomerSearchSelect } from '../customer/CustomerSelects'
import { orderFromApi, orderToApi, useOrders } from './order-api'
import { formatDate, formatDateTime } from '../../i18n'

let searchValuesCache = { orderNumber: '', customer: '', status: '' }

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
    toApi={orderToApi}
    fromApi={orderFromApi}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} autoFocus isValid={false}/>
        <FieldGroup as={CustomerSearchSelect} name="customer" label="Customer" sm={[2, 9]} isValid={false}/>
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
    columns={6}
    tableHeader={
      <>
        <th>#</th>
        <th>Order number</th>
        <th>Customer</th>
        <th>Status</th>
        <th>Received</th>
        <th>Delivery date</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.orderNumber}</td>
        <td>{item.customer?.name}</td>
        <td>{sentenceCase(item.status)}</td>
        <td>{formatDateTime(item.received)}</td>
        <td>{formatDate(item.deliveryDate)}</td>
      </>
    }
  />
