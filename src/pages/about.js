import * as React from 'react'
import Layout from '../components/layout'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>
        Hi there! I'm Carlos and I have been working in the IT world for more than 10 years now.
        I'm what was called "Systems Administrator", and have been working deploying and configuring
        all kinds of production software in Unix, Linux and Windows environments.
      </p>
      <p>
        Past and present experience include but are not limited to:

        <ul>
          <li>Oracle Weblogic</li>
          <li>Apache HTTPD</li>
          <li>RedHat JBoss EAP</li>
          <li>Kubernetes</li>
          <li>Elasticsearch, Kibana, Logstash, Beats</li>
          <li>Ansible</li>
          <li>Puppet</li>
          <li>Blue Prism</li>
        </ul>        
      </p>
      <p>
        You can find my (more or less) updated profile and contact info 
        in <a href="https://www.linkedin.com/in/carlospimentel/">LinkedIn</a>.
      </p>
    </Layout>
  )
}

export default AboutPage