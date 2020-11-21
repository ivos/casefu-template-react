import React from 'react'
import { Card } from 'react-bootstrap'
import { AutoSubmit, FormikForm } from '../form'

export default ({ searchValues, setSearchValues, setSearchValuesCache, resetPages, children }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                resetPages()
                setSearchValues(values)
                setSearchValuesCache && setSearchValuesCache(values)
              }}>

    <Card className="mb-3">
      <Card.Body>
        {children}
      </Card.Body>
    </Card>

    <AutoSubmit/>
  </FormikForm>
