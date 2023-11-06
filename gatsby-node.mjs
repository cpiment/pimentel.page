import slugify from '@sindresorhus/slugify'
import { resolve } from 'path'

//Adds slug to mdx nodes
export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: 'slug',
      value: `/${slugify(node.frontmatter.title)}`
    })
  }
}

// Log out information after a build is done
export const onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

// Create blog pages dynamically
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = resolve(`src/components/BlogPost.js`)
  const result = await graphql(`{
  allMdx(sort: {frontmatter: {date: ASC}}) {
    edges {
      node {
        fields {
          slug
        }
        internal {
          contentFilePath
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          update_date(formatString: "MMMM DD, YYYY")
          hero_image_alt
          hero_image_credit_link
          hero_image_credit_text
          hero_image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        body
      }
    }
  }
}`)
  //Retrieve allMdx pages ordered by date
  const posts = result.data.allMdx.edges
  //Create each page with links to previous and next
  posts.forEach( ({node},index) => {
    createPage({
      path: `blog${node.fields.slug}`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        node: node,
        prev: index === 0? null : posts[index-1].node,
        next: index === (posts.length -1)? null : posts[index + 1].node,
        isHome: false
      },
    })
    //Use the last post to create the Home Page
    if(index === posts.length -1) {
      createPage({
        path: `/`,
        component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          node: node,
          prev: index === 0? null : posts[index-1].node,
          next: index === (posts.length -1)? null : posts[index + 1].node,
          isHome: true
        },
      })
    }
  })
}