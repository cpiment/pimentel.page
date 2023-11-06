import * as React from 'react'
import Layout from './layout'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { article, text, image, postList } from './PostList.module.css'

const PostList = ({ pageContext }) => {
  const data = pageContext.data
  const title = pageContext.pageTitle
  return (
    <Layout pageTitle={`${title}`}>
      <ul className={postList}>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id} className={article}>
            <Link to={`/blog${node.fields.slug}`}>
              <GatsbyImage className={image}
                image={getImage(node.frontmatter.hero_image)}
                alt={node.frontmatter.hero_image_alt}
              />
            </Link>
            <div className={text}>
              <h2>
                <Link to={`/blog${node.fields.slug}`}>
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

export default PostList