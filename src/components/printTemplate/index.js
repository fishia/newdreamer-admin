import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { orderInfoRemote, styleRemote } from '@/services/baseRemote'
import styles from './index.less'
import { chunk } from 'lodash'
import { documentURI } from 'min-document'

export default props => {
  const { record, visible, onCancel } = props
  const { sizeDTO = {}, styleJson = {} } = record
  const [dynamicCols, setDynamicCols] = useState([]) //动态列
  const [detail, setDetail] = useState({}) //量体信息
  //获取量体信息
  useEffect(() => {
    orderInfoRemote.findSizeInfoById({ volumeId: record.volumeId }).then(({ status, data }) => {
      if (status) setDetail(data)
    })
  }, [])
  //获取款式
  useEffect(() => {
    if (styleJson)
      styleRemote.list({ productType: record.productType }).then(({ status, data }) => {
        if (status) {
          if (Array.isArray(data) && data.length) {
            setDynamicCols(
              chunk(
                [
                  ...data[0].optionDTOS.map(item => [
                    item.typeName,
                    item.imagesDTOList.filter(obj => obj.id === styleJson[item.id])[0]?.optionName,
                  ]),
                  ['刺绣内容', styleJson?.embroideryContent, 3],
                ],
                2
              )
            )
          }
        }
      })
  }, [styleJson])

  let cols = [
    [
      {
        label: '制作单号',
        key: 'code',
      },
      {
        label: '制作时间',
        key: 'orderTime',
      },
    ],
    [
      {
        label: '最晚寄出时间',
        key: 'latestSendTime',
      },
      {
        label: '数量',
        key: 'count',
      },
    ],
    [
      {
        label: '供应商名称',
        key: 'supplierName',
      },
      {
        label: '供应商货号',
        key: 'articleNumber',
      },
    ],
    [
      {
        label: '版型',
        key: 'pattern',
      },
      {
        label: '面料编号',
        key: 'fabricId',
      },
    ],
    [
      {
        label: '制作单备注',
        key: 'remark',
        span: 3,
      },
    ],
    [
      {
        label: '收货信息',
        key: 'receivingInfo',
        span: 3,
      },
    ],
  ]
  const pureSize = [
    [
      { title: '胸围', key: 'bust' },
      { title: '腰围', key: 'waistline' },
    ],
    [
      { title: '腰节', key: 'waist' },
      { title: '臀围', key: 'hips' },
    ],
    [
      { title: '中腰', key: 'middle_Waist' },
      { title: '裤长', key: 'pants_Length' },
    ],
    [
      { title: '下摆', key: 'hem' },
      { title: '横档', key: 'rung' },
    ],
    [
      { title: '肩宽', key: 'shoulder_Width' },
      { title: '中裆', key: 'mid_Range' },
    ],
    [
      { title: '袖长', key: 'sleeve_Length' },
      { title: '小腿围', key: 'calf_Circumference' },
    ],
    [
      { title: '大臂围', key: 'big_Arm_Circumference' },
      { title: '脚口', key: 'foot_Mouth' },
    ],
    [
      { title: '小臂围', key: 'small_Arm_Circumference' },
      { title: '通裆', key: 'full_Crotch' },
    ],
    [
      { title: '袖口', key: 'cuff' },
      { title: '前胸', key: 'front_Chest' },
    ],
    [
      { title: '衣长', key: 'clothe_Length' },
      { title: '后背', key: 'back' },
    ],
    [
      { title: '领围', key: 'collar' },
      { title: '胸高', key: 'chest_Height' },
    ],
    [{ title: '肩型', key: 'volume_Data_Remark', span: 5 }],
    [{ title: '肚型', key: 'volume_Data_Remark', span: 5 }],
    [{ title: '胸背部', key: 'volume_Data_Remark', span: 5 }],
    [{ title: '臀部', key: 'volume_Data_Remark', span: 5 }],
    [{ title: '成衣备注', key: 'volume_Data_Remark', span: 5 }],
  ]
  return (
    <Modal
      visible={visible}
      title="打印预览"
      onCancel={onCancel}
      width={900}
      footer={null}
      wrapClassName={styles.modalWrapper}
    >
      <Button
        className={styles.btn}
        type="primary"
        onOk={() => {
          document.title = `${detail.customer_Name}订单信息`
          window.document.body.innerHTML = window.document.getElementById('printBody').innerHTML
          window.print()
          window.location.reload()
        }}
      >
        打印
      </Button>
      <div id="printBody">
        <div className={styles.top}>
          <div style={{ fontSize: '26px', fontWeight: 500 }}>{detail.customer_Name}</div>
          <div>{detail.customer_Gender}</div>
          <div>身高(cm):{detail.height}</div>
          <div>体重(kg):{detail.weight}</div>
        </div>
        <table border={1} className={styles.tableWrapper}>
          {cols.map((item, i) => (
            <tr key={i}>
              {item.map(th => [
                <th key="label">{th.label}</th>,
                <th
                  key="value"
                  colSpan={th.span || 1}
                  style={{ color: '#ff4d4f', fontSize: '18px' }}
                >
                  {record[th.key]}
                </th>,
              ])}
            </tr>
          ))}
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 'calc(100% - 140px)' }}>
            <table border={1} className={styles.tableWrapper}>
              <tr>
                <th></th>
                <th>净尺寸</th>
                <th>成衣尺寸</th>
                <th></th>
                <th>净尺寸</th>
                <th>成衣尺寸</th>
              </tr>
              {pureSize.map((item, i) => (
                <tr key={i}>
                  {item.map(td => {
                    if (td.span) {
                      return [
                        <td key="title">{td.title}</td>,
                        <td
                          key="value"
                          colSpan={td.span}
                          style={{ color: '#ff4d4f', fontSize: '18px' }}
                        >
                          {sizeDTO[td.key]}
                        </td>,
                      ]
                    } else {
                      return [
                        <td key="1">{td.title}</td>,
                        <td key="2" style={{ color: '#ff4d4f', fontSize: '18px' }}>
                          {detail[td.key]}
                        </td>,
                        <td key="3" style={{ color: '#ff4d4f', fontSize: '18px' }}>
                          {sizeDTO[td.key]}
                        </td>,
                      ]
                    }
                  })}
                </tr>
              ))}
            </table>
          </div>
          <div style={{ width: '125px', 'margin-top': '20px' }}>
            {detail.body_Shape_Front && (
              <div style={{ width: '100%', marginBottom: '5px' }}>
                <img
                  alt="figure"
                  className="figure-image-item"
                  src={detail.body_Shape_Front}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
            {detail.body_Shape_Side && (
              <div style={{ width: '100%', marginBottom: '5px' }}>
                <img
                  alt="figure"
                  className="figure-image-item"
                  src={detail.body_Shape_Side}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
            {detail.body_Shape_Back && (
              <div style={{ width: '100%' }}>
                <img
                  alt="figure"
                  className="figure-image-item"
                  src={detail.body_Shape_Back}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>
        </div>
        <table border={1} className={styles.tableWrapper}>
          {styleJson && dynamicCols.length
            ? dynamicCols.map((item, i) => (
                <tr key={i}>
                  {item.map(td => [
                    <td key="label">{td[0]}</td>,
                    <td
                      key="value"
                      style={{ color: '#ff4d4f', fontSize: '18px' }}
                      colSpan={td[2] || 1}
                    >
                      {td[1]}
                    </td>,
                  ])}
                </tr>
              ))
            : null}
        </table>
      </div>
    </Modal>
  )
}
