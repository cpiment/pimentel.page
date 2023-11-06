import * as React from 'react'
import Layout from '../../components/layout'
import { Link, graphql } from 'gatsby'

const TagsPage = ({ data }) => {
  return (
    <Layout pageTitle="Tags">
      {data.tagsGroup.group.map((tag, i) => (
        <p key={`p-${tag.fieldValue}-${i}`}><Link
            key={`tag-${tag.fieldValue}-${i}`}
            to={`/tags/${tag.fieldValue}`}
        >{tag.fieldValue}</Link>: {tag.totalCount} posts</p>
            ))  
        }
    </Layout>
  )
}

export const query = graphql`{
    tagsGroup: 
      allMdx (sort: {frontmatter: {date: DESC}}) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
          totalCount
        }
    }
  }`

export default TagsPage