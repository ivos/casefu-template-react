import React, { Suspense } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { getCustomer, updateCustomer } from '../../api'
import { SkeletonForm } from '../../shared/Skeletons'

export default () => {
  const { id } = useParams()
  const resource = {
    customer: getCustomer(id)
  }
  const history = useHistory()
  const pageHash = window.location.hash

  const handleSubmit = async data => {
    await updateCustomer(id, resource.customer.read().version, data)
    if (window.location.hash === pageHash) {
      history.push(`/customers/${id}`)
    }
  }

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

          <Suspense fallback={<SkeletonForm/>}>
            <CustomerEditForm values={resource.customer}
                              handleSubmit={handleSubmit}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerEditForm = ({ values, handleSubmit }) => {
  const initialValues = values.read()
  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })

  return (
    <FormikForm initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
      <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2 }}>
          <SaveButton/>
          <CancelLink/>
        </Col>
      </Form.Group>
    </FormikForm>
  )
}
