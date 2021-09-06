import { useLayoutEffect, useState } from 'react'
import styles from './index.less'
import renderRoutes from '@/routers/utils/renderRoutes'
import menulogo from '@assets/images/menulogo.png'
import { JKUtil } from '@utils/util'

const LoginLayout = props => {
  const {
    route: { routes },
    location: { pathname },
  } = props

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.panel_content}>
          <div className={styles.rightContent}>
            <div className={styles.logo}>
              <img src={menulogo} />
            </div>
            {renderRoutes(routes)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginLayout
