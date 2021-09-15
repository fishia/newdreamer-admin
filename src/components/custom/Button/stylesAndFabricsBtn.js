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
  const [detail, setDetail] = useState({}) //款式详情
  const [embroideryInput, setEmbroideryInput] = useState(false) //是否展示刺绣、版型
  const [patternInput, setPatternInput] = useState(false) //是否展示刺绣、版型
  useEffect(() => {
    setDetail(record)
  }, [record])
  const columns = [
    ...dynamicCols,
    embroideryInput && ['刺绣内容', 'embroideryContent', { form: {} }],
    ['面料编号', 'code', { form: {} }],
    patternInput && ['版型', 'pattern', { form: {} }],
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
          .then(({ status, data }) => {
            if (status) {
              setDetail({ ...JSON.parse(data.styleJson) })
              message.success('编辑款式及面料成功')
              return status
            }
          })
      } else {
        return new Promise(resolve => {
          onChange({ ...params })
          resolve(true)
        })
      }
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
  useEffect(() => {
    //打开弹窗才调接口
    if (addFormModal.modalProps.visible)
      styleRemote.list({ ...formData }).then(({ status, data }) => {
        if (status) {
          if (Array.isArray(data) && data.length) {
            setEmbroideryInput(data[0].embroideryInput)
            setPatternInput(data[0].patternInput)
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
  }, [addFormModal.modalProps.visible])

  return (
    <Space>
      <a
        onClick={() => {
          addFormModal.setFormData({
            ...detail,
          })
          addFormModal.setVisible(true)
        }}
        className="primaryBtn"
      >
        款式及面料
      </a>
      {addFormModal.modalProps.visible && (
        <Add
          {...{ ...addFormModal, viewMode }}
          formList={renderFormFields(columns, viewMode ? 'view' : 'add')}
        />
      )}
    </Space>
  )
}
