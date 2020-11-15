import React, { Suspense, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMount } from 'react-use'
import { sentenceCase } from 'change-case'
import { AutoSubmit, FieldGroup, FormikForm, Revalidating } from '../../form'
import { SkeletonTableRows } from '../../shared/Skeletons'
import { onEnter, toUrlParams, usePaging, useUrlParams } from '../../shared/utils'
import { useOrders } from './order-api'

let searchValuesCache = { orderNumber: null, status: null }

export default () => {
  const [searchValues, setSearchValues] = useState(searchValuesCache)
  const urlParams = useUrlParams(searchValues)
  useMount(() => {
    setSearchValues(urlParams)
  })
  const { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages } = usePaging()
  const history = useHistory()

  useEffect(() => {
    history.replace(`/orders?${toUrlParams(searchValues)}`)
  }, [history, searchValues])

  return <>
    <h2>
      Orders

      <Button as={Link} to="/orders/new"
              variant="outline-secondary" className="float-right"
              title="Create new order...">
        <FontAwesomeIcon icon="plus"/>
        &nbsp;Create
      </Button>
    </h2>
    <OrdersSearchForm searchValues={searchValues}
                      setSearchValues={setSearchValues}
                      resetPages={resetPages}/>
    <Table bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Order number</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {
        [...Array(pagesCount)]
          .map((_, index) =>
            <Suspense fallback={<SkeletonTableRows columns={3}/>}
                      key={`page-${index}`}>
              <OrdersTablePage searchValues={searchValues}
                               $page={index}
                               setLastPage={setLastPage}/>
            </Suspense>
          )
      }
      </tbody>
    </Table>

    <Button variant="outline-secondary"
            disabled={isLastPage}
            onClick={loadNextPage}>
      Load next
    </Button>
  </>
}

const OrdersSearchForm = ({ searchValues, setSearchValues, resetPages }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                resetPages()
                setSearchValues(values)
                searchValuesCache = values
              }}>

    <Card className="mb-3">
      <Card.Body>
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
      </Card.Body>
    </Card>

    <AutoSubmit/>
  </FormikForm>

const OrdersTablePage = ({ searchValues, $page, setLastPage }) => {
  const { data: orders, isValidating } = useOrders(searchValues, $page)
  const history = useHistory()

  useEffect(() => {
    if (orders.length === 0) {
      setLastPage()
    }
  })

  const gotoDetail = id => () => {
    history.push(`/orders/${id}`)
  }

  return orders.map(item => (
    <Revalidating as="tr"
                  isValidating={isValidating}
                  key={item.id}
                  tabIndex="0" onClick={gotoDetail(item.id)} onKeyUp={onEnter(gotoDetail(item.id))}>
      <td>{item.id}</td>
      <td>{item.orderNumber}</td>
      <td>{sentenceCase(item.status)}</td>
    </Revalidating>
  ))
}
