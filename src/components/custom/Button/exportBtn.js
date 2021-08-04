import React from 'react'
import { Button } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import useExport from '@/hooks/useExport'
/**
 * 导出按钮
 * 传入[className, text = '导出', exportApi, type = 'primary',mode = 'backend']
 * dataSource:当前列表数据，selectedRowKeys选中数据
 * downloadUrl:下载api地址，dataSource，selectedRowKeys必须传
 */
export default props => {
  const {
    className,
    text = '导出',
    downloadURL,
    selectedRowKeys,
    type = 'default',
    dataSource,
    fileName,
    parseColumns,
    columns,
  } = props

  if (!('downloadURL' in props && 'selectedRowKeys' in props && 'dataSource' in props)) {
    console.log('downloadURL & selectedRowKeys & dataSource is required')
  }

  //导出数据
  const exportBtn = useExport(downloadURL, {
    selectedRowKeys,
    dataSource,
    fileName,
    parseColumns,
    columns,
  })
  return (
    <Button
      type={type}
      icon={<ExportOutlined />}
      onClick={() => exportBtn.run(selectedRowKeys)}
      className={className}
    >
      {text}
    </Button>
  )
}
