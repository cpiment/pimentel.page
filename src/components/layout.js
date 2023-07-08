import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { 
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  navLinkImage,
  siteTitle
 } from './layout.module.css'

const Layout = ({ pageTitle, isHome, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div className={container}>
      <title>{isHome? "Home" : pageTitle} | {data.site.siteMetadata.title}</title>
      <header className={siteTitle}>
        <svg viewBox="0 0 140 22">
          <text x="0" y="15">{data.site.siteMetadata.title}</text>
        </svg>
      </header>
      <nav>
        <ul className={navLinks}>
         <li className={navLinkItem}>
            <Link to="/blog">
              <span className={navLinkText}>Blog</span>
              <StaticImage src="../images/home.svg" alt="Blog" className={navLinkImage}/>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about">
              <span className={navLinkText}>About</span>
              <StaticImage src="../images/about.svg" alt="About" className={navLinkImage}/>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="https://github.com/cpiment/pimentel.page" >
              <span className={navLinkText}>Github</span>
              <StaticImage src="../images/github.svg" alt="GitHub" className={navLinkImage}/>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}
export default Layout