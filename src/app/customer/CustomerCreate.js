import React, { Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useMountedState } from 'react-use'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { createCustomer } from './customer-api'

export default () => {
  return (
    <>
      <h2>
        Create customer
      </h2>
      <Card>
        <Card.Body>
          <Card.Title>
            Customer
          </Card.Title>

          <Suspense fallback={<SkeletonForm rows={1}/>}>
            <CustomerCreateForm/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerCreateForm = () => {
  const isMounted = useMountedState()
  const history = useHistory()

  const initialValues = { name: '' }
  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })
  const handleSubmit = async data => {
    const { id } = await createCustomer(data)
    if (isMounted()) {
      history.push(`/customers/${id}`)
    }
  }

  return (
    <FormikForm initialValues={initialValues}
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
