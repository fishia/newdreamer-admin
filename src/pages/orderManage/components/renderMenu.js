import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import _ from 'lodash'
import styles from './index.less'
import { Tabs, Badge, message } from 'antd'
import { productInMakingRemote } from '@/services/baseRemote'
import Table from './table'
import PrintTemplate from '@/components/printTemplate'
const TabPane = Tabs.TabPane

export default props => {
  const { classification } = props
  const [current, setCurrent] = useState('TO_BE_PREPARED')
  const [printVisible, setPrintVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [countObj, setCountObj] = useState({
    TO_BE_PREPARED: 0,
    TO_BE_CONFIRMED: 0,
    TO_BE_DELIVERED: 0,
    COMPLETED: 0,
  })
  const myRef = useRef()
  const getCount = useCallback(() => {
    productInMakingRemote.countStatus({ classification }).then(({ status, data }) => {
      if (status) {
        if (JSON.stringify(data) !== '{}') {
          setCountObj(data)
        }
      }
    })
  }, [])
  useEffect(() => {
    getCount()
  }, [getCount])

  const menuList = [
    {
      tab: '待制作',
      count: 0,
      key: 'TO_BE_PREPARED',
      props: {
        actionWidth: classification === 'CUSTOMIZED_PRODUCT' ? 260 : 200,
        otherTableProps: {
          otherActionBtns: (text, record) => {
            let btns = [
                {
                  name: '制单',
                  popconfirm: {
                    title: '是否确认制单？',
                    confirm() {
                      //TODO:制单
                      productInMakingRemote
                        .updateStatus({ ids: [record.id] })
                        .then(({ status }) => {
                          if (status) {
                            myRef.current?.submit()
                            getCount()
                            message.success('制单成功')
                          }
                        })
                    },
                  },
                },
              ],
              printBtn = {
                name: '去打印',
                onClick() {
                  setRecord({
                    ...record,
                    receivingInfo: `${record.address}${record.volumerName}${record.phoneNumber}`,
                  })
                  setPrintVisible(true)
                },
              }
            if (classification === 'CUSTOMIZED_PRODUCT') btns.push(printBtn)
            return btns
          },
        },
      },
    },
    {
      tab: '待确认',
      key: 'TO_BE_CONFIRMED',
      props: {
        actionWidth: classification === 'CUSTOMIZED_PRODUCT' ? 130 : 100,
        actionBtnProps: {
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
        },
        otherTableProps: {
          otherActionBtns: (text, record) => {
            let btns = [
                {
                  name: '撤销',
                  popconfirm: {
                    title: '是否确认撤销？',
                    confirm() {
                      //TODO:撤销
                      productInMakingRemote.cancel({ ids: [record.id] }).then(({ status }) => {
                        if (status) {
                          myRef.current?.submit()
                          getCount()
                          message.success('撤销成功')
                        }
                      })
                    },
                  },
                },
              ],
              printBtn = {
                name: '去打印',
                onClick() {
                  setRecord({
                    ...record,
                    receivingInfo: `${record.address}${record.volumerName}${record.phoneNumber}`,
                  })
                  setPrintVisible(true)
                },
              }
            if (classification === 'CUSTOMIZED_PRODUCT') btns.push(printBtn)
            return btns
          },
        },
      },
    },
    {
      tab: '待发货',
      key: 'TO_BE_DELIVERED',
      props: {
        actionWidth: classification === 'CUSTOMIZED_PRODUCT' ? 100 : 0,
        actionBtnProps: {
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
        },
        otherTableProps: {
          otherActionBtns: (text, record) => {
            let btns = [],
              printBtn = {
                name: '去打印',
                onClick() {
                  setRecord({
                    ...record,
                    receivingInfo: `${record.address}${record.volumerName}${record.phoneNumber}`,
                  })
                  setPrintVisible(true)
                },
              }
            if (classification === 'CUSTOMIZED_PRODUCT') btns.push(printBtn)
            return btns
          },
        },
      },
    },
    {
      tab: '已完成',
      key: 'COMPLETED',
      props: {
        actionBtnProps: {
          actionWidth: classification === 'CUSTOMIZED_PRODUCT' ? 100 : 0,
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
          showExport: true,
        },
        otherTableProps: {
          otherActionBtns: (text, record) => {
            let btns = [],
              printBtn = {
                name: '去打印',
                onClick() {
                  setRecord({
                    ...record,
                    receivingInfo: `${record.address}${record.volumerName}${record.phoneNumber}`,
                  })
                  setPrintVisible(true)
                },
              }
            if (classification === 'CUSTOMIZED_PRODUCT') btns.push(printBtn)
            return btns
          },
        },
      },
    },
  ]
  return (
    <div className={styles.normal}>
      <Tabs activeKey={current} onChange={key => setCurrent(key)} tabBarGutter={60}>
        {menuList.map(item => (
          <TabPane
            tab={
              <Badge count={item.key === 'COMPLETED' ? 0 : countObj[item.key]}>{item.tab}</Badge>
            }
            key={item.key}
          >
            {item.key === current ? (
              <Table
                {...{
                  ...item.props,
                  ...props,
                  status: item.key,
                  statusName: item.tab,
                }}
                ref={myRef}
              />
            ) : null}
          </TabPane>
        ))}
      </Tabs>
      {printVisible && (
        <PrintTemplate
          record={record}
          visible={printVisible}
          onCancel={() => {
            setPrintVisible(false)
          }}
        />
      )}
    </div>
  )
}
