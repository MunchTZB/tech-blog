import './index.less'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'gatsby'

const DARK_MODE_KEY = 'MUNCH_TECH_BLOG-DARKMODE'
const storedValue = window.localStorage.getItem(DARK_MODE_KEY)

export default ({ children }) => {
  const [darkMode, setDarkMode] = useState(storedValue === '1')
  useEffect(() => {
    window.localStorage.setItem(DARK_MODE_KEY, darkMode ? '1' : '0')
  }, [darkMode])
  return (
    <Fragment>
      <div key="dm" className={`dark-mode${darkMode ? ' on' : ' off'}`}></div>
      <div key="layout" className="layout">
        <div className="layout__header">
          <Link className="layout__link" to="/">
            Munch_TZB
          </Link>
        </div>
        <div className="layout__content">{children}</div>
        <div
          onClick={() => {
            setDarkMode(!darkMode)
          }}
          key="switch"
          className={`dark-mode__switch${darkMode ? ' on' : ' off'}`}
        >
          {darkMode ? '🌒' : '🌖'}
        </div>
      </div>
    </Fragment>
  )
}
