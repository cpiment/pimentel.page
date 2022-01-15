import React from 'react'
import { asciiTable } from './TableBlock.module.css'

const TableBlock = (props) => {
  return (
    <div className={asciiTable}>
        {props.children}
    </div>
  )
}

export default TableBlock