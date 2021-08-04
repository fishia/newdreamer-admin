import { useState } from 'react'
import { Space } from 'antd'
import VolumeModal from '@/components/volumeModal'
import { VolumeInput } from '@/components/custom/form'
import { orderInfoRemote } from '@/services/baseRemote'

//新增、编辑、查看量体信息
export default props => {
  const { title, sizeDTO, volumeId, onChange, unEditable = false } = props
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(null)
  // 量体信息
  const VolumeModalProps = {
    title: `量体信息${title ? `-${title}` : ''}`,
    cancel: () => setVisible(false),
    showModal: visible,
    info,
    sizeInfo: sizeDTO,
    unEditable,
    showCustomized: true,
    submit: (_info, sizeInfo) => {
      onChange(_info, sizeInfo)
      setVisible(false)
    },
  }

  return (
    <Space style={{ width: '100%' }}>
      {volumeId ? (
        <a
          onClick={() => {
            orderInfoRemote
              .findSizeInfoById({ volumeId })
              .then(({ status, data }) => {
                if (status) setInfo(data)
              })
              .then(() => setVisible(true))
          }}
          className="primaryBtn"
        >
          量体信息
        </a>
      ) : (
        <VolumeInput
          onChange={data => {
            data[0] && setInfo(data[0])
            setVisible(true)
          }}
        />
      )}
      <VolumeModal {...VolumeModalProps} />
    </Space>
  )
}
