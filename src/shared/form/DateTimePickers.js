import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import { defaultDatePickerLocale, defaultDatePickerLocaleName } from '../../i18n'
import { isValid, parse } from 'date-fns'

const Base = ({ value, placeholder, dateFormat, ...rest }) => {
  const [, meta, { setTouched, setValue }] = useField(rest)

  const handleChange = newValue => {
    if (value !== newValue) {
      setValue(newValue)
    }
  }

  const handleOnBlur = async event => {
    const { value } = event.target
    const date = parse(value, dateFormat, new Date(), { locale: defaultDatePickerLocale })
    if (isValid(date)) {
      await setValue(date)
    }
    setTouched()
  }

  return <>
    <div className={meta.error ? 'is-invalid' : ''}>
      <ReactDatePicker
        dateFormat={dateFormat}
        {...rest}
        selected={(value !== null && value !== '') ? new Date(value) : null}
        onChange={handleChange}
        locale={defaultDatePickerLocaleName}
        placeholderText={placeholder}
        onBlur={handleOnBlur}
      />
    </div>
  </>
}

export const DatePicker = ({ ...rest }) =>
  <Form.Control as={Base}
                dateFormat="PP"
                {...rest}/>

export const DateTimePicker = ({ ...rest }) =>
  <Form.Control as={Base}
                showTimeSelect
                dateFormat="PPp"
                {...rest}/>
