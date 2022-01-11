import * as React from 'react'
import Layout from '../../components/layout'
import { graphql, Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { article, text, image, postList } from './index.module.css'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <ul className={postList}>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id} className={article}>
            <Link to={`/blog/${node.slug}`}>
              <GatsbyImage className={image}
                image={getImage(node.frontmatter.hero_image)}
                alt={node.frontmatter.hero_image_alt}
              />
            </Link>
            <div className={text}>
              <h2>
                <Link to={`/blog/${node.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p>Posted: {node.frontmatter.date}
              { (node.frontmatter.update_date !== node.frontmatter.date)?
                 ` / Updated: ${node.frontmatter.update_date}` : (null)                
              } </p>
            </div>
          </article>
        ))
      }
      </ul>
    </Layout>
  )
}

export const query = graphql`
query {
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update_date(formatString: "MMMM DD, YYYY")
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 150, height:100, layout: FIXED)
          }
        }
      }
      id
      slug
    }
  }
}
`

export default BlogPage