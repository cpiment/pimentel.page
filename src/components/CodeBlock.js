//Copied from https://codetrain.io/adding-prism-syntax-highlighting-to-gatsby-mdx
//Author: James Charlesworth (https://www.twitter.com/jcharlesworthuk)

import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'
import Prism from "prism-react-renderer/prism";
import { codeBlock, codeLine } from './CodeBlock.module.css';

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-java");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-powershell");

const CodeBlock = (props) => {
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
  return (
    <Highlight {...defaultProps} code={props.children.props.children.trim()} language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
      theme={theme}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div style={{...style}}>
          <pre className={`${className} ${codeBlock}`}>
            {tokens.map((line, i) => (
              <div className={codeLine}>
                <div key={i} {...getLineProps({line, key: i})}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}

export default CodeBlock