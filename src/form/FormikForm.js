import React from 'react'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import FocusError from './FocusError'
import { isValidationError } from '../api'

const mapServerErrorCodesToLabels = (mapServerErrorCodeToLabel, serverErrors) => {
  return Object.fromEntries(
    serverErrors
      .map(({ path, errorCode }) => [path, mapServerErrorCodeToLabel(path, errorCode)])
  )
}

const wrapSubmit = (onSubmit, mapServerErrorCodeToLabel) => async (values, formikBag) => {
  formikBag.setStatus({})
  try {
    return await onSubmit(values, formikBag)
  } catch (error) {
    if (isValidationError(error)) {
      const { errors: serverErrors } = error.response.data
      const errors = mapServerErrorCodeToLabel ?
        mapServerErrorCodesToLabels(mapServerErrorCodeToLabel, serverErrors) : serverErrors
      formikBag.setStatus(errors)
    }
  }
}

export default ({ initialValues, onSubmit, mapServerErrorCodeToLabel, children, ...rest }) =>
  <Formik initialValues={initialValues}
          enableReinitialize={true}
          initialStatus={{}}
          onSubmit={wrapSubmit(onSubmit, mapServerErrorCodeToLabel)}
          {...rest}
  >
    {
      (props) => {
        const resolvedChildren = (typeof children === 'function') ? children(props) : children

        return (
          <Form noValidate onSubmit={props.handleSubmit}>
            {resolvedChildren}

            <FocusError/>
          </Form>
        )
      }
    }
  </Formik>
