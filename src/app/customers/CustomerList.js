import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SkeletonTableRows } from '../../shared/SkeletonTableRows'
import { resourceCache, useAsyncResource } from 'use-async-resource'
import { listCustomers } from '../../api'

const CustomersTableRows = ({ customersReader }) => {
  const data = customersReader()
  return data.map(item => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  ))
}

export default () => {
  resourceCache(listCustomers).clear()
  const [customersReader] = useAsyncResource(listCustomers, [])

  return (
    <>
      <h2>
        Customers
        <Button as={Link} to="/customers/new"
                variant="outline-secondary" className="float-right"
                title="Create new customer...">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;Create
        </Button>
      </h2>
      <Table bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        <Suspense fallback={<SkeletonTableRows columns={2}/>}>
          <CustomersTableRows customersReader={customersReader}/>
        </Suspense>
        </tbody>
      </Table>
    </>
  )
}
