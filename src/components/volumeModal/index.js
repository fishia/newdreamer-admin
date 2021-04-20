import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Radio, Button, Input } from 'antd';
import './index.less';


const customerInfo = [
    {title: '客户', key: 'customer_Name'},
    {title: '电话', key: 'customer_Phone'},
    {title: '量体时间', key: 'volume_Time'},
    {title: '量体师', key: 'volumer_Name'},
    {title: '性别', key: 'customer_Gender'},
    {title: '身高CM', key: 'height'},
    {title: '体重', key: 'weight'},
    {title: '量体地址', key: 'volume_Adress'}
]

const pureSize = [
    {title: '胸围', key: 'bust'},
    {title: '腰围', key: 'waistline'},
    {title: '腰节', key: 'waist'},
    {title: '臀围', key: 'hips'},
    {title: '中腰', key: 'middle_Waist'},
    {title: '裤长', key: 'pants_Length'},
    {title: '下摆', key: 'hem'},
    {title: '横档', key: 'rung'},
    {title: '肩宽', key: 'shoulder_Width'},
    {title: '中裆', key: 'mid_Range'},
    {title: '袖长', key: 'sleeve_Length'},
    {title: '小腿围', key: 'calf_Circumference'},
    {title: '大臂围', key: 'big_Arm_Circumference'}, 
    {title: '脚口', key: 'foot_Mouth'},
    {title: '小臂围', key: 'small_Arm_Circumference'},
    {title: '通裆', key: 'full_Crotch'},
    {title: '袖口', key: 'cuff'},
    {title: '前胸', key: 'front_Chest'},
    {title: '衣长', key: 'clothe_Length'},
    {title: '后背', key: 'back'},
    {title: '领围', key: 'collar'},
    {title: '胸高', key: 'chest_Height'},
    {title: '备注', key: 'volume_Data_Remark'},
]


// 下面的枚举值是什么
const Figure = [
    {
        title: '肩型',
        key: 'shoulder_Shape',
        children: [
            { title:'溜肩', key: '溜肩' },
            { title:'前冲肩', key: '前冲肩' },
            { title:'耸肩', key: '耸肩' },
        ]
    },
    {
        title: '肚型',
        key: 'belly_Shape',
        children: [
            { title:'啤酒肚', key: '啤酒肚' },
            { title:'小蛮腰', key: '小蛮腰' },
            { title:'小腹凸', key: '小腹凸' },
        ]
    },
    {
        title: '胸背部',
        key: 'chest_Back',
        children: [
            { title:'挺胸体', key: '挺胸体' },
            { title:'后背高', key: '后背高' }
        ]
    },
    {
        title: '臀部',
        key: 'buttocks',
        children: [
            { title:'翘臀', key: '翘臀' },
            { title:'平臀', key: '平臀' }
        ]
    }
]

export default function VolumeModal({ info, editable, submit, cancel, showModal, unEditable }) {
    const [ _info, updateInnfo ] = useState(info);
    const updateForm = useCallback((key, value) => {
        updateInnfo(obj => ({...obj, ...{[key]: value}}))
    }, [])

    const [ _editable, setEditable ] = useState(editable);

    useEffect(() => {
        if (info) {
            updateInnfo(obj => ({...obj || {}, ...info || {}}))
        }
    }, [info])
    if (!_info) return null;
    return <Modal
    closable={false}
        title={`量体数据-${_info.customer_Name}`}
        visible={showModal}
        width={1000}
        footer={<div>
            {
                !unEditable && <React.Fragment>
                    <Button type="primary" onClick={() => setEditable(!_editable)} size="small" >{_editable ? '取消修改' : '修改'}</Button>
                    <Button type="primary" onClick={() => {submit(_info);setEditable(!_editable)}} size="small" >保存</Button>
                </React.Fragment>
            }

            <Button type="primary" onClick={cancel} size="small" >取消</Button>
        </div>}
    >
        <div className="pm-edit-container">
            <div className="volume-modal-customer">
                {customerInfo.map(cust => <div className="volume-customer-item">
                    <div className="customer-item__title">{cust.title}</div>
                    {
                        _editable 
                        ? <Input 
                            value={_info[cust.key] || ''} 
                            placeholder={`请输入${cust.title}`}
                            onChange={e => updateForm(cust.key, e.target.value)}
                         />
                        : <div className="customer-item__value">{_info[cust.key]}</div>
                    }
                    
                </div>)}
            </div>

            <div className="volume-modal-size">
                <div className="modal-size-container">
                    <div className="modal-size-title">净尺寸</div>
                    <div className="modal-size-content">
                        {pureSize.map(size => <div className="modal-size-item">
                            <div className="size-item__title">{size.title}</div>
                            {
                                _editable
                                ? <Input 
                                    value={_info[size.key] || ''} 
                                    placeholder={`请输入${size.title}`}
                                    onChange={e => updateForm(size.key, e.target.value)}
                                />
                                : <div className="size-item__value">{_info[size.key]}</div>
                            }
                            
                        </div>)}
                        
                    </div>
                </div>


                <div className="modal-size-container modal-size-container--figure">
                    <div className="modal-size-title">体型</div>
                    <div className="modal-size-content">
                        {Figure.map((size) => <div>
                            {
                                size.children.map((child, index) => <React.Fragment>
                                    <div className={`modal-size-item  modal-size-item--${index > 0 ? 'hidden' : ''}`}>
                                        <div className="size-item__title">{size.title || ''}</div>
                                        <div className="size-item__value"> </div>
                                    </div>
                                    <div className="modal-size-item">
                                        <div className="size-item__title">{child.title}</div>
                                        <div className="size-item__value"><Radio
                                            onChange={() => updateForm(size.key, child.key)} 
                                            checked={_info[size.key] === child.key} 
                                            disabled={!_editable}
                                        /></div>
                                    </div>
                                </React.Fragment>)
                            }
                        </div>)}
                    </div>
                </div>
                <div className="modal-figure-images">
                    <div className="figure-images-title">体型图</div>
                    <div className="figure-images-content">
                        {info.body_Shape_Back && <img alt="figure" className="figure-image-item" src={info.body_Shape_Back} />}
                        {info.body_Shape_Front && <img alt="figure" className="figure-image-item" src={info.body_Shape_Front} />}
                        {info.body_Shape_Remark && <div>量体备注: {info.body_Shape_Remark}</div>}
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}