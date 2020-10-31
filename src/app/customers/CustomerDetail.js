import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { CancelLink, EditButton, StaticGroup } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { getCustomer, useResource } from '../../api'

export default () => {
  const { id } = useParams()
  const [customerReader] = useResource(getCustomer, id)

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
            <CustomerDetailForm valuesReader={customerReader}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerDetailForm = ({ valuesReader }) =>
  <Form>

    <StaticGroup label="Name" sm={[2, 10]} value={valuesReader().name}/>

    <Form.Group as={Row}>
      <Col sm={{ offset: 2, span: 9 }}>
        <EditButton/>
        <CancelLink/>
      </Col>
    </Form.Group>
  </Form>
