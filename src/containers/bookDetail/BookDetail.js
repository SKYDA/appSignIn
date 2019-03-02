import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import classNames from 'classnames'
import styles from 'Less/index.less'
import {Button, Toast, Card, Modal, Icon } from 'antd-mobile'
import Room from '../../components/home/Index'
import {MYROOM_SUMMARY_REQUESTED, MYROOM_DELETE_REQUESTED} from '../../constants/home'
import detailSrc from 'Images/detail.png'
import sCheckSrc from 'Images/order/s-check.png'
import sPaySrc from 'Images/order/s-pay.png'
import sGoingSrc from 'Images/order/s-going.png'
import sEndSrc from 'Images/order/s-end.png'
import tCheckSrc from 'Images/order/t-check.png'
import tPaySrc from 'Images/order/t-pay.png'
import tGoingSrc from 'Images/order/t-going.png'
import tEndSrc from 'Images/order/t-end.png'
// const avatorSrc = 'http://img5.duitang.com/uploads/item/201410/02/20141002212239_zWR55.jpeg'

const { prompt } = Modal
const getSrc = (type, role, orderType) => {
    let src = sCheckSrc
    switch(`${type}${role}`) {
        case '0s':
        src = orderType === '待支付' ? sPaySrc : sCheckSrc
        break
        case '0t':
        src = orderType === '待支付' ? tPaySrc : tCheckSrc
        break
        case '1s':
        src = sEndSrc
        break
        case '1t':
        src = tEndSrc
        break
        case '2s':
        src = sGoingSrc
        break
        case '2t':
        src = tGoingSrc
        break
        case '3s':
        src = sEndSrc
        break
        case '3t':
        src = sEndSrc
        break
    }
    return src
}
class BookDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpVisible: false,
        }
        document.title = '预约详情'
    }

    deal = val => {
        const text = {
            0: '驳回成功！',
            1: '操作成功！',
            2: '取消订单成功！',
            3: '支付成功！',
        }
        const { 
            params: {
                role = 's',
            },
            router
        } = this.props
        if (val === 0) {
            prompt(
                '确认驳回？',
                '',
                [
                  { text: '取消' },
                  { text: '提交', onPress: password => {
                    Toast.success(text[val], 2, () => {
                        router.push(`list/${role}`)
                    })
                  } },
                ],
                'default',
                '',
                ['请输入驳回原因'],
                'ios',
            )
        } else {
            Toast.success(text[val], 2, () => {
                router.push(`list/${role}`)
            })
        }
    }

    render() {
        const { 
            params: {
                role = 's',
                type = '0',
                orderType = '',
            }
        } = this.props
        return (
            <div className={styles['detail-wrap']}>
                <img className={styles['detail-img']} src={getSrc(type, role, orderType)} />
                {
                    type === '0' ?
                    (
                        role === 's' ?
                        (
                            orderType === '待支付' ?
                            <div className={styles['btn-group']}>
                                <div className={styles['group-btn--gray']} onClick={_ => { this.deal(2) }}>取消订单</div>
                                <div className={styles['group-btn']} onClick={_ => { this.deal(3) }}>去支付</div>
                            </div>
                            :
                            <div className={styles['normal-btn--gray']} onClick={_ => { this.deal(2) }}>取消订单</div>
                        )
                        :
                        (
                            orderType === '待审核' ?
                            <div className={styles['btn-group']}>
                                <div className={styles['group-btn--gray']} onClick={_ => { this.deal(0) }}>驳回</div>
                                <div className={styles['group-btn']} onClick={_ => { this.deal(1) }}>通过</div>
                            </div>
                            :
                            null
                        )
                    )
                    :
                    null
                }
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

export default connect(selectors)(BookDetail)
