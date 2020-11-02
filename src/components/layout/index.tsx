import './index.less';
import React from 'react'
import { Link } from 'gatsby'

export default ({ children }) => {
  return (
    <div className="layout">
      <div className="layout__header">
        <Link to="/">Munch_TZB</Link>
      </div>
    </div>
  )
}
