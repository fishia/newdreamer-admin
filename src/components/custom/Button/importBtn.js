import React, { useState } from 'react'
import { message, Button } from 'antd'
import { VtxImport } from '@vtx/components'
import { ImportOutlined } from '@ant-design/icons'
/**
 * 导入按钮
 * className, text = '导入', templateURL,uploadURL, refresh, type = 'default', postData]
 * templateURL:导入模板，必须传
 * uploadURL:导入接口地址，必须
 * refresh：列表刷新，必须
 * postData:导入参数
 */
export default props => {
  const {
    className,
    text = '导入',
    templateURL,
    uploadURL,
    refresh,
    type = 'default',
    postData,
  } = props
  const [visible, setVisible] = useState(false)
  if (!('templateURL' in props && 'uploadURL' in props && 'refresh' in props)) {
    console.log('exportBtn & uploadURL&refresh required')
  }

  // 导入
  let importProps = {
    templateURL,
    uploadURL,
    postData: {
      ...postData,
    },
    visible,
    close() {
      setVisible(false)
    },
    afterUpload(data) {
      try {
        const res = JSON.parse(data)
        if (res.success) {
          message.success('导入成功')
          setVisible(false)
          refresh()
        } else {
          message.error(`导入失败:${res.msg}`)
          setVisible(false)
        }
      } catch (err) {
        console.log(err)
      }
    },
  }
  return (
    <>
      <Button
        type={type}
        icon={<ImportOutlined />}
        onClick={() => setVisible(true)}
        className={className}
      >
        {text}
      </Button>
      {visible && <VtxImport {...importProps} />}
    </>
  )
}
