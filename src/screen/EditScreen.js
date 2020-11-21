import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { EditForm } from './index'
import { SkeletonForm } from '../shared/Skeletons'

export default ({ title, entityTitle, url, useResource, rows, validationSchema, update, children }) => {
  const { id } = useParams()

  return <>
    <h2>
      {title}
    </h2>
    <Card>
      <Card.Body>
        <Card.Title>
          {entityTitle}
        </Card.Title>

        <Suspense fallback={<SkeletonForm rows={rows}/>}>
          <EditForm url={url}
                    useResource={useResource}
                    id={id}
                    rows={rows}
                    validationSchema={validationSchema}
                    update={update}>
            {children}
          </EditForm>
        </Suspense>
      </Card.Body>
    </Card>
  </>
}
