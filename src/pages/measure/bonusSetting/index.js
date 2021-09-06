import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker, Select } from 'antd'
import {
  requestBonusSettingList,
  requestBonusSettingCreate,
  requestBonusSettingExport,
} from './action'
const { RangePicker } = DatePicker

// TODO 这里交互有点问题，要改的话2个应该都可以同时改，但是数据怎么会有2条
export default function ProductManager() {
  const [isInit, setIsinit] = useState(false)
  const [pageInfo, updatePageInfo] = useState({
    page: 1,
    size: 10,
  })
  const [tableSize, setTableSize] = useState(0)
  const [dataSource, updateSource] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)
  const [editable, setEditable] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})
  const [setInfo, updateSetInfo] = useState({
    reward_Percentage: null,
    reward_Price: null,
    reward_Setting_Person: '',
    reward_Setting_Time: '',
    reward_Setting_Type: '金额设置',
  })

  const updateInfo = useCallback((key, value) => {
    let reset = {}
    if (key === 'reward_Percentage') {
      reset = { reward_Price: null }
    }
    if (key === 'reward_Price') {
      reset = { reward_Percentage: null }
    }
    if (key === 'reward_Setting_Type') {
      reset = { reward_Percentage: null, reward_Price: null }
    }
    updateSetInfo(info => ({ ...info, ...{ [key]: value }, ...reset }))
  }, [])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }
    requestBonusSettingExport(chooseItems)
  }, [chooseItems])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestBonusSettingList(_pageInfo).then(data => {
      if (data && Array.isArray(data.content) && data.content.length) {
        setTableSize(data.totalElements)
        updateSource(data.content)

        let source = data.content[0]
        if (source) {
          source.reward_Setting_Type = source.reward_Price ? '金额设置' : '比例设置'
          setCurrentInfo(source)
        }
      }
    })
  }, [pageInfo])

  const submit = useCallback(() => {
    let _setInfo = setInfo
    _setInfo.reward_Setting_Time = new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
    if (_setInfo.reward_Setting_Type === '金额设置' && !_setInfo.reward_Price) {
      message.info('请设置金额')
      return
    }
    if (_setInfo.reward_Setting_Type === '比例设置' && !_setInfo.reward_Percentage) {
      message.info('请设置比例')
      return
    }
    if (!_setInfo.reward_Setting_Person) {
      message.info('请输入设置人')
      return
    }
    requestBonusSettingCreate(_setInfo).then(e => {
      message.info('修改成功')
      setEditable(false)
      pageData()
    })
  }, [pageData, setInfo])

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])

  const onPageChange = useCallback(
    page => {
      if (page !== pageInfo.page) {
        pageInfo.page = page
        updatePageInfo({ ...pageInfo })
        pageData()
      }
    },
    [pageData, pageInfo]
  )

  const [columns] = useState([
    { title: '设置编号', dataIndex: 'volumer_Reward_Setting_Id' },
    { title: '设置时间', dataIndex: 'rewardSettingTime' },
    // { title: '设置内容', dataIndex: 'reward_Price'},
    {
      title: '设置方式',
      dataIndex: 'reward_Setting_Type',
      render: (item, record) => (record.reward_Percentage ? '比例设置' : '金额设置'),
    },
    { title: '设置人', dataIndex: 'reward_Setting_Person' },
    {
      title: '设置参数',
      dataIndex: 'reward_Percentage',
      render: (item, record) =>
        `${record.reward_Percentage || record.reward_Price}${record.reward_Price ? '元' : '%'}`,
    },
  ])

  return (
    <div className="product-manager">
      {/* <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
        </section> */}
      <section>
        <div className="manager-table__title">
          <span>金额设置</span>
        </div>
        <div className="setting-content">
          <div className="setting-content-row">
            <div className="setting-content-item">奖励方式</div>
            {/* <div className="setting-content-item">设置时间</div> */}
            <div className="setting-content-item">设置参数</div>
            {/* <div className="setting-content-item">设置人</div> */}
          </div>
          {editable ? (
            <div>
              <div className="setting-content-row">
                <div className="setting-content-item">奖励方式</div>
                <div className="setting-content-item">
                  <Select
                    style={{ width: '100%' }}
                    onChange={value => updateInfo('reward_Setting_Type', value)}
                    defaultValue={setInfo.reward_Setting_Type}
                  >
                    <Select.Option value="金额设置">金额设置</Select.Option>
                    <Select.Option value="比例设置">比例设置</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置参数</div>
                <div className="setting-content-item">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="设置参数"
                    value={
                      setInfo[
                        setInfo.reward_Setting_Type === '金额设置'
                          ? 'reward_Price'
                          : 'reward_Percentage'
                      ]
                    }
                    addonAfter={setInfo.reward_Setting_Type === '金额设置' ? '元' : '%'}
                    onChange={e => {
                      updateInfo(
                        setInfo.reward_Setting_Type === '金额设置'
                          ? 'reward_Price'
                          : 'reward_Percentage',
                        e.target.value
                      )
                    }}
                  />
                </div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置人</div>
                <div className="setting-content-item">
                  <Input
                    style={{ width: '100%' }}
                    onChange={e => updateInfo('reward_Setting_Person', e.target.value)}
                    placeholder="设置人"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="setting-content-row">
                <div className="setting-content-item">奖励方式</div>
                <div className="setting-content-item">{currentInfo.reward_Setting_Type}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">金额设置</div>
                <div className="setting-content-item">
                  {(currentInfo.reward_Setting_Type === '金额设置' &&
                    `${currentInfo.reward_Price || ''}元`) ||
                    (currentInfo.reward_Price === '比例设置' &&
                      `${currentInfo.reward_Percentage || ''}%`)}
                </div>
              </div>
              {/* <div className="setting-content-row">
                                <div className="setting-content-item">设置时间</div>
                                <div className="setting-content-item">{currentInfo.reward_Setting_Time}</div>
                            </div> */}
              <div className="setting-content-row">
                <div className="setting-content-item">设置人</div>
                <div className="setting-content-item">{currentInfo.reward_Setting_Person}</div>
              </div>
            </div>
          )}
        </div>
        <div className="setting-content-buttons">
          {editable ? (
            <React.Fragment>
              <Button onClick={() => setEditable(false)} type="primary">
                取消修改
              </Button>
              <Button onClick={submit} type="primary">
                保存
              </Button>
            </React.Fragment>
          ) : (
            <Button onClick={() => setEditable(true)} type="primary">
              修改
            </Button>
          )}
        </div>
      </section>
      <section className="product-manager-table">
        <div className="manager-table__title">设置记录</div>
        <Table
          rowKey="volumer_Reward_Setting_Id"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: pageInfo.page,
            total: tableSize,
            onChange: onPageChange,
          }}
        />
      </section>
    </div>
  )
}
