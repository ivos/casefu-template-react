import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

export default ({ ...rest }) => {
  const location = useLocation()

  return <>
    <Button variant="outline-secondary"
            as={NavLink} to={`${location.pathname}/edit`}
            {...rest}>
      <FontAwesomeIcon icon={['far', 'edit']}/>
      &nbsp;Edit
    </Button>
  </>
}
