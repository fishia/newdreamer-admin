import { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import VolumeModal from '@/components/volumeModal'
import { VolumeInput } from '@/components/custom/form'
import { orderInfoRemote } from '@/services/baseRemote'

//新增、编辑、查看量体信息
export default props => {
  const { title, sizeDTO, volumeId, onChange, unEditable = false } = props
  const [visible, setVisible] = useState(false)
  const [volumeInputVisible, setVolumeInputVisible] = useState(false)
  const [info, setInfo] = useState(null)
  const [sizeInfo, setSizeInfo] = useState({})
  useEffect(() => {
    console.log(sizeDTO)
    setSizeInfo(sizeDTO)
  }, [sizeDTO])
  console.log(sizeInfo)
  // 量体信息
  const VolumeModalProps = {
    title: `量体信息${title ? `-${title}` : ''}`,
    cancel: () => setVisible(false),
    showModal: visible,
    info,
    sizeInfo,
    unEditable,
    showCustomized: true,
    submit: (_info, sizeInfo) => {
      onChange(_info, sizeInfo)
      setVolumeInputVisible(false)
      setVisible(false)
    },
  }
  return (
    <Space style={{ width: '100%' }}>
      {volumeId ? (
        [
          <a
            key="edit"
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
          </a>,
          volumeInputVisible ? (
            <VolumeInput
              onChange={data => {
                data[0] && setInfo(data[0])
                setVisible(true)
              }}
            />
          ) : (
            <Button
              icon={<ReloadOutlined />}
              key="reset"
              onClick={() => {
                setSizeInfo({})
                setVolumeInputVisible(true)
              }}
            >
              重新选择
            </Button>
          ),
        ]
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
