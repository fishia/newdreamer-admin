import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'antd'
import { useAntdTable } from 'ahooks'
import PropTypes from 'prop-types'
import { VtxDatagrid } from '@vtx/components'

function VtxCombogrid(props) {
  const [more, setMore] = useState(false)
  const [form] = Form.useForm()
  const {
    prefixCls,
    setPopoverVisible,
    multiple,
    onChange,
    getTableData,
    columns,
    searchForms = [],
    selectedRowKeys,
    setSelectedRowKeys,
    ...rest
  } = props

  const { tableProps, search, loading } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  })
  const { submit, reset } = search

  // 触发查询时清空列表选中项
  useEffect(() => {
    if (selectedRowKeys.length > 0) {
      setSelectedRowKeys([])
    }
  }, [loading])

  // 表格
  const { pagination } = tableProps
  const { current, pageSize } = pagination

  let newTableProps = {
    ...tableProps,
    columns,
    startIndex: (current - 1) * pageSize + 1,
    size: 'small',
    headFootHeight: 140,
    pagination: {
      ...pagination,
      showSizeChanger: false,
    },
    onRow: record => {
      if (multiple) {
        return {}
      }
      return {
        onClick: () => {
          onChange && onChange([record])
          setPopoverVisible(false)
        },
      }
    },
  }
  if (multiple) {
    newTableProps = {
      ...newTableProps,
      rowSelection: {
        selectedRowKeys,
        onChange(selectedRowKeys, selectedRows) {
          setSelectedRowKeys(selectedRowKeys)
          onChange && onChange(selectedRows)
        },
      },
    }
  }

  // 查询和清空会重置selectedRowKeys，因此也需清空文本中的value值
  const query = () => {
    submit()
    multiple && selectedRowKeys.length && onChange && onChange()
  }
  const clear = () => {
    reset()
    multiple && selectedRowKeys.length && onChange && onChange()
  }

  // 查询条件是否超过2个，超过2个默认隐藏
  const formLen = searchForms.length
  const isMore = formLen > 2
  let moreSearchForm = []
  if (isMore) {
    moreSearchForm = searchForms.slice(2)
  }

  const renderFormItem = field => {
    const { name, label, render } = field
    return (
      <Col span={12} key={name}>
        <Form.Item label={label} name={name} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {render && render(form)}
        </Form.Item>
      </Col>
    )
  }

  return (
    <div className={`${prefixCls}-popover`}>
      {formLen > 0 && (
        <Form form={form}>
          <Row gutter={8}>
            <Col span={18}>
              <Row>
                {searchForms.map((item, idx) => {
                  if (idx < 2) {
                    return renderFormItem(item)
                  }
                })}
              </Row>
              {more && (
                <Row>
                  {moreSearchForm.map(item => {
                    return renderFormItem(item)
                  })}
                </Row>
              )}
            </Col>
            <Col span={6} className={`${prefixCls}-btns`}>
              <Button onClick={query} type="primary" size="small">
                查询
              </Button>
              <Button onClick={clear} size="small">
                清空
              </Button>
              {isMore && (
                <Button icon="more" size="small" title="更多" onClick={() => setMore(!more)} />
              )}
            </Col>
          </Row>
        </Form>
      )}
      <div className={`${prefixCls}-main`}>
        <VtxDatagrid toolbar={false} {...newTableProps} {...rest} rowKey={record => record.key} />
      </div>
    </div>
  )
}

VtxCombogrid.propTypes = {
  prefixCls: PropTypes.string,
  getTableData: PropTypes.func.isRequired,
  columns: PropTypes.array,
  searchForms: PropTypes.array,
  form: PropTypes.object,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  setPopoverVisible: PropTypes.func,
  selectedRowKeys: PropTypes.array,
  setSelectedRowKeys: PropTypes.func,
}

export default VtxCombogrid
