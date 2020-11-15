import React, { Suspense } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useMountedState } from 'react-use'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { updateCustomer, useCustomer } from '../../api'

export default () => {
  const { id } = useParams()

  return (
    <>
      <h2>
        Edit customer
      </h2>
      <Card>
        <Card.Body>
          <Card.Title>
            Customer
          </Card.Title>

          <Suspense fallback={<SkeletonForm rows={1}/>}>
            <CustomerEditForm id={id}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerEditForm = ({ id }) => {
  const isMounted = useMountedState()
  const history = useHistory()
  const { data: customer } = useCustomer(id)

  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })
  const handleSubmit = async data => {
    await updateCustomer(customer.id, customer.version, data)
    if (isMounted()) {
      history.push(`/customers/${customer.id}`)
    }
  }

  return (
    <FormikForm initialValues={customer}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>

      <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          <SaveButton/>
          <CancelLink/>
        </Col>
      </Form.Group>
    </FormikForm>
  )
}
