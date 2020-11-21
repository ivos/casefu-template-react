import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  caseInsensitiveMatch,
  create,
  defaultSWROptions,
  editSWROptions,
  exactMatch,
  getEntity,
  list,
  modify,
  update
} from '../../api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => a.name.localeCompare(b.name))
}
const generated = []
Array.from(Array(500)).forEach((_, index) =>
  generated.push({
    id: index + 1,
    version: 0,
    name: Math.random().toString(36).substring(2),
    status: 'active'
  }))
sort(generated)
update(data => ({ ...data, customers: generated }))
update(data => ({ ...data, customers: data.customers || [] }))

const listCustomers = params => {
  console.log('listCustomers', params)
  return list(params, pageSize, 'customers',
    item =>
      caseInsensitiveMatch(params, item, 'name') &&
      exactMatch(params, item, 'status')
  )
}
export const useCustomers = (params, $page = 0, options = {}) =>
  useSWR(['/customers',
    qs.stringify(params), $page], () => listCustomers({ ...params, $page }), { ...defaultSWROptions, ...options })

const getCustomer = id => {
  console.log('getCustomer', id)
  return getEntity(id, 'customers')
}
export const useCustomer = (id, options = {}) =>
  useSWR(`/customers/${id}`, () => getCustomer(id), { ...defaultSWROptions, ...options })
export const useCustomerEdit = (id, options = {}) =>
  useCustomer(id, { ...editSWROptions, ...options })

export const createCustomer = values => {
  console.log('createCustomer', values)
  return create({ ...values, status: 'active' }, 'customers', sort)
}

export const updateCustomer = (id, version, values) => {
  console.log('updateCustomer', id, version, values)
  return modify(id, version, 'customers', sort,
    (id, version) => ({ ...values, id, version }))
}

export const patchCustomer = (id, version, values) => {
  console.log('patchCustomer', id, version, values)
  return modify(id, version, 'customers', sort,
    (id, version, oldValues) => ({ ...oldValues, ...values, id, version }))
}
