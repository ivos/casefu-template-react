import { createResource } from './resource'
import { delay } from './delay'

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
const customers = [
  { id: 1, version: 1, name: 'Gogo' },
  { id: 2, version: 1, name: 'Huhu' },
  { id: 3, version: 1, name: 'Fifi' },
  { id: 4, version: 1, name: 'Pipi' },
  { id: 5, version: 1, name: 'Bla bla' },
  { id: 6, version: 1, name: 'Lulu' },
]
update(data => ({ ...data, customers }))

export const listCustomers = () => createResource(Promise.resolve(get().customers).then(delay))
export const getCustomer = id => createResource(Promise.resolve(
  get().customers.find(item => item.id === Number(id))
).then(delay))
export const createCustomer = values => {
  update(data => {
    const id = nextId(data.customers)
    data.customers.push({ id, version: 0, ...values })
    return data
  })
  return Promise.resolve(null).then(delay)
}
export const updateCustomer = (id, version, values) => {
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
  return Promise.resolve(null).then(delay)
}
