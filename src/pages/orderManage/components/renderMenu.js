import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import _ from 'lodash'
import styles from './index.less'
import { Tabs, Badge, message } from 'antd'
import { productInMakingRemote } from '@/services/baseRemote'
import Table from './table'
const TabPane = Tabs.TabPane

export default props => {
  const [current, setCurrent] = useState('TO_BE_PREPARED')
  const [countObj, setCountObj] = useState({
    TO_BE_PREPARED: 0,
    TO_BE_CONFIRMED: 0,
    TO_BE_DELIVERED: 0,
    COMPLETED: 0,
  })
  const myRef = useRef()
  const getCount = useCallback(() => {
    productInMakingRemote
      .countStatus({ classification: props.classification })
      .then(({ status, data }) => {
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
        actionWidth: 200,
        otherTableProps: {
          otherActionBtns: (text, record) => {
            return [
              {
                name: '制单',
                popconfirm: {
                  title: '是否确认制单？',
                  confirm() {
                    //TODO:制单
                    productInMakingRemote.updateStatus({ id: record.id }).then(({ status }) => {
                      if (status) {
                        myRef.current?.submit()
                        getCount()
                        message.success('制单成功')
                      }
                    })
                  },
                },
              },
            ]
          },
        },
      },
    },
    {
      tab: '待确认',
      key: 'TO_BE_CONFIRMED',
      props: {
        actionWidth: 100,
        actionBtnProps: {
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
        },
        otherTableProps: {
          otherActionBtns: (text, record) => {
            return [
              {
                name: '撤销',
                popconfirm: {
                  title: '是否确认撤销？',
                  confirm() {
                    //TODO:撤销
                    productInMakingRemote.cancel({ id: record.id }).then(({ status }) => {
                      if (status) {
                        myRef.current?.submit()
                        getCount()
                        message.success('撤销成功')
                      }
                    })
                  },
                },
              },
            ]
          },
        },
      },
    },
    {
      tab: '待发货',
      key: 'TO_BE_DELIVERED',
      props: {
        actionWidth: 0,
        actionBtnProps: {
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
        },
      },
    },
    {
      tab: '已完成',
      key: 'COMPLETED',
      props: {
        actionBtnProps: {
          actionWidth: 0,
          showAdd: false,
          showDelete: false,
          showEdit: false,
          showCopy: false,
          showExport: true,
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
    </div>
  )
}
