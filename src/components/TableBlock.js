import React from 'react'
import { asciiTable } from './TableBlock.module.css'

const TableBlock = (props) => {
  return (
    <table className={asciiTable}>
        {props.children}
    </table>
  )
}

export default TableBlock