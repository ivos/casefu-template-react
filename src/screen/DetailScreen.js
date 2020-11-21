import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { SkeletonForm } from '../shared/Skeletons'
import { DetailForm } from './'

export default ({ title, entityTitle, rows, useResource, buttons, children }) => {
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
          <DetailForm
            id={id}
            useResource={useResource}
            buttons={buttons}>
            {children}
          </DetailForm>
        </Suspense>
      </Card.Body>
    </Card>
  </>
}
