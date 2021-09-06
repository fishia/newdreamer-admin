import { withRouter } from 'dva/router'
import styles from './footer.less'
export default withRouter(({ history, Copyright }) => {
  return (
    <div className={styles.footer}>
      {/* <div className = {styles.footerLink}>
                <div>帮助</div>
                <div>隐私</div>
                <div>条款</div>
            </div> */}
      <div className={styles.bottom}>
        <div className={styles.text}>
          <a href="https://beian.miit.gov.cn/" target="_blank">
             备案号：待定
          </a>
        </div>
        <div className={styles.text}>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            {Copyright}
          </a>
        </div>
      </div>
    </div>
  )
})
