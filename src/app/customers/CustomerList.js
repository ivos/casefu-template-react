import React, { Suspense, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMount } from 'react-use'
import { sentenceCase } from 'change-case'
import { AutoSubmit, FieldGroup, FormikForm, Revalidating } from '../../form'
import { SkeletonTableRows } from '../../shared/Skeletons'
import { useCustomers } from '../../api'
import { onEnter, toUrlParams, useUrlParams } from '../../shared/utils'

let searchValuesCache = { name: null, status: null }

export default () => {
  const [searchValues, setSearchValues] = useState(searchValuesCache)
  const urlParams = useUrlParams(searchValues)
  useMount(() => {
    setSearchValues(urlParams)
  })
  const [pagesCount, setPagesCount] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const history = useHistory()

  useEffect(() => {
    history.replace(`/customers?${toUrlParams(searchValues)}`)
  }, [history, searchValues])

  const resetPages = () => {
    setPagesCount(1)
    setIsLastPage(false)
  }

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
    <CustomersSearchForm searchValues={searchValues}
                         setSearchValues={setSearchValues}
                         resetPages={resetPages}/>
    <Table bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {
        [...Array(pagesCount)]
          .map((_, index) =>
            <Suspense fallback={<SkeletonTableRows columns={3}/>}
                      key={`page-${index}`}>
              <CustomersTablePage searchValues={searchValues}
                                  $page={index}
                                  setIsLastPage={setIsLastPage}/>
            </Suspense>
          )
      }
      </tbody>
    </Table>

    <Button variant="outline-secondary"
            disabled={isLastPage}
            onClick={() => setPagesCount(pagesCount + 1)}>
      Load next
    </Button>
  </>
}

const CustomersSearchForm = ({ searchValues, setSearchValues, resetPages }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                resetPages()
                setSearchValues(values)
                searchValuesCache = values
              }}>

    <Card className="mb-3">
      <Card.Body>
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
      </Card.Body>
    </Card>

    <AutoSubmit/>
  </FormikForm>

const CustomersTablePage = ({ searchValues, $page, setIsLastPage }) => {
  const { data: customers, isValidating } = useCustomers(searchValues, $page)
  const history = useHistory()

  useEffect(() => {
    if (customers.length === 0) {
      setIsLastPage(true)
    }
  })

  const gotoDetail = id => () => {
    history.push(`/customers/${id}`)
  }

  return customers.map(item => (
    <Revalidating as="tr"
                  isValidating={isValidating}
                  key={item.id}
                  tabIndex="0" onClick={gotoDetail(item.id)} onKeyUp={onEnter(gotoDetail(item.id))}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{sentenceCase(item.status)}</td>
    </Revalidating>
  ))
}
