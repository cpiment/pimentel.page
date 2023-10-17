import React from 'react'
import { asciiTable, tableContainer } from './TableBlock.module.css'

const TableBlock = (props) => {
  return (
    <div className={tableContainer}>
      <table className={asciiTable}>
          {props.children}
      </table>
    </div>
  )
}

export default TableBlock