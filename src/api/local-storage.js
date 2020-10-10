import { delay } from './delay'

const localStorageKey = 'CaseFuGeneratorLocalStorageData'

const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

export const isValidationError = _ => false

// Customers
const customers = [
  { id: 1, name: 'Gogo' },
  { id: 2, name: 'Huhu' },
  { id: 3, name: 'Fifi' },
  { id: 4, name: 'Pipi' },
  { id: 5, name: 'Bla bla' },
  { id: 6, name: 'Lulu' },
]
update(data => ({ ...data, customers }))

export const listCustomers = () => Promise.resolve(get().customers).then(delay)
export const createCustomer = values => {
  update(data => {
    const id = data.customers.length ? data.customers.map(({ id }) => id).sort((a, b) => b - a)[0] + 1 : 1
    return { ...data, customers: [...data.customers, { id, ...values }] }
  })
  return Promise.resolve(null).then(delay)
}
