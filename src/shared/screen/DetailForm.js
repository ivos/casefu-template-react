import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CancelLink, EditButton, Revalidating } from '../form'

export default ({ id, useResource, buttons, children }) => {
  const { data, isValidating, revalidate } = useResource(id)
  const [isChanging, setIsChanging] = useState(false)

  const action = async fn => {
    setIsChanging(true)
    await fn()
    revalidate()
    setIsChanging(false)
  }

  return <>
    <Form>

      <Revalidating isValidating={isValidating}>
        {children(data)}
      </Revalidating>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          <EditButton className="mr-3" autoFocus/>

          {buttons(data, { isValidating, isChanging, action })}

          <CancelLink/>
        </Col>
      </Form.Group>

    </Form>
  </>
}
