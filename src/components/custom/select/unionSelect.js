import React, { forwardRef, useState, useEffect } from 'react'
import { Input } from 'antd'
import MySelect from './mySelect'
import styles from './index.less'

export default forwardRef((props, ref) => {
  const { list = [], onChange } = props
  const [keyword, setkeyword] = useState(list[0].value)
  const [value, setValue] = useState(undefined)
  const [label, setLabel] = useState(list[0].label)
  const [rightElem, setRightElem] = useState({})
  useEffect(() => {
    /* 查询表单清空初始化时，初始化组件默认值 */
    if (!props.value) {
      setkeyword(list[0].value)
      setLabel(list[0].label)
    }
  }, [props.value])

  const renderInput = style => (
    <Input
      {...{
        value,
        style,
        allowClear: true,
        placeholder: `请输入${label}`,
        onChange: e => {
          setValue(e.target.value)
          onChange({ [keyword]: e.target.value })
        },
      }}
    />
  )
  return (
    <div className={styles.selectPicker}>
      <MySelect
        {...props}
        ref={ref}
        value={{ key: keyword, label }}
        allowClear={false}
        datasource={list}
        style={{ marginRight: '15px', width: '50%' }}
        labelInValue
        onChange={(v, o) => {
          setkeyword(v.key)
          setLabel(v.label)
          setValue('')
          onChange({ [v.key]: '' })
          o[0].elem ? setRightElem(o[0]) : setRightElem({})
        }}
      />
      {rightElem.elem
        ? rightElem.elem({ setValue, onChange, style: { width: '50%' } })
        : renderInput({ width: '50%' })}
    </div>
  )
})
