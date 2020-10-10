import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CancelLink = ({ to, children, ...rest }) =>
  <Link to={to} className="float-right" {...rest}>
    {children || 'Cancel'}
  </Link>

CancelLink.propTypes = {
  to: PropTypes.string.isRequired
}

export default CancelLink
