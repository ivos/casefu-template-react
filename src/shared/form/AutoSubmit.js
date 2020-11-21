import { useState } from 'react'
import { useFormikContext } from 'formik'
import { useDebounce } from 'react-use'
import { typingDebounceDelay } from '../../constants'

export default () => {
  const { values, submitForm } = useFormikContext()
  const [isInitialCall, setInitialCall] = useState(true)
  // TODO useFirstMountState

  useDebounce(() => {
      if (isInitialCall) { // skip on initial call
        setInitialCall(false)
      } else {
        submitForm()
      }
    },
    typingDebounceDelay,
    [values])

  return null
}
