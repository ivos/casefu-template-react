import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { CancelLink, EditButton, StaticGroup } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { getCustomer } from '../../api'

export default () => {
  const { id } = useParams()
  const resource = {
    customer: getCustomer(id)
  }

  return (
    <>
      <h2>Customer detail</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            Customer
          </Card.Title>

          <Form>
            <Suspense fallback={<SkeletonForm/>}>
              <CustomerDetailContent values={resource.customer}/>
            </Suspense>

            <Form.Group as={Row}>
              <Col sm={{ offset: 2 }}>
                <EditButton/>
                <CancelLink/>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerDetailContent = ({ values }) =>
  <>
    <StaticGroup label="Name" sm={[2, 10]} value={values.read().name}/>
  </>
