import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { createCustomer } from '../../api'

export default () => {
  const history = useHistory()
  const pageHash = window.location.hash

  const initialValues = { name: '' }
  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })
  const handleSubmit = async data => {
    await createCustomer(data)
    if (window.location.hash === pageHash) {
      history.push('/customers')
    }
  }

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
        </Card.Body>
      </Card>
    </>
  )
}
