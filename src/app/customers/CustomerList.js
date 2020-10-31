import React, { Suspense, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMount } from 'react-use'
import { AutoSubmit, FieldGroup, FormikForm } from '../../form'
import { SkeletonTableRows } from '../../shared/Skeletons'
import { listCustomers, useResource } from '../../api'
import { onEnter, toUrlParams, useUrlParams } from '../../shared/utils'

let searchValuesCache = { name: null }

export default () => {
  const [searchValues, setSearchValues] = useState(searchValuesCache)
  const urlParams = useUrlParams(searchValues)
  useMount(() => {
    setSearchValues(urlParams)
  })
  const [customersReader, customersLoader] = useResource(listCustomers, searchValues)
  const history = useHistory()

  useEffect(() => {
    history.replace(`/customers?${toUrlParams(searchValues)}`)
  }, [history, searchValues])

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
    <CustomersSearchForm dataLoader={customersLoader}
                         searchValues={searchValues}
                         setSearchValues={setSearchValues}/>
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

const CustomersSearchForm = ({ dataLoader, searchValues, setSearchValues }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                setSearchValues(values)
                searchValuesCache = values
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
