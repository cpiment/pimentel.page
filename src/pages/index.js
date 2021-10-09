import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Cat, looking to the left."
        src="../images/2268042621_0d52f7669b_c.jpg"
        layout="fullWidth"
      />
    </Layout>
  )
}

export default IndexPage