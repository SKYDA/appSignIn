import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import classNames from 'classnames'
import styles from 'Less/index.less'
import {Button, Toast, Card, Modal, Icon } from 'antd-mobile'
import Room from '../../components/home/Index'
import {MYROOM_SUMMARY_REQUESTED, MYROOM_DELETE_REQUESTED} from '../../constants/home'
import detailSrc from 'Images/detail.png'
// const avatorSrc = 'http://img5.duitang.com/uploads/item/201410/02/20141002212239_zWR55.jpeg'

class OrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpVisible: false,
        }
    }

    componentDidMount = _ => {
        console.log(123)
    }

    book = _ => {
        const { dispatch, router } = this.props
        router.push('reserve')
    }

    render() {
        return (
            <div className={styles['detail-wrap']}>
                <img className={styles['detail-img']} src={detailSrc} />
                <div className={styles['normal-btn']} onClick={this.book}>立即预约</div>
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

export default connect(selectors)(OrderDetail)
