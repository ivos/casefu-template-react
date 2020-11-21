import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../shared/constants'
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
const orders = []
const sort = orders => {
  orders.sort((a, b) => a.orderNumber.localeCompare(b.orderNumber))
}
// Array.from(Array(500)).forEach((_, index) =>
//   orders.push({
//     id: index + 1,
//     version: 0,
//     orderNumber: Math.random().toString(36).substring(2),
//     note: Math.random().toString(36).substring(2),
//     status: 'created'
//   }))
// sort(orders)
update(data => ({ ...data, orders }))

const listOrders = params => {
  console.log('listOrders', params)
  return list(params, pageSize, 'orders',
    item =>
      caseInsensitiveMatch(params, item, 'orderNumber') &&
      exactMatch(params, item, 'status')
  )
}
export const useOrders = (params, $page = 0, options = {}) =>
  useSWR(['/orders',
    qs.stringify(params), $page], () => listOrders({ ...params, $page }), { ...defaultSWROptions, ...options })

const getOrder = id => {
  console.log('getOrder', id)
  return getEntity(id, 'orders')
}
export const useOrder = (id, options = {}) =>
  useSWR(`/orders/${id}`, () => getOrder(id), { ...defaultSWROptions, ...options })
export const useOrderEdit = (id, options = {}) =>
  useOrder(id, { ...editSWROptions, ...options })

export const createOrder = values => {
  console.log('createOrder', values)
  return create({ ...values, status: 'created' }, 'orders', sort)
}

export const updateOrder = (id, version, values) => {
  console.log('updateOrder', id, version, values)
  return modify(id, version, 'orders', sort,
    (id, version) => ({ ...values, id, version }))
}

export const patchOrder = (id, version, values) => {
  console.log('patchOrder', id, version, values)
  return modify(id, version, 'orders', sort,
    (id, version, oldValues) => ({ ...oldValues, ...values, id, version }))
}
