import React from 'react'
import { ActionBtn, DeleteBtn, ExportBtn, ImportBtn } from '../Button'
import styles from './index.less'

export default props => {
  const {
    showExport = false,
    showAdd = false,
    showDelete = false,
    showImport = false,
    addProps = {},
    deleteProps = {},
    importProps = {},
    exportProps = {},
  } = props

  return (
    <div className={styles.actionBar}>
      {showAdd && <ActionBtn {...addProps} />}
      {showDelete && <DeleteBtn {...deleteProps} />}
      {showImport && <ImportBtn {...importProps} />}
      {showExport && <ExportBtn {...exportProps} />}
    </div>
  )
}