import React from 'react'
import Layout from '../components/Layout'
import { Link, graphql, useStaticQuery } from 'gatsby'

const blogs = [
  {
    to: '/blogs/brick-break-chapter-1',
    title: '怎么训练一个打砖机器人 - Chapter 1',
    desc: '这一章中，我们完成了打砖块机器人的前置需求，完成了一个打砖块游戏。',
    image: 'kael-bloom-xuiaCT509Vo-unsplash.jpg',
    credits:
      '<span>Photo by <a href="https://unsplash.com/@kaelbloom?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Kael Bloom</a> on <a href="https://unsplash.com/s/photos/brick-break-game?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>',
  },
]

export default () => {
  const blogs = useStaticQuery(graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "blogs" } }) {
        edges {
          node {
            id
            name
            birthTime(formatString: "YYYY年 MM月 DD日")
            childJavascriptFrontmatter {
              frontmatter {
                desc
                error
                hide
                thumb
                time
                title
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <ul className="blogs">
        {/* @ts-ignore */}
        {blogs.allFile.edges?.map(({ node }) => {
          const frontmatter = node.childJavascriptFrontmatter.frontmatter
          if (frontmatter.error) return null
          if (frontmatter.hide) return null
          return (
            <Link key={node.id} to={`/blogs/${node.name}`}>
              <li className="blogs__item">
                <div className="left">
                  <div className="left__time">{node.birthTime}</div>
                  <div className="left__title">{frontmatter.title}</div>
                  <div className="left__desc">{frontmatter.desc}</div>
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    </Layout>
  )
}
