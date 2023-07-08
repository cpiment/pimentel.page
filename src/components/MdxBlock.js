import * as React from 'react'
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from './CodeBlock'
import TableBlock from './TableBlock'

const components = {
  pre: CodeBlock,
  table: TableBlock
}

export const MdxBlock = (({children}) => {
    return (
        <MDXProvider components={components}>
            {children}
        </MDXProvider>
    )
})
