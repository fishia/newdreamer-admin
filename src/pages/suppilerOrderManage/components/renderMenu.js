import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import _ from 'lodash'
import styles from '@/pages/orderManage/components/index.less'
import { Tabs, Badge, message } from 'antd'
import useFormModal from '@/hooks/useFormModal'
import Table from './table'
import { productInMakingRemote } from '@/services/baseRemote'
const TabPane = Tabs.TabPane

export default forwardRef((props, ref) => {
  const [current, setCurrent] = useState('TO_BE_CONFIRMED')
  const [mode, setMode] = useState() //修改\填写运单号
  const [countObj, setCountObj] = useState({
    TO_BE_CONFIRMED: 0,
    TO_BE_DELIVERED: 0,
    COMPLETED: 0,
  })
  const myRef = useRef()
  useImperativeHandle(
    ref,
    () => {
      return { status: current }
    },
    [current]
  )
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
  // 填写订单号
  const addFormModal = useFormModal({
    modal: {
      title: `运单号-${mode === 'add' ? '新增' : '修改'}`,
      width: 450,
      onOk: params => {
        return productInMakingRemote
          .updateStatus({
            ...params,
            status: current,
            id: addFormModal.formData?.id,
          })
          .then(({ status }) => {
            if (status) {
              addFormModal.setVisible(false)
              myRef.current?.submit()
              getCount()
              message.success(`${mode === 'add' ? '新增' : '修改'}运单号成功`)
            }
            return status
          })
      },
    },
  })
  const menuList = [
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
                name: '确认',
                popconfirm: {
                  title: '是否确认确认？',
                  confirm() {
                    //TODO:确认
                    productInMakingRemote.updateStatus({ id: record.id }).then(({ status }) => {
                      if (status) {
                        myRef.current?.submit()
                        getCount()
                        message.success('已确认')
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
        actionWidth: 150,
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
                name: '填写运单号',
                onClick: () => {
                  setMode('add')
                  addFormModal.setFormData({
                    id: record.id,
                    shipmentId: '',
                  })
                  getCount()
                  addFormModal.setVisible(true)
                },
              },
            ]
          },
        },
      },
    },
    {
      tab: '已完成',
      key: 'COMPLETED',
      props: {
        actionWidth: 150,
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
                name: '修改运单号',
                onClick: () => {
                  setMode('edit')
                  addFormModal.setFormData({
                    id: record.id,
                    shipmentId: record.shipmentId,
                  })
                  addFormModal.setVisible(true)
                },
              },
            ]
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
                  addFormModal,
                }}
                ref={myRef}
              />
            ) : null}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
})
