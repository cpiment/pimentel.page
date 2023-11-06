import * as React from 'react'
import PostList from '../../components/PostList'
import { graphql } from 'gatsby'

const BlogPage = ({ data }) => {
  const pageContext = {
    data: data,
    pageTitle: "My Blog Posts"
  }
  return (
    <PostList pageContext={pageContext}></PostList>
  )
}

export const query = graphql`{
  allMdx(sort: {frontmatter: {date: DESC}}) {
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
}`

export default BlogPage