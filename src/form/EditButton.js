import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()

  return (
    <Button variant="outline-secondary" autoFocus
            as={NavLink} to={`${location.pathname}/edit`}>
      <FontAwesomeIcon icon={['far', 'edit']}/>
      &nbsp;Edit
    </Button>
  )
}
