import React from 'react'

export default function SidebarItems({ name, active, handleClick  }) {
  return (
<button 
        className={`sidebar-item ${active ? 'active' : ''}`}
        onClick={handleClick}
        >
            { name }
            </button>
  )
}
