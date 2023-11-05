import slugify from '@sindresorhus/slugify'
import { resolve } from 'path'
import _ from 'lodash'

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
  const postListTemplate = resolve(`src/components/PostList.js`)

  const result = await graphql(`{
    postsMdx: 
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
              tags
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
    tagsGroup: 
      allMdx (sort: {frontmatter: {date: DESC}}) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
          nodes {
            frontmatter {
              title
              hero_image_alt
              date(formatString: "MMMM DD, YYYY")
              update_date(formatString: "MMMM DD, YYYY")
              hero_image {
                childImageSharp {
                  gatsbyImageData(width: 150, height: 100, layout: FIXED)
                }
              }
            }
            id
            fields {
              slug
            }
          }
        }
      }
}`)
  //Retrieve allMdx pages ordered by date
  const posts = result.data.postsMdx.edges
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

  //Retrieve tag values
  const tags = result.data.tagsGroup.group

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: postListTemplate,
      context: {
        pageTitle: `Posts with tag '${tag.fieldValue}'`,
        data:{
          allMdx: {
            nodes : tag.nodes
          }
        }
      }
    })
  })

}