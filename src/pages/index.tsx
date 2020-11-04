import React from 'react'
import Layout from '../components/layout';
import { Link } from 'gatsby'

export default () => {
  return (
    <Layout>
      <ul className="blogs">
        <Link to="/about">
          <li className="blogs__item">
            <div className="left">
              <div className="left__time">
                2020年 11月 4日
              </div>
              <div className="left__title">
                怎么训练一个打砖块机器人 - Chapter 1
              </div>
              <div className="left__desc">
                这一章中，我们完成了打砖块机器人的前置需求，先完成一个打砖块游戏。
              </div>
            </div>
            <div className="right"></div>
          </li>
        </Link>
      </ul>
    </Layout>
  )
}
