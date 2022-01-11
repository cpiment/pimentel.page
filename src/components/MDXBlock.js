import * as React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from './CodeBlock'

const components = {
  pre: CodeBlock
}

export const MDXBlock = ({children}) => {
    return (
        <MDXProvider components={components}>
            <MDXRenderer>
                {children}
            </MDXRenderer>
        </MDXProvider>
    )
}