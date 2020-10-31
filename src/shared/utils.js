import { useLocation } from 'react-router-dom'
import pickBy from 'lodash.pickby'
import qs from 'qs'

export const onEnter = fn => event => event.key === 'Enter' && fn()

const urlParamsPredicate = value => (value !== undefined && value !== '' && value !== false && value !== null)
export const toUrlParams = values => qs.stringify(pickBy(values, urlParamsPredicate))

export const useUrlParams = defaultValues => ({
  ...defaultValues,
  ...qs.parse(useLocation().search.substring(1))
})
