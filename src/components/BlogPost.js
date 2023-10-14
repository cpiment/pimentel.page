import * as React from 'react'
import Layout from './layout'
import { MdxBlock } from './MdxBlock'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { prevLink, nextLink } from './BlogPost.module.css'

const BlogPost = ({ pageContext, children }) => {
  const image = getImage(pageContext.node.frontmatter.hero_image)
  const updated = pageContext.node.frontmatter.date !== pageContext.node.frontmatter.update_date
  return (
    <Layout pageTitle={pageContext.node.frontmatter.title}
            isHome={pageContext.isHome}>
      <p>{pageContext.node.frontmatter.date}
      {updated? " / Updated: "+pageContext.node.frontmatter.update_date : ""}</p>
      <GatsbyImage
        image={image}
        alt={pageContext.node.frontmatter.hero_image_alt}
      />
      <p>
        Photo Credit:{" "}
        <a href={pageContext.node.frontmatter.hero_image_credit_link}>
          {pageContext.node.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <MdxBlock>
          {children}
      </MdxBlock>
      {pageContext.prev && <Link className={prevLink} 
        to={`/blog${pageContext.prev.fields.slug}`}>
          Previous: {pageContext.prev.frontmatter.title}
      </Link>}
      {pageContext.next && <Link className={nextLink}
        to={`/blog${pageContext.next.fields.slug}`}>
          Next: {pageContext.next.frontmatter.title}
      </Link>}
    </Layout>
  )
}

export default BlogPost