import { Button } from 'antd'
import { downloadFile } from '@utils/util'

export default props => {
  const { url } = props
  return (
    <div style={{ height: '140px', textAlign: 'center' }}>
      <div>
        <img
          src={url}
          style={{ width: '100px', height: '100px', marginBottom: '5px' }}
          alt="解码失败"
        />
      </div>
      <Button
        type="primary"
        onClick={() => {
          //渠道名-活动名-时间
          downloadFile(url)
        }}
      >
        下载二维码
      </Button>
    </div>
  )
}
