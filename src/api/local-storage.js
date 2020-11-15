import qs from 'qs'
import useSWR from 'swr'
import { delay } from './delay'
import { defaultPageSize } from '../shared/constants'

const localStorageKey = 'CaseFuGeneratorLocalStorageData'

const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

export const isValidationError = _ => false

const nextId = data => data.length
  ? data.map(({ id }) => id).sort((a, b) => b - a)[0] + 1
  : 1

// Customers
const customersPageSize = defaultPageSize
const customers = []
Array.from(Array(500)).forEach((_, index) =>
  customers.push({
    id: index + 1,
    version: 0,
    name: Math.random().toString(36).substring(2),
    status: 'active'
  }))
const sortCustomers = customers => {
  customers.sort((a, b) => a.name.localeCompare(b.name))
}
sortCustomers(customers)
update(data => ({ ...data, customers }))

const listCustomers = params => {
  console.log('listCustomers', params)
  const page = params.$page || 0
  return Promise.resolve(
    get().customers
      .filter(item =>
        (!params.name || (item.name && item.name.toLowerCase().indexOf(params.name.toLowerCase()) === 0)) &&
        (!params.status || (item.status === params.status))
      )
      .slice(page * customersPageSize, (page + 1) * customersPageSize)
  ).then(delay)
}
export const useCustomers = (params, $page = 0) =>
  useSWR(['/customers',
    qs.stringify(params), $page], () => listCustomers({ ...params, $page }), { suspense: true })

const getCustomer = id => {
  console.log('getCustomer', id)
  return Promise.resolve(
    get().customers.find(item => item.id === Number(id))
  ).then(delay)
}
export const useCustomer = id =>
  useSWR(`/customers/${id}`, () => getCustomer(id), { suspense: true })

export const createCustomer = values => {
  console.log('createCustomer', values)
  let id
  update(data => {
    id = nextId(data.customers)
    data.customers.push({ ...values, status: 'active', id, version: 0 })
    sortCustomers(data.customers)
    return data
  })
  return Promise.resolve({ id }).then(delay)
}

const modifyCustomer = (id, version, modificationFn) => {
  id = Number(id)
  version = Number(version)
  update(data => {
    const index = data.customers.findIndex(item => item.id === id && item.version === version)
    if (index < 0) {
      throw new Error(`Customer with id ${id} and version ${version} not found.`)
    }
    version++
    data.customers[index] = modificationFn(id, version, data.customers[index])
    sortCustomers(data.customers)
    return data
  })
  return Promise.resolve().then(delay)
}

export const updateCustomer = (id, version, values) => {
  console.log('updateCustomer', id, version, values)
  return modifyCustomer(id, version,
    (id, version) => ({ ...values, id, version }))
}

export const patchCustomer = (id, version, values) => {
  console.log('patchCustomer', id, version, values)
  return modifyCustomer(id, version,
    (id, version, oldValues) => ({ ...oldValues, ...values, id, version }))
}
