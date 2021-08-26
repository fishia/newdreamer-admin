import { useState } from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadUrl } from '@/utils/contants'
import { dealOssImageUrl } from '@/assets/js/common'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const PicturesWall = props => {
  const { maxCount = 9, viewMode, fileDirectorEnum, listType = 'picture-card', photos = [] } = props
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState(photos)

  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleChange = ({ file }) => {
    if (!file.response && file.status === 'error') {
      message.info('上传失败')
      return
    }
    setFileList([
      ...fileList,
      {
        ...file,
        url: file && file.response && dealOssImageUrl(file.response[0]),
      },
    ])
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  )
  return (
    <>
      <Upload
        action={uploadUrl(fileDirectorEnum)}
        data={file => {
          return {
            files: file,
          }
        }}
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="oh oops" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}
export default PicturesWall
