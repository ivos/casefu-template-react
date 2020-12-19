import { format } from "date-fns"
import { cs, de } from 'date-fns/locale'
import { setLocale as yupSetLocale } from 'yup'
import { registerLocale } from 'react-datepicker'

registerLocale('de', de)
registerLocale('cs', cs)
// setDefaultLocale('cs') - bug in 'react-datepicker' when deleting the value
export const defaultDatePickerLocale = cs
export const defaultDatePickerLocaleName = 'cs'

yupSetLocale({
  mixed: {
    required: 'Required.'
  },
  date: {
    min: ({ min }) => `Should be after ${formatDateTime(min)}.`,
    max: ({ max }) => `Should be before ${formatDateTime(max)}.`
  }
})

export const formatTemporal = (value, formatStr) =>
  format(value, formatStr, { locale: defaultDatePickerLocale })
export const formatDate = value =>
  value ? format(value, 'PP', { locale: defaultDatePickerLocale }) : null
export const formatDateTime = value =>
  value ? format(value, 'PPp', { locale: defaultDatePickerLocale }) : null
