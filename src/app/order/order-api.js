import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../shared/constants'
import { defaultSWROptions, delay, editSWROptions, get, nextId, update } from '../../api'

const ordersPageSize = defaultPageSize
const orders = []
Array.from(Array(500)).forEach((_, index) =>
  orders.push({
    id: index + 1,
    version: 0,
    orderNumber: Math.random().toString(36).substring(2),
    note: Math.random().toString(36).substring(2),
    status: 'created'
  }))
const sortOrders = orders => {
  orders.sort((a, b) => a.orderNumber.localeCompare(b.orderNumber))
}
sortOrders(orders)
update(data => ({ ...data, orders }))

const listOrders = params => {
  console.log('listOrders', params)
  const page = params.$page || 0
  return Promise.resolve(
    get().orders
      .filter(item =>
        (!params.orderNumber || (item.orderNumber && item.orderNumber.toLowerCase().indexOf(params.orderNumber.toLowerCase()) === 0)) &&
        (!params.status || (item.status === params.status))
      )
      .slice(page * ordersPageSize, (page + 1) * ordersPageSize)
  ).then(delay)
}
export const useOrders = (params, $page = 0, options = {}) =>
  useSWR(['/orders',
    qs.stringify(params), $page], () => listOrders({ ...params, $page }), { ...defaultSWROptions, ...options })

const getOrder = id => {
  console.log('getOrder', id)
  return Promise.resolve(
    get().orders.find(item => item.id === Number(id))
  ).then(delay)
}
export const useOrder = (id, options = {}) =>
  useSWR(`/orders/${id}`, () => getOrder(id), { ...defaultSWROptions, ...options })
export const useOrderEdit = (id, options = {}) =>
  useOrder(id, { ...editSWROptions, ...options })

export const createOrder = values => {
  console.log('createOrder', values)
  let id = undefined
  update(data => {
    id = nextId(data.orders)
    data.orders.push({ ...values, status: 'created', id, version: 0 })
    sortOrders(data.orders)
    return data
  })
  return Promise.resolve({ id }).then(delay)
}

const modifyOrder = (id, version, modificationFn) => {
  id = Number(id)
  version = Number(version)
  update(data => {
    const index = data.orders.findIndex(item => item.id === id && item.version === version)
    if (index < 0) {
      throw new Error(`Order with id ${id} and version ${version} not found.`)
    }
    version++
    data.orders[index] = modificationFn(id, version, data.orders[index])
    sortOrders(data.orders)
    return data
  })
  return Promise.resolve().then(delay)
}

export const updateOrder = (id, version, values) => {
  console.log('updateOrder', id, version, values)
  return modifyOrder(id, version,
    (id, version) => ({ ...values, id, version }))
}

export const patchOrder = (id, version, values) => {
  console.log('patchOrder', id, version, values)
  return modifyOrder(id, version,
    (id, version, oldValues) => ({ ...oldValues, ...values, id, version }))
}
