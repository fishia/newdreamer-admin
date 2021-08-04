import { useLayoutEffect, useState } from 'react'
import LoginFooter from './components/footer'
import styles from './index.less'
import { Copyright } from '@utils/contants'
import renderRoutes from '@/routers/utils/renderRoutes'
import logo from '@assets/images/logo.png'
import { JKUtil } from '@utils/util'

const LoginLayout = props => {
  const {
    route: { routes },
    location: { pathname },
  } = props
  let obj = JKUtil.flatten(routes).filter(item => item.path === pathname)
  const [title, setTitle] = useState()
  useLayoutEffect(() => {
    if (obj[0]) setTitle(obj[0].title)
  })

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.panel_content}>
          <div className={styles.rightContent}>
            <div className={styles.logo}>
              <img src={logo} />
            </div>
            <div className={styles.title}>{title}</div>
            {renderRoutes(routes)}
          </div>
        </div>
      </div>
      {/* <LoginFooter {...{ Copyright }} /> */}
    </div>
  )
}
export default LoginLayout
