import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import { defaultDatePickerLocaleName } from '../../i18n'

const Base = ({ value, ...rest }) => {
  const [, meta, { setValue }] = useField(rest)

  const handleChange = newValue => {
    if (value !== newValue) {
      setValue(newValue)
    }
  }

  return <>
    <div className={meta.error ? 'is-invalid' : ''}>
      <ReactDatePicker
        {...rest}
        selected={(value !== null && value !== '') ? new Date(value) : null}
        onChange={handleChange}
        locale={defaultDatePickerLocaleName}
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
