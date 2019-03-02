import React from 'react'
import classNames from 'classnames'
import styles from 'Less/index.less'
import {Button} from 'antd-mobile'

class OrderList extends React.Component {
    goToDetail = item => {
        const { 
            router,
            dispatch,
        } = this.props
        dispatch({
            type: 'SET_CUR_DETAIL',
            params: {
                orderDetail: { ...item },
            }, 
            cb: _ => {
                this.props.router.push('detail')
            },
        })
    }
    render() {
        const { 
            orderList: {
                dataSource = [],
            },
        } = this.props
        return (<div>
                {
                    dataSource.map(item => (
                        <div className={styles['orders-wrap']}>
                            <ul className={styles['order-list']}>
                                <li onClick={ _ => this.goToDetail(item)}>
                                    <div className={styles['flex-wrap']}>
                                        <img src={item.avator} />
                                        <ul>
                                            <li>{item.title}</li>
                                            <li>{item.subject}</li>
                                        </ul>
                                        <div>
                                            <p>{item.name}</p>
                                            <Button>预约</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{ textDecoration: 'line-through' }}>200</span>
                                        <span>免费</span>
                                    </div>
                                </li>
                            </ul>
                        </div>))
                }
            </div>)
    }
}

export default OrderList
