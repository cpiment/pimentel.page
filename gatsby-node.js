const path = require(`path`)

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/pages/blog/template.js`)
  const result = await graphql(`
  query {
    allMdx(sort: {fields: frontmatter___date, order: ASC}) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            update_date(formatString: "MMMM DD, YYYY")
            hero_image_alt
            hero_image_credit_link
            hero_image_credit_text
            hero_image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
          body
          slug
        }
      }
    }
  }
  `)
  //Retrieve allMdx pages ordered by date
  const posts = result.data.allMdx.edges
  //Create each page with links to previous and next
  posts.forEach( ({node},index) => {
    createPage({
      path: `blog/${node.slug}`,
      component: blogPostTemplate,
      context: {
        node: node,
        prev: index === 0? null : posts[index-1].node,
        next: index === (posts.length -1)? null : posts[index + 1].node
      },
    })
    //Use the last post to create the Home Page
    if(index === posts.length -1) {
      createPage({
        path: `/`,
        component: blogPostTemplate,
        context: {
          node: node,
          prev: index === 0? null : posts[index-1].node,
          next: index === (posts.length -1)? null : posts[index + 1].node
        },
      })
    }
  })
}