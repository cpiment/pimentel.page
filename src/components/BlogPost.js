import * as React from 'react'
import Layout from './layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { prevLink, nextLink } from './BlogPost.module.css'
import CodeBlock from './CodeBlock'

const components = {
  pre: CodeBlock
}

const BlogPost = ({ pageContext }) => {
  const image = getImage(pageContext.node.frontmatter.hero_image)
  return (
    <Layout pageTitle={pageContext.node.frontmatter.title}
            isHome={pageContext.isHome}>
      <p>{pageContext.node.frontmatter.date}</p>
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
      <MDXProvider components={components}>
        <MDXRenderer>
          {pageContext.node.body}
        </MDXRenderer>
      </MDXProvider>
      {pageContext.prev && <Link className={prevLink} 
        to={`/blog/${pageContext.prev.slug}`}>
          Previous: {pageContext.prev.frontmatter.title}
      </Link>}
      {pageContext.next && <Link className={nextLink}
        to={`/blog/${pageContext.next.slug}`}>
          Next: {pageContext.next.frontmatter.title}
      </Link>}
    </Layout>
  )
}

export default BlogPost