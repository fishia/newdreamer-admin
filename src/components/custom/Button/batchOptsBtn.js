import React from 'react'
import { Button, message } from 'antd'
import { OrderedListOutlined } from '@ant-design/icons'

//批量操作
export default props => {
  const { text, selectedRowKeys, remote, type = 'primary', className, fetch } = props
  if (!('remote' in props && 'selectedRowKeys' in props)) {
    console.log('remote & selectedRowKeys is required')
  }
  return (
    <Button
      type={type}
      icon={<OrderedListOutlined />}
      onClick={() => {
        if (selectedRowKeys.length) {
          remote(selectedRowKeys).then(({ status }) => {
            if (status) {
              message.success('操作成功')
              fetch()
            }
          })
        } else {
          message.warning('请选择需要一键处理的数据')
        }
      }}
      className={className}
    >
      {text}
    </Button>
  )
}
