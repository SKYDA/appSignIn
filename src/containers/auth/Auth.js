import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { TextareaItem, Toast, Picker, Icon } from 'antd-mobile'
import styles from 'Less/index.less'
import bgSrc from 'Images/auth-bg.png'

const myImg = src => <img src={src} className={styles['result-img']} alt="" />
const colorStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '16px',
    height: '16px',
    marginRight: '10px',
  }  
const colors = [
    {
        label:
        (<div classNames={styles['picker-text']}>
        中国近代史
        </div>),
        value: '中国近代史',
    },
    {
        label:
        (<div classNames={styles['picker-text']}>
        市场营销
        </div>),
        value: '市场营销',
    },
    {
        label:
        (<div classNames={styles['picker-text']}>
        企业战略咨询
        </div>),
        value: '企业战略咨询',
    },
    {
        label:
        (<div classNames={styles['picker-text']}>
        工商管理
        </div>),
        value: '工商管理',
    },
    {
        label:
        (<div classNames={styles['picker-text']}>
        统计学
        </div>),
        value: '统计学',
    },
  ]

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            selectVal: '',
        }
        document.title = '申请认证'
    }

    componentDidMount() {
        console.log(this.props)
    }
    
    goToList = _ => {
        const { router, dispatch } = this.props
        // if (!this.state.value || this.state.value.length < 20 || this.state.value.length > 300 ) {
        //     Toast.info('请输入您的认证原因，20-300字!', 2, null, false)
        //     return
        // }
        // dispatch({
        //     type: 'ADD_ORDER_LIST',
        //     params: {
        //         item: {
        //             id: 1,
        //             avator: '../../images/user.jpg',
        //             title: '大大发嘎嘎的噶',
        //             subject: 'AAA BBBB',
        //             count: 30,
        //             name: 'SF',
        //             sex: 0,
        //             fee: 200,
        //         },
        //     },
        // })
        Toast.loading('提交中...', 1, () => {
            router.push('result/2')
        })
    }

    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            value: e.target.value || '',
        })
    }

    render() {
        const { params: { type = '1' } } = this.props
        return (
            <div style={{background: '#F8F8F8', overflow: 'auto', height: '100%', width: '100%'}}>
                <div className={`${styles['auth-wrap']}`}>
                    {/* <img src={bgSrc} /> */}
                {/* <TextareaItem
                        title=""
                        placeholder="请输入您的认证原因，20-300字"
                        data-seed="logId"
                        rows={15}
                        ref={el => this.customFocusInst = el}
                    /> */}
                    <div className={styles['form-wrap']}>
                        <Picker
                            data={colors}
                            cols={1}
                            title="选择科目"
                            onOk={val => {
                                this.setState({
                                    selectVal: val,
                                })
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div className={styles['like-input']}>{this.state.selectVal || '请选择科目'}</div>
                                {/* <input value={this.state.selectVal} placeholder="请选择科目" disabled /> */}
                                <Icon style={{ position: 'absolute', top: '8px', right: '10px', color: '#cccccc' }} type="down" />
                            </div> 
                        </Picker>
                        <input placeholder="请输入微信号" className={styles['input']} />
                        <textarea
                            className={styles['auth-text']}
                            placeholder="请输入您的认证原因，20-300字"
                            onChange={this.handleChange}
                            maxLength={200}
                            onFocus={ e => {
                                e.target.scrollIntoView()
                            }}
                        />
                        <ul className={styles['ruls']}>
                            <li>规则说明：</li>
                            <li>一、申请条件：</li>
                            <li>1、学员在尚德有“已支付”或“已过服务期”状态订单</li>
                            <li>2、一个学员只能申请一门科目作为学长且本科目考试成绩在80分及以上</li>
                            <li>3、一个学长至多可以带5名学员且学长与学员考试地域一致</li>
                            <li className={styles['mt12']}>二、审核机制：</li>
                            <li>1、申请人信息应与学员账号信息一致</li>
                            <li>2、保证银行卡信息与学员本身信息一致，降低打款问题风险</li>
                            <li>3、提交申请后，我们将在3个工作日内反馈审核结果</li>
                            <li className={styles['mt12']}>三、奖励机制：</li>
                            <li>1、学员通过科目后会把学员的定金作为奖励发放</li>
                            <li>2、奖励周期以学员考试通过后且成绩公布后开始</li>
                            <li>3、金钱将在结算后5个工作日内达到学长账户</li>
                            <li className={styles['mt12']}>四、本项目最终解释权由尚德机构所有</li>
                        </ul>
                    </div>
                    
                    <div
                        className={styles['normal-btn']}
                        onClick={this.goToList}
                    >
                        提交
                    </div>
                </div>
            </div>
        )
    }
}


const getHome = (state) => {
    return state.home
}
const selectors = createSelector(
    [getHome],
    (home) => {
        return {...home}
    }
)

export default connect(selectors)(Auth)
