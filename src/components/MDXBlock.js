import * as React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from './CodeBlock'
import TableBlock from './TableBlock'

const components = {
  pre: CodeBlock,
  table: TableBlock
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