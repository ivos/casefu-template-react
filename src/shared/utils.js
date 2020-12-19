import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import pickBy from 'lodash.pickby'
import qs from 'qs'
import { formatISO, parseISO } from 'date-fns'

export const identity = data => data

export const onEnter = fn => event => event.key === 'Enter' && fn()

const mapValues = (values, fn) =>
  Object.fromEntries(
    Object.entries(values)
      .map(([key, value]) => [key, fn(value)])
  )

export const nullValuesToEmpty = values =>
  mapValues(values, value => value === null || value === undefined ? '' : value)

export const emptyValuesToNulls = values =>
  mapValues(values, value => value === '' ? null : value)

const urlParamsPredicate = value => (value !== undefined && value !== '' && value !== false && value !== null)
export const toUrlParams = values => qs.stringify(pickBy(values, urlParamsPredicate))

export const useUrlParams = () => ({ ...qs.parse(useLocation().search.substring(1)) })

export const usePaging = () => {
  const [pagesCount, setPagesCount] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)

  const resetPages = () => {
    setPagesCount(1)
    setIsLastPage(false)
  }
  const loadNextPage = () => {
    setPagesCount(pagesCount + 1)
  }
  const setLastPage = () => {
    setIsLastPage(true)
  }

  return { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages }
}

export const collapse = (entity, attributeDefs) => {
  const result = { ...entity }
  attributeDefs.forEach(([from, id, to]) => {
    if (entity.hasOwnProperty(from)) {
      const value = entity[from]
      result[to] = (typeof value === 'object' && value !== null) ? value[id] : null
      delete result[from]
    }
  })
  return result
}

export const restore = (entity, attributeDefs) => {
  const result = { ...entity }
  attributeDefs.forEach(([from, to, id]) => {
    if (entity.hasOwnProperty(from)) {
      const value = entity[from]
      result[to] = { [id]: value }
      delete result[from]
    }
  })
  return result
}

export const dateToApi = (attribute, values) => ({
  ...values,
  [attribute]: values[attribute] ? formatISO(values[attribute], { representation: 'date' }) : null
})

export const dateTimeToApi = (attribute, values) => ({
  ...values,
  [attribute]: values[attribute] ? formatISO(values[attribute]) : null
})

export const dateTimeFromApi = (attribute, values) => ({
  ...values,
  [attribute]: values[attribute] ? parseISO(values[attribute]) : null
})

export const useRestored = (urlParam, useGet) => {
  const urlParams = useUrlParams()
  const [isRestoring, setIsRestoring] = useState(true)

  const id = isRestoring ? urlParams[urlParam] : null
  const { data } = useGet(id)

  useEffect(() => {
    if (isRestoring) {
      setIsRestoring(false)
    }
  }, [isRestoring, setIsRestoring])

  return isRestoring ? data : null
}
