import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const NotFoundPage = () => {
  return (
    <Layout pageTitle="404">
      <p>
        Sorry, we couldn't found what you were looking for.
      </p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </Layout>
  )
}

export default NotFoundPage