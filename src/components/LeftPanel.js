import React from 'react'
import Header from './Header'

function LeftPanel() {
  return (
    <div className='left-panel'>
      <Header data="School Level" />
      <div className='left-panel-box'>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 1fr" }}>
          <span className='left-child'> Level 0</span><span className='left-child'>➡️</span>
        </div>
      </div>
    </div>
  )
}


export default LeftPanel
