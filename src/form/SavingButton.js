import React, { useState } from 'react'
import SavingButtonBase from './SavingButtonBase'

export default ({ onClick, children, ...rest }) => {
  const [saving, setSaving] = useState(false)

  const handleClick = async (...args) => {
    setSaving(true)
    await onClick(...args)
    setSaving(false)
  }

  return <>
    <SavingButtonBase onClick={handleClick}
                      saving={saving}
                      {...rest}>
      {children}
    </SavingButtonBase>
  </>
}
