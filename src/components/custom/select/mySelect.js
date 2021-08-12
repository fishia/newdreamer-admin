import React, { forwardRef } from 'react'
import { Select } from 'antd'

const { Option } = Select

const MySelect = forwardRef((props, ref) => {
  const {
    datasource = [],
    onChange = () => {},
    onChangeData = () => {},
    showArrow = true,
    placeholder = '请选择',
    maxTagCount = 1,
    showAll = false,
    allowClear = true,
  } = props
  const all = showAll ? [{ label: '不限', value: '' }] : []
  const changeHandler = (value, option) => {
    let obj = datasource.filter(item => item.value === (props.labelInValue ? value.key : value))
    onChange(value, obj)
    onChangeData(option ? datasource[option.key] : {})
  }

  return (
    <Select
      {...props}
      placeholder={placeholder}
      showArrow={showArrow}
      onChange={changeHandler}
      ref={ref}
      maxTagCount={maxTagCount}
      showSearch={true}
      allowClear={allowClear}
      filterOption={(input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }}
    >
      {[...all, ...datasource].map((d, i) => (
        <Option value={d.value} key={i}>
          {d.label}
        </Option>
      ))}
    </Select>
  )
})

export default MySelect
