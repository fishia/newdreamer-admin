import React, { forwardRef } from 'react'
import { AutoComplete, Input } from 'antd'
/* ...补充备注 */
const MyAutoComplete = forwardRef((props, ref) => {
  const {
    options = [],
    onChange = () => {},
    placeholder,
    labelInValue = true,
    fieldNames = {
      label: 'label',
      value: 'value',
    },
    maxLength = 10,
  } = props

  return (
    <AutoComplete
      {...props}
      options={
        labelInValue
          ? options.map(item => ({ value: item[fieldNames.label] }))
          : options.map(item => ({ value: item }))
      }
      onChange={v => {
        if (labelInValue) {
          let obj = options.filter(item => item[fieldNames.label] === v)
          if (obj[0]) onChange(obj[0], obj[0][fieldNames.value], obj[0][fieldNames.label])
          else onChange({}, undefined, v)
        } else {
          onChange(v)
        }
      }}
      placeholder=""
      filterOption={(input, option) => {
        return option.value.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
      }}
      ref={ref}
      getPopupContainer={triggerNode => triggerNode.parentNode}
    >
      <Input size="large" allowClear={true} placeholder={placeholder} maxLength={maxLength} />
    </AutoComplete>
  )
})

export default MyAutoComplete
