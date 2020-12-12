import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Select } from 'react-functional-select'
import { useField } from 'formik'
import { useMount, useMountedState } from 'react-use'
import { typingDebounceDelay } from '../../constants'

export default ({ searchFn, getOptionValue, getOptionLabel, id, restoredValue, ...rest }) => {
  const selectRef = useRef(null)
  const isMounted = useMountedState()

  const [{ value }, , { setValue }] = useField(rest)

  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleInputChange = useCallback(() => {
    setIsLoading(true)
  }, [])

  const handleSearchChange = useCallback(async query => {
    const data = await searchFn(query)
    if (isMounted()) {
      setOptions(data)
      setIsLoading(false)
    }
    return data
  }, [searchFn, isMounted])

  const handleOptionChange = useCallback(option => {
    if (option === null) {
      option = ''
    }
    if (value !== option) {
      setValue(option)
    }
  }, [value, setValue])

  const preload = async () => {
    const data = await searchFn('')
    if (isMounted()) {
      setOptions(data)
    }
  }

  useMount(() => {
    preload()
  })

  useEffect(() => {
    if (restoredValue !== null && restoredValue !== undefined) {
      selectRef.current.setValue(restoredValue)
    }
  })

  return <>
    <Select ref={selectRef}
            inputId={id}
            async
            isClearable
            inputDelay={typingDebounceDelay}
            options={options}
            initialValue={value}
            isLoading={isLoading}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            onInputChange={handleInputChange}
            onSearchChange={handleSearchChange}
            onOptionChange={handleOptionChange}
            {...rest}/>
  </>
}
