import React, { useState } from 'react'
import { Input, Popover } from 'antd'
import PropTypes from 'prop-types'
import Combogrid from './Combogrid'
import './index.less'

function VtxCombogrid(props, ref) {
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
    return []
  })
  const [visible, setVisible] = useState(false)
  const {
    className,
    style,
    placeholder,
    prefixCls = 'vtx-combogrid',
    value,
    allowClear = true,
    ...rest
  } = props

  return (
    <Popover
      content={
        <Combogrid
          {...rest}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setPopoverVisible={setVisible}
          prefixCls={prefixCls}
        />
      }
      placement="bottomLeft"
      trigger="click"
      visible={visible}
      onVisibleChange={visible => setVisible(visible)}
      overlayClassName={`${prefixCls}-dropdown`}
    >
      <Input
        ref={ref}
        value={value}
        allowClear={allowClear}
        onClick={() => setVisible(true)}
        onChange={e => {
          // 只对清空产生值的变化做处理
          if (!e.target.value) {
            rest.onChange && rest.onChange()
            setSelectedRowKeys([])
          }
        }}
        className={className}
        style={style}
        placeholder={placeholder}
      />
    </Popover>
  )
}

export default React.forwardRef(VtxCombogrid)

VtxCombogrid.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  allowClear: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}
