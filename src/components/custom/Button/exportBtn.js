import React from 'react'
import { Button, Menu, Dropdown } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import useExport from '@/hooks/useExport'
/**
 * 导出按钮
 * 传入[className, text = '导出', exportApi, type = 'primary',mode = 'backend']
 * dataSource:当前列表数据，selectedRowKeys选中数据
 * downloadUrl:下载api地址，dataSource，selectedRowKeys必须传
 * searchFields:其他的查询条件
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
    exportCommonsFieds,
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
    exportCommonsFieds,
  })
  const handleMenuClick = e => {
    switch (e.key) {
      case 'rows':
        exportBtn.run(selectedRowKeys)
        break
      case 'all':
        exportBtn.all()
        break
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="rows">导出选中行</Menu.Item>
      <Menu.Item key="all">导出全部</Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <Button type={type} icon={<ExportOutlined />} className={className}>
        {text}
      </Button>
    </Dropdown>
  )
}
