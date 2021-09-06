import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
/**
 * 新增、修改按钮
 * 传入[className, text = '新增', formModal, type = 'primary']
 * formModal:新增、修改弹窗的hooks对象实例，必须传
 */
export default props => {
  const { className, text = '新增', formModal, type = 'primary', actionType = 'add' } = props
  let isAdd = actionType === 'add',
    btnText = 'text' in props ? text : isAdd ? '新增' : '修改'
  if (!('formModal' in props)) {
    console.log('formModal is required')
  }
  return (
    <Button
      type={type}
      icon={isAdd ? <PlusOutlined /> : <EditOutlined />}
      onClick={() => formModal.setVisible(true)}
      className={className}
    >
      {btnText}
    </Button>
  )
}
