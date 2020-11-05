module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blogs',
        path: `${__dirname}/src/pages/blogs`
      },
    },
    'gatsby-transformer-javascript-frontmatter',
    'gatsby-plugin-less',
  ]
}
