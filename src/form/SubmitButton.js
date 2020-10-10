import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormikContext } from 'formik'
import { spinnerDelay } from '../shared/constants'

export default ({ onClick, children, ...rest }) => {
  const { isSubmitting } = useFormikContext()
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSpinner(true)
    }, spinnerDelay)
    return () => {
      window.clearTimeout(timer)
    }
  }, [spinner])

  const handleClick = (...args) => {
    setSpinner(false)
    onClick && onClick(...args)
  }

  return (
    <>
      <Button type="submit"
              disabled={isSubmitting}
              onClick={handleClick}
              {...rest}>
        {children}
      </Button>
      {isSubmitting && spinner &&
      <FontAwesomeIcon icon="spinner" fixedWidth size="lg" spin
                       className="ml-1"/>
      }
    </>
  )
}
