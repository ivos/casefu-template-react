import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CancelLink, EditButton, Revalidating, SavingButton, StaticGroup } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { patchCustomer, useCustomer } from './customer-api'

export default () => {
  const { id } = useParams()

  return (
    <>
      <h2>
        Customer detail
      </h2>
      <Card>
        <Card.Body>
          <Card.Title>
            Customer
          </Card.Title>

          <Suspense fallback={<SkeletonForm rows={1}/>}>
            <CustomerDetailForm id={id}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerDetailForm = ({ id }) => {
  const { data: customer, revalidate, isValidating } = useCustomer(id)

  const patch = values => async () => {
    await patchCustomer(customer.id, customer.version, values)
    revalidate()
  }

  return <>
    <Form>

      <Revalidating isValidating={isValidating}>
        <StaticGroup label="Name" sm={[2, 10]} value={customer.name}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(customer.status)}/>
      </Revalidating>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          <EditButton className="mr-2" autoFocus/>

          <SavingButton variant="warning" className="mr-1"
                        disabled={customer.status === 'disabled'}
                        onClick={patch({ status: 'disabled' })}>
            Disabled
          </SavingButton>
          <SavingButton variant="warning"
                        disabled={customer.status === 'active'}
                        onClick={patch({ status: 'active' })}>
            Active
          </SavingButton>

          <CancelLink/>
        </Col>
      </Form.Group>
    </Form>
  </>
}
