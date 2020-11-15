const localStorageKey = 'CaseFuGeneratorAppData'

export const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
export const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

export const isValidationError = _ => false

export const nextId = data => data.length
  ? data.map(({ id }) => id).sort((a, b) => b - a)[0] + 1
  : 1
