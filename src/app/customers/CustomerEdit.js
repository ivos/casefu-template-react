import React, { Suspense } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useMountedState } from 'react-use'
import { CancelLink, FieldGroup, FormikForm, SaveButton } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { getCustomer, updateCustomer, useResource } from '../../api'

export default () => {
  const { id } = useParams()
  const [customerReader] = useResource(getCustomer, id)

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
            <CustomerEditForm valuesReader={customerReader}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerEditForm = ({ valuesReader }) => {
  const isMounted = useMountedState()
  const history = useHistory()

  const validationSchema =
    Yup.object({
      name: Yup.string()
        .required()
    })
  const handleSubmit = async data => {
    await updateCustomer(valuesReader().id, valuesReader().version, data)
    if (isMounted()) {
      history.push(`/customers/${valuesReader().id}`)
    }
  }

  return (
    <FormikForm initialValues={valuesReader()}
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
