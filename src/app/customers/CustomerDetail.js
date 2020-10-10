import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { CancelLink, StaticGroup } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { resourceCache, useAsyncResource } from 'use-async-resource'
import { getCustomer } from '../../api'

export default () => {
  const { id } = useParams()
  resourceCache(getCustomer).clear()
  const [customerReader] = useAsyncResource(getCustomer, id)

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
              <CustomerDetailForm values={customerReader}/>
            </Suspense>

            <Form.Group as={Row}>
              <Col sm={{ offset: 2 }}>
                <CancelLink to="/customers"/>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerDetailForm = ({ values }) =>
  <>
    <StaticGroup label="Name" sm={[2, 10]} value={values().name}/>
  </>
