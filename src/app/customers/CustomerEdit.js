import React, { Suspense } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useMountedState } from 'react-use'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { getCustomer, updateCustomer } from '../../api'

export default () => {
  const { id } = useParams()

  const resource = {
    customer: getCustomer(id)
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

          <Suspense fallback={<SkeletonForm rows={1}/>}>
            <CustomerEditForm values={resource.customer}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerEditForm = ({ values }) => {
  const isMounted = useMountedState()
  const history = useHistory()

  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })
  const handleSubmit = async data => {
    await updateCustomer(values.read().id, values.read().version, data)
    if (isMounted()) {
      history.push(`/customers/${values.read().id}`)
    }
  }

  return (
    <FormikForm initialValues={values.read()}
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
