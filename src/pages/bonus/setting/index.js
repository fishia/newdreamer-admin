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
  const [bounsInfo, setBounsInfo] = useState({
    configTypeEnum: 'BONUS',
  })
  const [distributionInfo, setDistributionInfo] = useState({
    configTypeEnum: 'DISTRIBUTION',
  })
  const [currentInfo, setCurrentInfo] = useState({})
  const [setInfo, updateSetInfo] = useState({})

  const updateBounsInfo = useCallback((key, value) => {
    setBounsInfo(info => ({ ...info, ...{ [key]: value } }))
  }, [])
  const updateDistributionInfo = useCallback((key, value) => {
    setDistributionInfo(info => ({ ...info, ...{ [key]: value } }))
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
        if (data.content) {
          setDistributionInfo(data.content[0])
          setBounsInfo(data.content[1])
        }
      }
    })
  }, [pageInfo])
  const submit = useCallback(() => {
    requestBonusSettingCreate({ ...distributionInfo, id: '' }).then(e => {
      setEditable(false)
      pageData()
    })
    requestBonusSettingCreate({ ...bounsInfo, id: '' }).then(e => {
      setEditable(false)
      pageData()
    })
  }, [bounsInfo, distributionInfo, pageData])

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
    { title: '设置编号', dataIndex: 'id' },
    {
      title: '提现类型',
      dataIndex: 'configTypeEnum',
      render: item => (item === 'BONUS' && '奖励金') || (item === 'DISTRIBUTION' && '分销金'),
    },
    { title: '设置时间', dataIndex: 'createTime' },
    { title: '最低金额', dataIndex: 'value' },
    { title: '设置人', dataIndex: 'userName' },
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
            <React.Fragment>
              <div>
                <div className="setting-content-row">
                  <div className="setting-content-item">提现类型</div>
                  <div className="setting-content-item">
                    <div>奖励金</div>
                  </div>
                </div>
                <div className="setting-content-row">
                  <div className="setting-content-item">最低金额</div>
                  <div className="setting-content-item">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="设置参数"
                      addonAfter="元"
                      onChange={e => updateBounsInfo('value', e.target.value)}
                    />
                  </div>
                </div>
                <div className="setting-content-row">
                  <div className="setting-content-item">设置人</div>
                  <div className="setting-content-item">
                    <Input
                      style={{ width: '100%' }}
                      onChange={e => updateBounsInfo('userName', e.target.value)}
                      placeholder="设置人"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="setting-content-row">
                  <div className="setting-content-item">提现类型</div>
                  <div className="setting-content-item">
                    <div>分销金</div>
                  </div>
                </div>
                <div className="setting-content-row">
                  <div className="setting-content-item">最低金额</div>
                  <div className="setting-content-item">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="设置参数"
                      addonAfter="元"
                      onChange={e => updateDistributionInfo('value', e.target.value)}
                    />
                  </div>
                </div>
                <div className="setting-content-row">
                  <div className="setting-content-item">设置人</div>
                  <div className="setting-content-item">
                    <Input
                      style={{ width: '100%' }}
                      onChange={e => updateDistributionInfo('userName', e.target.value)}
                      placeholder="设置人"
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div>
              <div className="setting-content-row">
                <div className="setting-content-item">奖励方式</div>
                <div className="setting-content-item">
                  {(bounsInfo.configTypeEnum === 'BONUS' && '奖励金') ||
                    (bounsInfo.configTypeEnum === 'DISTRIBUTION' && '分销金')}
                </div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">金额设置</div>
                <div className="setting-content-item">{bounsInfo.value}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置时间</div>
                <div className="setting-content-item">{bounsInfo.createTime}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置人</div>
                <div className="setting-content-item">{bounsInfo.userName}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">奖励方式</div>
                <div className="setting-content-item">
                  {(distributionInfo.configTypeEnum === 'BONUS' && '奖励金') ||
                    (distributionInfo.configTypeEnum === 'DISTRIBUTION' && '分销金')}
                </div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">金额设置</div>
                <div className="setting-content-item">{distributionInfo.value}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置时间</div>
                <div className="setting-content-item">{distributionInfo.createTime}</div>
              </div>
              <div className="setting-content-row">
                <div className="setting-content-item">设置人</div>
                <div className="setting-content-item">{distributionInfo.userName}</div>
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
