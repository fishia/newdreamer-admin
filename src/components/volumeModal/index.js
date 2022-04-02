import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Radio, Button, Input, Checkbox } from 'antd'
import { previewImage } from '../../assets/js/common'
import './index.less'

const customerInfo = [
  { title: '客户', key: 'customer_Name' },
  { title: '电话', key: 'customer_Phone' },
  { title: '量体时间', key: 'volume_Time' },
  { title: '着装顾问', key: 'volumer_Name', disabled: true },
  { title: '性别', key: 'customer_Gender' },
  { title: '身高CM', key: 'height' },
  { title: '体重', key: 'weight' },
  { title: '量体地址', key: 'volume_Adress' },
  { title: '喜好', key: 'favorite' },
]

const pureSize = [
  { title: '胸围', key: 'bust' },
  { title: '腰围', key: 'waistline' },
  { title: '腰节', key: 'waist' },
  { title: '臀围', key: 'hips' },
  { title: '中腰', key: 'middle_Waist' },
  { title: '裤长', key: 'pants_Length' },
  { title: '下摆', key: 'hem' },
  { title: '横档', key: 'rung' },
  { title: '肩宽', key: 'shoulder_Width' },
  { title: '中裆', key: 'mid_Range' },
  { title: '袖长', key: 'sleeve_Length' },
  { title: '小腿围', key: 'calf_Circumference' },
  { title: '大臂围', key: 'big_Arm_Circumference' },
  { title: '脚口', key: 'foot_Mouth' },
  { title: '小臂围', key: 'small_Arm_Circumference' },
  { title: '通裆', key: 'full_Crotch' },
  { title: '袖口', key: 'cuff' },
  { title: '前胸', key: 'front_Chest' },
  { title: '衣长', key: 'clothe_Length' },
  { title: '后背', key: 'back' },
  { title: '领围', key: 'collar' },
  { title: '胸高', key: 'chest_Height' },
  { title: '备注', key: 'volume_Data_Remark' },
]

// 下面的枚举值是什么
const Figure = [
  {
    title: '肩型',
    key: 'shoulder_Shape',
    children: [
      { title: '溜肩', key: '溜肩' },
      { title: '前冲肩', key: '前冲肩' },
      { title: '耸肩', key: '耸肩' },
    ],
  },
  {
    title: '肚型',
    key: 'belly_Shape',
    children: [
      { title: '啤酒肚', key: '啤酒肚' },
      { title: '小蛮腰', key: '小蛮腰' },
      { title: '小腹凸', key: '小腹凸' },
    ],
  },
  {
    title: '胸背部',
    key: 'chest_Back',
    children: [
      { title: '挺胸体', key: '挺胸体' },
      { title: '后背高', key: '后背高' },
    ],
  },
  {
    title: '臀部',
    key: 'buttocks',
    children: [
      { title: '翘臀', key: '翘臀' },
      { title: '平臀', key: '平臀' },
    ],
  },
]

