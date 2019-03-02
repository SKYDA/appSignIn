import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import styles from 'Less/index.less'
import { Tabs } from 'antd-mobile'
import menuSrc from 'Images/student.png'

const tabs = [
    { title: <div>预约中</div> },
    { title: <div>已驳回</div> },
    { title: <div>进行中</div> },
    { title: <div>已结束</div> },
  ];
const orderTypeClassName = {
    '待支付': styles['item-tag--orange'],
    '待审核': styles['item-tag--green'],
}
class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        console.log(this.props.params)
        const { params: { role = 's' } } = this.props
        document.title = role === 't' ? '学长工作台' : '预约列表'
    }

    goToBookDetail = item => {
        const { params: { role = 's' } } = this.props
        this.props.router.push(`bookDetail/${role}/${item.type}/${item.orderType || ''}`)
    }

    goToHome = _ => {
        this.props.router.push('home')
    }

    renderText = item => {
        const { params: { role = 's' } } = this.props
        const obj = {
            's': {
                text: '通过科目',
                key: 'subject',
            },
            't': {
                text: '申请原因',
                key: 'subject',
            },
        }
        return `${obj[role].text}：${item[obj[role].key]}`
    }

    renderTList = type => {
        const { 
            bookList: {
                dataSource = [],
            },
            params: { role = 's' }
        } = this.props
        console.log(dataSource.filter(item => item.type === type))
        return (<div>
                {
                    dataSource.filter(item => (item.type === type && item.role === role)).map(item => (
                        <div>
                            <ul>
                                <li 
                                    className={styles['list-item']}
                                    onClick={_ => {
                                        this.goToBookDetail(item)
                                    }}
                                >
                                    <div className={styles['flex-wrap']}>
                                        <img src={item.avator} />
                                        {
                                            item.type === 0 ?
                                            <ul style={{ flex: 1 }}>
                                                <li className={styles['title-li']}>
                                                    <span className={styles['item-name']}>{item.name}</span>
                                                    <span className={orderTypeClassName[item.orderType]}>
                                                        {item.orderType}
                                                    </span>
                                                </li>
                                                <li className={styles['normal-li']}>
                                                    <span style={{ flex: 1 }}>{this.renderText(item)}</span>
                                                    <div className={styles['item-subject']} style={{ marginTop: 0}}>{item.time}</div>
                                                </li>
                                            </ul>
                                            :
                                            <ul style={{ flex: 1 }}>
                                                <li className={styles['title-li']}>
                                                    <span className={styles['item-name']}>{item.name}</span>
                                                    <span className={styles['item-subject']}>{item.time}</span>
                                                </li>
                                                <li className={styles['normal-li']}>
                                                    <span style={{ flex: 1 }}>{this.renderText(item)}</span>
                                                    <div className={styles['item-subject']} style={{ marginTop: 0}}> </div>
                                                </li>
                                            </ul> 

                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>))
                }
            </div>)
    }

    render() {
        const { params: { role = 's' }, currentTab } = this.props
        return (
            <div className={styles['app-wrap']}>
                {
                    role === 't' ?
                    <img onClick={this.goToHome} className={styles['stu-menu']} src={menuSrc} />
                    : null
                }
                <Tabs tabs={tabs}
                    tabBarActiveTextColor="#FF3C46"
                    tabBarInactiveTextColor="#323232"
                    tabBarUnderlineStyle={{
                        border: '1px solid #FF3C46',
                    }}
                    initialPage={0}
                    page={currentTab}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { 
                        this.props.dispatch({
                            type: 'SET_TAB',
                            index,
                        })
                     }}
                    >
                    <div className={styles['tab-content']}>
                        {this.renderTList(0)}
                    </div>
                    <div className={styles['tab-content']}>
                        {this.renderTList(1)}
                    </div>
                    <div className={styles['tab-content']}>
                        {this.renderTList(2)}
                    </div>
                    <div className={styles['tab-content']}>
                        {this.renderTList(3)}
                    </div>
                </Tabs>
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

export default connect(selectors)(OrderList)
