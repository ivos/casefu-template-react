import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import pickBy from 'lodash.pickby'
import qs from 'qs'

export const onEnter = fn => event => event.key === 'Enter' && fn()

const urlParamsPredicate = value => (value !== undefined && value !== '' && value !== false && value !== null)
export const toUrlParams = values => qs.stringify(pickBy(values, urlParamsPredicate))

export const useUrlParams = defaultValues => ({
  ...defaultValues,
  ...qs.parse(useLocation().search.substring(1))
})

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