export default function VolumeModal({
  info,
  sizeInfo,
  editable,
  submit,
  cancel,
  showModal,
  unEditable,
  title,
  showCustomized,
}) {
  const [_info, updateInfo] = useState({}) //净尺寸
  const [_sizeInfo, updateSizeInfo] = useState({}) //成衣尺寸
  const updateForm = useCallback((key, value, mode) => {
    updateInfo(obj => ({ ...obj, ...{ [key]: mode === 'check' ? value.join(' ') : value } }))
  }, [])
  //编辑成衣尺寸
  const updateSizeInfoForm = obj => {
    updateSizeInfo({
      ..._sizeInfo,
      ...obj,
    })
  }

  const [_editable, setEditable] = useState(editable)

  useEffect(() => {
    if (JSON.stringify(info) !== '{}') {
      updateInfo(info || {})
    }
    if (JSON.stringify(sizeInfo) !== '{}') {
      updateSizeInfo(sizeInfo || {})
    }
  }, [info, sizeInfo])
  if (!_info) return null
  return (
    <Modal
      title={title || `量体数据-${_info.customer_Name}`}
      visible={showModal}
      width={1000}
      onCancel={cancel}
      footer={
        <div>
          {!unEditable && (
            <React.Fragment>
              <Button type="primary" onClick={() => setEditable(!_editable)} size="small">
                {_editable ? '取消修改' : '修改'}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  submit(_info, _sizeInfo)
                  setEditable(!_editable)
                }}
                size="small"
              >
                保存
              </Button>
            </React.Fragment>
          )}

          <Button type="primary" onClick={cancel} size="small">
            关闭
          </Button>
        </div>
      }
    >
      <div className="pm-edit-container">
        <div className="volume-modal-customer">
          {customerInfo.map((cust, i) => (
            <div className="volume-customer-item" key={i}>
              <div className="customer-item__title">{cust.title}</div>
              {_editable ? (
                <Input
                  value={_info[cust.key] || ''}
                  placeholder={`请输入${cust.title}`}
                  disabled={cust.disabled}
                  onChange={e => updateForm(cust.key, e.target.value)}
                />
              ) : (
                <div className="customer-item__value">{_info[cust.key]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="volume-modal-size">
          <div className="modal-size-container">
            <div className="modal-size-title">净尺寸</div>
            <div className="modal-size-content">
              {pureSize.map((size, i) => (
                <div className="modal-size-item" key={i}>
                  <div className="size-item__title">{size.title}</div>
                  {_editable ? (
                    <Input
                      value={_info[size.key] || ''}
                      placeholder={`${size.title}`}
                      onChange={e => updateForm(size.key, e.target.value)}
                    />
                  ) : (
                    <div className="size-item__value">{_info[size.key]}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {showCustomized ? (
            <div className="modal-size-container">
              <div className="modal-size-title">成衣尺寸</div>
              <div className="modal-size-content">
                {pureSize.map((size, i) => (
                  <div className="modal-size-item" key={i}>
                    <div className="size-item__title">{size.title}</div>
                    {_editable ? (
                      <Input
                        value={_sizeInfo[size.key] || ''}
                        placeholder={`${size.title}`}
                        onChange={e => updateSizeInfoForm({ [size.key]: e.target.value })}
                      />
                    ) : (
                      <div className="size-item__value">{_sizeInfo[size.key]}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="modal-size-container modal-size-container--figure">
            <div className="modal-size-title">体型</div>
            <div className="modal-size-content">
              {Figure.map((size, i) => (
                <div key={i}>
                  {size.children.map((child, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`modal-size-item  modal-size-item--${index > 0 ? 'hidden' : ''}`}
                      >
                        <div className="size-item__title">{size.title || ''}</div>
                        <div className="size-item__value"> </div>
                      </div>
                      <div className="modal-size-item">
                        <div className="size-item__title">{child.title}</div>
                        <div className="size-item__value">
                          {size.title !== '肩型' ? (
                            <Radio
                              onChange={() => updateForm(size.key, child.key)}
                              checked={_info[size.key] === child.key}
                              disabled={!_editable}
                            />
                          ) : (
                            <Checkbox
                              onChange={e =>
                                updateForm(
                                  size.key,
                                  e.target.checked
                                    ? _info[size.key].split(' ').concat(child.title)
                                    : _info[size.key].split(' ').filter(i => i !== child.title),
                                  'check'
                                )
                              }
                              checked={_info[size.key]?.indexOf(child.key) > -1}
                              disabled={!_editable}
                            />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-figure-images">
            <div className="figure-images-title">体型图</div>
            <div className="figure-images-content">
              {_info.body_Shape_Front && (
                <div className="line">
                  <img
                    onClick={() => {
                      previewImage(_info.body_Shape_Front)
                    }}
                    alt="figure"
                    className="figure-image-item"
                    src={_info.body_Shape_Front}
                  />
                  {/*<Image src={_info.body_Shape_Front}/>*/}
                  <p>正面照</p>
                </div>
              )}
              {_info.body_Shape_Side && (
                <div className="line">
                  <img
                    onClick={() => {
                      previewImage(_info.body_Shape_Side)
                    }}
                    alt="figure"
                    className="figure-image-item"
                    src={_info.body_Shape_Side}
                  />
                  <p>侧面照</p>
                </div>
              )}
              {_info.body_Shape_Back && (
                <div className="line">
                  <img
                    onClick={() => {
                      previewImage(_info.body_Shape_Back)
                    }}
                    alt="figure"
                    className="figure-image-item"
                    src={_info.body_Shape_Back}
                  />
                  <p>背面照</p>
                </div>
              )}
              {/*{_info.body_Shape_Remark && <div>量体备注: {_info.body_Shape_Remark}</div>}*/}
            </div>
            <div className="figure-images-content">
              {_info.volume_Data_Remark && (
                <div>
                  量体备注:{' '}
                  {_editable ? (
                    <Input
                      value={_info.volume_Data_Remark || ''}
                      onChange={e => updateForm('volume_Data_Remark', e.target.value)}
                    />
                  ) : (
                    <div className="item__value">{_info.volume_Data_Remark}</div>
                  )}
                </div>
              )}
            </div>
            <div className="figure-images-content">
              <div>
                体型备注:{' '}
                {_editable ? (
                  <Input
                    value={_info.body_Shape_Remark || ''}
                    onChange={e => updateForm('body_Shape_Remark', e.target.value)}
                  />
                ) : (
                  <div className="item__value">{_info.body_Shape_Remark}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
