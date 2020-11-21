import React, { useEffect } from 'react'
import { Field, useFormikContext } from 'formik'
import { usePrevious } from 'react-use'

export default ({ name, ...rest }) => {
  const { dirty, touched, values, errors, status = {}, setStatus } = useFormikContext()
  const touch = touched[name]
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

  return (
    <Field name={name}
           isInvalid={touch && (error || serverError)}
           isValid={dirty && !error && !serverError}
           {...rest}/>
  )
}
