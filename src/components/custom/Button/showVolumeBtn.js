import { useState } from 'react'
import { Space } from 'antd'
import VolumeModal from '@/components/volumeModal'
import { orderInfoRemote } from '@/services/baseRemote'

export default props => {
  const { title, id, sizeInfo = {}, showCustomized = true } = props
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(null)
  // 量体信息
  const VolumeModalProps = {
    title: `量体信息${title ? `-${title}` : ''}`,
    cancel: () => setVisible(false),
    showModal: visible,
    info,
    sizeInfo,
    unEditable: true,
    showCustomized,
  }
  return (
    <Space>
      <a
        onClick={() => {
          orderInfoRemote
            .findSizeInfoById({ volumeId: id })
            .then(({ status, data }) => {
              if (status) setInfo(data)
            })
            .then(() => setVisible(true))
        }}
        className="primaryBtn"
      >
        量体信息
      </a>
      <VolumeModal {...VolumeModalProps} />
    </Space>
  )
}
