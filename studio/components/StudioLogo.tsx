import React from 'react'

export function StudioLogo() {
  return (
    <img
      src="/static/tonios-logo.png"
      alt="Tonio's Seafood Shack"
      style={{
        height: '36px',
        width:  '36px',
        objectFit: 'contain',
        borderRadius: '50%',
        display: 'block',
      }}
    />
  )
}
