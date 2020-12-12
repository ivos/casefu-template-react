import React, { Suspense, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, Table } from 'react-bootstrap'
import { useMount } from 'react-use'
import { SearchForm, SkeletonForm, SkeletonTableRows, TablePage } from '..'
import { emptyValuesToNulls, identity, toUrlParams, usePaging, useUrlParams } from '../utils'

export default (
  {
    searchValuesCache, setSearchValuesCache, title, url, useResource,
    collapse = identity, restore = identity,
    searchFormContent, columns, tableHeader, tablePageContent
  }) => {
  const [searchValues, setSearchValues] = useState(searchValuesCache || {})
  const { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages } = usePaging()
  const history = useHistory()
  const urlParams = useUrlParams()

  useMount(() => {
    setSearchValues({ ...searchValues, ...restore(urlParams) })
  })

  useEffect(() => {
    history.replace(`${url}?${toUrlParams(collapse(searchValues))}`)
  }, [history, url, searchValues, collapse])

  return <>
    <h2>
      {title}
    </h2>
    <Suspense fallback={
      <Card className="mb-3">
        <Card.Body>
          <SkeletonForm rows={3}/>
        </Card.Body>
      </Card>
    }>
      <Card className="mb-3">
        <Card.Body>
          <SearchForm searchValues={searchValues}
                      setSearchValues={setSearchValues}
                      setSearchValuesCache={setSearchValuesCache}
                      resetPages={resetPages}>
            {searchFormContent}
          </SearchForm>
        </Card.Body>
      </Card>

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
              <Suspense fallback={<SkeletonTableRows columns={columns}/>}
                        key={`page-${index}`}>
                <TablePage searchValues={emptyValuesToNulls(collapse(searchValues))}
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
    </Suspense>
  </>
}
