import { delay } from './delay'
import { expire } from './cache-expiration'

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
const customers = []
Array.from(Array(500)).forEach((_, index) =>
  customers.push({
    id: index + 1,
    version: 0,
    name: Math.random().toString(36).substring(2)
  }))
customers.sort((a, b) => a.name.localeCompare(b.name))
update(data => ({ ...data, customers }))

export const listCustomers = params => {
  console.log('listCustomers', params)
  return Promise.resolve(
    get().customers.filter(item =>
      (!params.name || (item.name && item.name.toLowerCase().indexOf(params.name.toLowerCase()) === 0))
    )
  )
    .then(delay)
    .then(expire(listCustomers, params))
}
// ttls.set(listCustomers, 10)

export const getCustomer = id => {
  console.log('getCustomer', id)
  return Promise.resolve(
    get().customers.find(item => item.id === Number(id))
  )
    .then(delay)
    .then(expire(getCustomer, id))
}
// ttls.set(getCustomer, 10)

export const createCustomer = values => {
  console.log('createCustomer', values)
  update(data => {
    const id = nextId(data.customers)
    data.customers.push({ ...values, id, version: 0 })
    return data
  })
  return Promise.resolve().then(delay)
}

export const updateCustomer = (id, version, values) => {
  console.log('updateCustomer', id, version, values)
  id = Number(id)
  version = Number(version)
  update(data => {
    const index = data.customers.findIndex(item => item.id === id && item.version === version)
    if (index < 0) {
      throw new Error(`Customer with id ${id} and version ${version} not found.`)
    }
    version++
    data.customers[index] = { ...values, id, version }
    return data
  })
  return Promise.resolve().then(delay)
}
