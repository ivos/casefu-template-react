import React, { useEffect } from 'react'
import { Field, useFormikContext } from 'formik'
import { usePrevious } from 'react-use'

export default ({ name, ...rest }) => {
  const { touched, values, errors, status = {}, setStatus } = useFormikContext()
  const isTouched = touched[name]
  const error = errors[name]
  const serverError = status[name]
  const value = values[name]
  const prevValue = usePrevious(value)

  useEffect(() => {
    if (serverError && value !== prevValue) {
      const copy = { ...status }
      delete copy[name]
      setStatus(copy)
    }
  })

  const isInvalid = isTouched && (error || serverError)
  const isValid = isTouched && !error && !serverError

  return <>
    <Field name={name}
           isInvalid={isInvalid}
           isValid={isValid}
           {...rest}/>
  </>
}
