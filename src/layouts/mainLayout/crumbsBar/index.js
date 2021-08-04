import React from 'react';
import styles from './index.less';

class CrumbBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {crumbs,linkToPage} = this.props;
        return <div className={styles.bar}>
            {
                crumbs.map((item,index)=>{
                    if(index==crumbs.length-1){
                        return <span key={index} className={styles.highlight}>{item.title}</span>
                    }
                    return <span onClick = {!index?()=>{javascript:void(0)}:()=>linkToPage(item.path)} key={index} style = {!index?null:{cursor: 'pointer'}}>{item.title} / </span>
                })
            }
        </div>
    }
}

export default CrumbBar;