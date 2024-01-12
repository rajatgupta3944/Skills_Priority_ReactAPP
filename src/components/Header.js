import React from 'react'

function Header({data}) {
  return (
    <div className='header'>
      <div className='header-title'>
      {data}
      </div>
    </div>
  )
}

export default Header
