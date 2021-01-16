import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  caseInsensitiveMatch,
  create,
  defaultSWROptions,
  delay,
  editSWROptions,
  exactMatch,
  getEntity,
  list,
  modify,
  numberMatch,
  optionalGet,
  update
} from '../../api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => a.name.localeCompare(b.name))
}

// const generated = []
// Array.from(Array(500)).forEach((_, index) =>
//   generated.push({
//     id: index + 1,
//     version: 0,
//     name: Math.random().toString(36).substring(2),
//     status: 'active'
//   }))
// sort(generated)
// update(data => ({ ...data, customers: generated }))

update(data => ({ ...data, customers: data.customers || [] }))

const expandCustomer = values => {
  return values
}

export const customerToApi = values => {
  return values
}
export const customerFromApi = values => {
  return values
}

export const listCustomers = params => {
  const result = list(params, pageSize, 'customers',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'name') &&
      exactMatch(params, item, 'status')
  )
    .map(expandCustomer)
    .map(customerFromApi)
  console.log('listCustomers', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCustomers = (params, $page = 0, options = {}) =>
  useSWR(['/customers',
    qs.stringify(params), $page], () => listCustomers({ ...params, $page }), { ...defaultSWROptions, ...options })

const getCustomer = id => {
  const result = customerFromApi(expandCustomer(getEntity(id, 'customers')))
  console.log('getCustomer', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCustomer = (id, options = {}) =>
  useSWR(`/customers/${id}`, optionalGet(id, () => getCustomer(id)), { ...defaultSWROptions, ...options })
export const useCustomerEdit = (id, options = {}) =>
  useCustomer(id, { ...editSWROptions, ...options })

export const createCustomer = values => {
  const request = customerToApi(values)
  const result = create({
    ...request,
    status: 'active'
  }, 'customers', sort)
  console.log('createCustomer', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateCustomer = (id, version, values) => {
  const request = customerToApi(values)
  console.log('updateCustomer', id, version, request)
  modify(id, version, 'customers', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchCustomer = (id, version, values) => {
  const request = customerToApi(values)
  console.log('patchCustomer', id, version, request)
  modify(id, version, 'customers', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
