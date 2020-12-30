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
  expand,
  getEntity,
  list,
  modify,
  numberMatch,
  optionalGet,
  update
} from '../../api'
import { collapse, dateTimeToApi, dateToApi, restore, temporalFromApi } from '../../shared/utils'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => a.orderNumber.localeCompare(b.orderNumber))
}

// const generated = []
// Array.from(Array(500)).forEach((_, index) =>
//   generated.push({
//     id: index + 1,
//     version: 0,
//     orderNumber: Math.random().toString(36).substring(2),
//     note: Math.random().toString(36).substring(2),
//     status: 'created'
//   }))
// sort(generated)
// update(data => ({ ...data, orders: generated }))

update(data => ({ ...data, orders: data.orders || [] }))

const expandOrder = values => {
  values = expand(values, 'customerId', 'customer', 'customers')
  return values
}

export const orderToApi = values => {
  values = dateTimeToApi('received', values)
  values = dateToApi('deliveryDate', values)
  values = collapse(values, 'customer', 'id', 'customerId')
  return values
}
export const orderFromApi = values => {
  values = temporalFromApi('received', values)
  values = temporalFromApi('deliveryDate', values)
  values = restore(values, 'customerId', 'customer', 'id')
  return values
}

const listOrders = params => {
  const result = list(params, pageSize, 'orders',
    item =>
      caseInsensitiveMatch(params, item, 'orderNumber') &&
      numberMatch(params, item, 'customerId') &&
      exactMatch(params, item, 'status')
  )
    .map(expandOrder)
    .map(orderFromApi)
  console.log('listOrders', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useOrders = (params, $page = 0, options = {}) =>
  useSWR(['/orders',
    qs.stringify(params), $page], () => listOrders({ ...params, $page }), { ...defaultSWROptions, ...options })

const getOrder = id => {
  const result = orderFromApi(expandOrder(getEntity(id, 'orders')))
  console.log('getOrder', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useOrder = (id, options = {}) =>
  useSWR(`/orders/${id}`, optionalGet(id, () => getOrder(id)), { ...defaultSWROptions, ...options })
export const useOrderEdit = (id, options = {}) =>
  useOrder(id, { ...editSWROptions, ...options })

export const createOrder = values => {
  const request = orderToApi(values)
  const result = create({ ...request, status: 'created' }, 'orders', sort)
  console.log('createOrder', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateOrder = (id, version, values) => {
  const request = orderToApi(values)
  console.log('updateOrder', id, version, request)
  modify(id, version, 'orders', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchOrder = (id, version, values) => {
  const request = orderToApi(values)
  console.log('patchOrder', id, version, request)
  modify(id, version, 'orders', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
