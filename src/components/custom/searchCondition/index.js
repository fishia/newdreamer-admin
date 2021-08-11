import React, { forwardRef } from 'react'
import { Form, Row, Col, Button, Space } from 'antd'
import styles from './index.less'

export default forwardRef((props, ref) => {
  const {
    form,
    submit,
    reset,
    searchFields = [],
    layout = 'vertical',
    initialValues,
    style,
  } = props

  return (
    <div className={styles.searchForm} style={style}>
      <Form form={form} layout={layout} initialValues={initialValues} ref={ref}>
        <Row>
          {searchFields
            .filter(item => !item.hide)
            .map((item, i) => {
              if (item.label) {
                return (
                  <Col key={i} span={item.span} offset={item.offset || 0}>
                    <Form.Item labelAlign="right" {...item} label="">
                      {item.elem}
                    </Form.Item>
                  </Col>
                )
              } else {
                return (
                  <Col
                    key={i}
                    span={item.span}
                    offset={item.offset || 0}
                    className={styles.rightBtn}
                    style={item.offset ? { textAlign: 'right' } : null}
                  >
                    <Space>
                      <Button type="primary" onClick={submit}>
                        查询
                      </Button>
                      <Button type="default" onClick={reset}>
                        重置
                      </Button>
                    </Space>
                  </Col>
                )
              }
            })}
        </Row>
      </Form>
    </div>
  )
})
