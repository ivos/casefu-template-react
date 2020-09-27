import { delay } from './delay'

const localStorageKey = 'CaseFuGeneratorLocalStorageData'

const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

// Customers
const customers = [
  { id: 1, name: 'Gogo' },
  { id: 2, name: 'Huhu' },
  { id: 3, name: 'Fifi' },
  { id: 4, name: 'Pipi' },
  { id: 5, name: 'Bla bla' },
  { id: 6, name: 'Lulu' },
]
const customersKey = 'customers'
update(data => ({ ...data, [customersKey]: customers }))
export const listCustomers = () => Promise.resolve(get()[customersKey]).then(delay)
