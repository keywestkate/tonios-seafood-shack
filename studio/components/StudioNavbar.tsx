import React from 'react'
import { NavbarProps, useCurrentUser } from 'sanity'

/* Tonio's color palette */
const NAVY   = '#102F34'
const GOLD   = '#F3C74F'
const CREAM  = '#F3ECDC'
const RED    = '#C0392B'

export function StudioNavbar(props: NavbarProps) {
  const user = useCurrentUser()

  return (
    <div style={{
      background: NAVY,
      borderBottom: `3px solid ${GOLD}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.25rem',
      height: '56px',
      flexShrink: 0,
    }}>
      {/* Left — logo + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src="/static/tonios-logo.png"
          alt="Tonio's logo"
          style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <div style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: '1rem',
            color: CREAM,
            lineHeight: 1.1,
            letterSpacing: '.01em',
          }}>
            Tonio's Seafood Shack
          </div>
          <div style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: GOLD,
            lineHeight: 1,
          }}>
            Restaurant Management Dashboard
          </div>
        </div>
      </div>

      {/* Center — Sanity's own tool tabs live here */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {props.renderDefault(props)}
      </div>

      {/* Right — location tag + user greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: RED,
          opacity: 0.85,
          whiteSpace: 'nowrap',
        }}>
          📍 Mile Marker 25 · Summerland Key, FL
        </div>
        {user && (
          <div style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.68rem',
            color: CREAM,
            opacity: 0.6,
            whiteSpace: 'nowrap',
          }}>
            {user.name || user.email}
          </div>
        )}
      </div>
    </div>
  )
}
