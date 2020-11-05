import React from 'react'
import Layout from '../../components/Layout'

export const frontmatter = {
  time: '2020年 11月 4日',
  title: '怎么训练一个打砖机器人 - Chapter 1',
  desc: '这一章中，我们完成了打砖块机器人的前置需求，完成了一个打砖块游戏。',
  thumb: '../../assets/images/kael-bloom-xuiaCT509Vo-unsplash.jpg',
  hide: false,
}

export default class Content extends React.Component {
  render() {
    return (
      <Layout>
        <article className="typeset">
          <h2>{frontmatter.title}</h2>
          <blockquote>
            《Breakout》是一款由雅达利开发及发布的街机游戏。此游戏是由诺兰·布什内尔和史蒂夫·布里斯托构思，并且是参考1972年雅达利街机游戏《乓》创作，于1976年4月发布，并且已洐生了不少打砖块作品，如《Gee Bee》和《快打砖块》。
          </blockquote>
          <h3>
            前言
          </h3>
          <p>
            打砖块是一个经典游戏，这是一篇系列文章，分为上下两章
          </p>
          <h3>
            test
          </h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore assumenda iure itaque velit enim odit doloribus dolorem cumque corporis voluptas? Veritatis nihil, beatae facere animi cupiditate quis ex voluptatem soluta.
          </p>
        </article>
      </Layout>
    )
  }
}
