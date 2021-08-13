import { useState, useEffect } from 'react'
import { Space, message } from 'antd'
import Add from '../modal/formModal'
import useFormModal from '@/hooks/useFormModal'
import { renderFormFields } from '@/utils/util'
import { MySelect } from '../select'
import { styleRemote } from '@/services/baseRemote'
/*
 *title:弹窗标题
 *record:初始化formData
 *remote:保存接口
 *viewMode:是否开启预览模式
 */
export default props => {
  const { title, record, remote, viewMode = true, onChange, formData } = props
  const [dynamicCols, setDynamicCols] = useState([]) //动态列
  useEffect(() => {
    styleRemote.list({ ...formData }).then(({ status, data }) => {
      if (status) {
        if (Array.isArray(data) && data.length) {
          setDynamicCols(
            data[0].optionDTOS.map(item => [
              item.typeName,
              item.id,
              {
                form: {
                  type: 'other',
                  rules: [{ required: true }],
                  children: props => (
                    <MySelect
                      datasource={item.imagesDTOList.map(item => ({
                        value: item.id,
                        label: item.optionName,
                      }))}
                      {...props}
                    />
                  ),
                },
              },
            ])
          )
        }
      }
    })
  }, [])
  const columns = [
    ...dynamicCols,
    ['刺绣内容', 'embroideryContent', { form: {} }],
    ['面料编号', 'code', { form: {} }],
  ]
  let obj = {
    title: `款式及面料信息${title ? `-${title}` : ''}`,
    width: 900,
    onOk: params => {
      if (remote) {
        return remote
          .updateStyle({
            item_Id: formData.id,
            styleJson: JSON.stringify(params),
          })
          .then(({ status }) => {
            if (status) {
              addFormModal.setVisible(false)
              message.success('新增款式及面料成功')
            }
          })
      } else {
        onChange({ ...params })
        addFormModal.setVisible(false)
      }
      return status
    },
  }
  if (viewMode)
    obj = Object.assign(obj, {
      footer: null,
      onCancel: () => {
        addFormModal.setVisible(false)
      },
    })
  // 款式及面料
  const addFormModal = useFormModal({
    modal: {
      ...obj,
    },
  })
  return (
    <Space>
      <a
        onClick={() => {
          addFormModal.setFormData({
            ...record,
          })
          addFormModal.setVisible(true)
        }}
        className="primaryBtn"
      >
        款式及面料
      </a>
      {addFormModal.modalProps.visible && (
        <Add {...{ ...addFormModal, viewMode }} formList={renderFormFields(columns)} />
      )}
    </Space>
  )
}
