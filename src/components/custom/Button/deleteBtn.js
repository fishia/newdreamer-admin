import React from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
/**
 * 新增、修改按钮
 * 传入[text = '删除',selectedRowKeys,deleteRows,type = 'danger',className]
 * deleteRows，删除的hooks对象实例，deleteRows,selectedRowKeys必须传
 */
export default props => {
  const { text = '删除', selectedRowKeys, deleteRows, type = 'danger', className } = props
  if (!('deleteRows' in props && 'selectedRowKeys' in props)) {
    console.log('deleteRows & selectedRowKeys is required')
  }
  return (
    <Button
      type={type}
      icon={<DeleteOutlined />}
      onClick={() => deleteRows.model(selectedRowKeys)}
      className={className}
    >
      {text}
    </Button>
  )
}
