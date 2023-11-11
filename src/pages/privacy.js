import * as React from 'react'
import Layout from '../components/layout'

const PrivacyPage = () => {
  return (
    <Layout pageTitle="Privacy">
      <p>
        This blog does not track the visitors in any way. It does not use cookies nor telemtry libraries that track
        the user's behaviour.
      </p>
      <p>
        To be able to provide comments functionality in the blog posts this web uses <a href="https://giscus.app">Giscus</a>,
        a comment system that uses the <a href="https://github.com/cpiment/pimentel.page/discussions">code repository</a> of this blog 
        as storage for commentaries. If you enable the comments functionality two items will be stored inside your browser's Local Storage:
      </p>
      <ul>
        <li><code>comments-enabled</code>: Stores your preferenece to keep the value of comment functionality enabled/disabled</li>
        <li><code>giscus-session</code>: If you enable comments and login into GitHub, Giscus stores a session identifier so next time you
        enter the blog you are kept logged in</li>
      </ul>
      <p>
        If you disable the comments functionality <code>giscus-session</code> will be removed from your browser's Local Storage
      </p>
    </Layout>
  )
}

export default PrivacyPage