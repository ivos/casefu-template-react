import React, { Suspense, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useMount } from 'react-use'
import { SkeletonTableRows } from '../form'
import { SearchForm, TablePage } from '.'
import { toUrlParams, usePaging, useUrlParams } from '../utils'

export default (
  {
    searchValuesCache, setSearchValuesCache, title, url, useResource,
    searchFormContent, tableHeader, tablePageContent
  }) => {
  const [searchValues, setSearchValues] = useState(searchValuesCache || {})
  const urlParams = useUrlParams(searchValues)
  useMount(() => {
    setSearchValues(urlParams)
  })
  const { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages } = usePaging()
  const history = useHistory()

  useEffect(() => {
    history.replace(`${url}?${toUrlParams(searchValues)}`)
  }, [history, url, searchValues])

  return <>
    <h2>
      {title}
    </h2>
    <SearchForm searchValues={searchValues}
                setSearchValues={setSearchValues}
                setSearchValuesCache={setSearchValuesCache}
                resetPages={resetPages}>
      {searchFormContent}
    </SearchForm>
    <Table bordered hover>
      <thead>
      <tr>
        {tableHeader}
      </tr>
      </thead>
      <tbody>
      {
        [...Array(pagesCount)]
          .map((_, index) =>
            <Suspense fallback={<SkeletonTableRows columns={3}/>}
                      key={`page-${index}`}>
              <TablePage searchValues={searchValues}
                         $page={index}
                         setLastPage={setLastPage}
                         url={url}
                         useResource={useResource}
                         children={tablePageContent}/>
            </Suspense>
          )
      }
      </tbody>
    </Table>

    <Button variant="outline-secondary"
            disabled={isLastPage}
            onClick={loadNextPage}>
      Load next
    </Button>
  </>
}
