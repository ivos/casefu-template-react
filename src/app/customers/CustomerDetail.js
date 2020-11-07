import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CancelLink, EditButton, SavingButton, StaticGroup } from '../../form'
import { SkeletonForm } from '../../shared/Skeletons'
import { getCustomer, patchCustomer, useResource } from '../../api'

export default () => {
  const { id } = useParams()
  const [customerReader, customerLoader] = useResource(getCustomer, id)
  const refresh = () => customerLoader(id)

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
            <CustomerDetailForm valuesReader={customerReader}
                                refresh={refresh}/>
          </Suspense>
        </Card.Body>
      </Card>
    </>
  )
}

const CustomerDetailForm = ({ valuesReader, refresh }) => {
  const patch = values => async () => {
    await patchCustomer(valuesReader().id, valuesReader().version, values)
    refresh()
  }

  return <>
    <Form>

      <StaticGroup label="Name" sm={[2, 10]} value={valuesReader().name}/>
      <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(valuesReader().status)}/>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          <EditButton className="mr-2" autoFocus/>

          <SavingButton variant="warning" className="mr-1"
                        disabled={valuesReader().status === 'disabled'}
                        onClick={patch({ status: 'disabled' })}>
            Disabled
          </SavingButton>
          <SavingButton variant="warning"
                        disabled={valuesReader().status === 'active'}
                        onClick={patch({ status: 'active' })}>
            Active
          </SavingButton>

          <CancelLink/>
        </Col>
      </Form.Group>
    </Form>
  </>
}
