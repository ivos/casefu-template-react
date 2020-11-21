import React, { Suspense } from 'react'
import { Card } from 'react-bootstrap'
import { SkeletonForm } from '../shared/Skeletons'
import { CreateForm } from './index'

export default ({ title, entityTitle, url, initialValues, validationSchema, create, children }) =>
  <>
    <h2>
      {title}
    </h2>
    <Card>
      <Card.Body>
        <Card.Title>
          {entityTitle}
        </Card.Title>

        <Suspense fallback={<SkeletonForm rows={1}/>}>
          <CreateForm url={url}
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      create={create}>
            {children}
          </CreateForm>
        </Suspense>
      </Card.Body>
    </Card>
  </>
