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
  const [pages, setPages] = useState(0)
  const [lastPage, setLastPage] = useState(false)
  const history = useHistory()

  useEffect(() => {
    history.replace(`/customers?${toUrlParams(searchValues)}`)
  }, [history, searchValues])

  const resetPages = () => {
    setPages(0)
    setLastPage(false)
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
    <CustomersSearchForm dataLoader={customersLoader}
                         searchValues={searchValues}
                         setSearchValues={setSearchValues}
                         resetPages={resetPages}/>
    <Table bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <Suspense fallback={<SkeletonTableRows columns={2}/>}>
        <CustomersTableContent dataReader={customersReader}
                               setLastPage={setLastPage}/>
      </Suspense>
      {
        [...Array(pages)]
          .map((_, index) =>
            <CustomersTablePage searchValues={searchValues}
                                $page={index + 1}
                                setLastPage={setLastPage}
                                key={`page-${index}`}/>
          )
      }
      </tbody>
    </Table>

    <Button variant="outline-secondary"
            disabled={lastPage}
            onClick={() => setPages(pages + 1)}>
      Load next
    </Button>
  </>
}

const CustomersSearchForm = ({ dataLoader, searchValues, setSearchValues, resetPages }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                setSearchValues(values)
                searchValuesCache = values
                dataLoader(values)
                resetPages()
              }}>

    <Card className="mb-3">
      <Card.Body>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} autoFocus isValid={false}/>
      </Card.Body>
    </Card>

    <AutoSubmit/>
  </FormikForm>

const CustomersTablePage = ({ searchValues, $page, setLastPage }) => {
  const [pageReader] = useResource(listCustomers, { ...searchValues, $page })

  return <>
    <Suspense fallback={<SkeletonTableRows columns={2}/>}>
      <CustomersTableContent dataReader={pageReader}
                             setLastPage={setLastPage}/>
    </Suspense>
  </>
}

const CustomersTableContent = ({ dataReader, setLastPage }) => {
  const history = useHistory()

  useEffect(() => {
    if (dataReader().length === 0) {
      setLastPage(true)
    }
  })

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
