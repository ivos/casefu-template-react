import React, { Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AutoSubmit, FieldGroup, FormikForm } from '../../form'
import { SkeletonTableRows } from '../../shared/Skeletons'
import { listCustomers, useResource } from '../../api'
import { onEnter } from '../../shared/utils'

let searchValues = { name: null }

export default () => {
  const [customersReader, customersLoader] = useResource(listCustomers, searchValues)

  return <>
    <h2>
      Customers

      <Button as={Link} to="/customers/new"
              variant="outline-secondary" className="float-right"
              title="Create new customer...">
        <FontAwesomeIcon icon="plus"/>
        &nbsp;Create
      </Button>
    </h2>
    <CustomersSearchForm dataLoader={customersLoader}/>
    <Table bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <Suspense fallback={<SkeletonTableRows columns={2}/>}>
        <CustomersTableContent dataReader={customersReader}/>
      </Suspense>
      </tbody>
    </Table>
  </>
}

const CustomersSearchForm = ({ dataLoader }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                searchValues = values
                dataLoader(values)
              }}>

    <Card className="mb-3">
      <Card.Body>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} autoFocus isValid={false}/>
      </Card.Body>
    </Card>

    <AutoSubmit/>
  </FormikForm>

const CustomersTableContent = ({ dataReader }) => {
  const history = useHistory()

  const gotoDetail = id => () => {
    history.push(`/customers/${id}`)
  }

  return dataReader().map(item => (
    <tr key={item.id}
        tabIndex="0" onClick={gotoDetail(item.id)} onKeyUp={onEnter(gotoDetail(item.id))}>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  ))
}
