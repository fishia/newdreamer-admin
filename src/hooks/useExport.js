import { useState } from 'react'
import { message, Modal } from 'antd'

function useExport(downloadURL, options = {}) {
  const [loading, setLoading] = useState(false)
  const { dataSource = [], fileName, parseColumns, columns } = options
  const run = async ids => {
    if (dataSource.length) {
      try {
        downloadURL(ids).then(status => {
          console.log(status)
          if (status) {
            message.success('导出成功')
          }
        })
      } catch (reason) {
        throw reason
      }
    } else {
      message.warning('当前暂无数据可导出')
    }
    setLoading(false)
  }
  //导出全部数据
  const all = async () => {
    await setLoading(true)
    await run()
    setLoading(false)
  }
  //弹窗导出所有选中
  const model = async (ids = []) => {
    await setLoading(true)
    if (ids && ids.length)
      Modal.confirm({
        title: '是否确认导出选中行？',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          run(ids)
        },
      })
    else message.warning('请选择想要导出的行')
  }
  return { run: model, all, loading }
}
export default useExport
