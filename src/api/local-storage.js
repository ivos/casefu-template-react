import { delay } from './delay'

const localStorageKey = 'CaseFuGeneratorAppData'

export const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
export const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

export const isValidationError = _ => false

export const nextId = data => data.length
  ? data.map(({ id }) => id).sort((a, b) => b - a)[0] + 1
  : 1

export const exactMatch = (params, item, name) =>
  !params[name] || (item[name] === params[name])

export const caseInsensitiveMatch = (params, item, name) =>
  !params[name] || (item[name] && item[name].toLowerCase().indexOf(params[name].toLowerCase()) === 0)

export const list = (params, pageSize, key, filterFn) => {
  const page = params.$page || 0
  return Promise.resolve(
    get()[key]
      .filter(filterFn)
      .slice(page * pageSize, (page + 1) * pageSize)
  ).then(delay)
}

export const getEntity = (id, key) => {
  return Promise.resolve(
    get()[key]
      .find(item => item.id === Number(id))
  ).then(delay)
}

export const create = (values, key, sort) => {
  let id = undefined
  update(data => {
    id = nextId(data[key])
    data[key].push({ ...values, id, version: 0 })
    sort(data[key])
    return data
  })
  return Promise.resolve({ id }).then(delay)
}

export const modify = (id, version, key, sort, modificationFn) => {
  id = Number(id)
  version = Number(version)
  update(data => {
    const index = data[key].findIndex(item => item.id === id && item.version === version)
    if (index < 0) {
      throw new Error(`Entity '${key}' with id ${id} and version ${version} not found.`)
    }
    version++
    data[key][index] = modificationFn(id, version, data[key][index])
    sort(data[key])
    return data
  })
  return Promise.resolve().then(delay)
}
