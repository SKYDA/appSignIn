import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import classNames from 'classnames'
import styles from 'Less/index.less'
import {Button, Toast, Card, Modal, Icon } from 'antd-mobile'
import Room from '../../components/home/Index'
import {MYROOM_SUMMARY_REQUESTED, MYROOM_DELETE_REQUESTED} from '../../constants/home'
import avatorSrc from '../../images/user.jpg'
// const avatorSrc = 'http://img5.duitang.com/uploads/item/201410/02/20141002212239_zWR55.jpeg'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpVisible: false,
        }
        // this.loadingToast()
    }

    componentDidMount = _ => {
        console.log(123)
    }

    loadingToast = _ => {
        Toast.loading('Loading...', 10, () => {
            console.log('Load complete !!!')
        })
    }

    togglePopUpVisible = _ => {
        this.setState({
            popUpVisible: !this.state.popUpVisible,
        })
    }

    pay = (v = 100) => {
        const { dispatch } = this.props
        dispatch({
            type: 'PAY_SUNLAND_YUAN_SUCCEEDED',
            params: { 
                decrement: v,
            },
            cb: _ => {
                this.props.router.push('result')
            },
        })
    }

    render() {
        return (
            <div className={styles['app-wrap']}>
                <Button onClick={this.togglePopUpVisible} type="primary">签到</Button>
                <div className={styles['cur-users']}>
                    <p>当前参与人数1800人</p>
                    <div className={styles['user-imgs']}>
                        {
                            new Array(8).fill(1).map((item, i) => {
                                if (i === 7) {
                                    return <span>...</span>
                                }
                                return <img style={{ transform: `translateX(${-i*10}%)`, zIndex: i }} src={avatorSrc} />
                            })
                        }
                    </div>
                </div>
                <Modal
                    popup
                    visible={this.state.popUpVisible}
                    onClose={this.togglePopUpVisible}
                    animationType="slide-up"
                    afterClose={() => { console.log('afterClose') }}
                    >
                        <div className={styles['modal-wrap']}>
                            <div className={styles['modal-title']}>
                                <Icon type="cross" size="md" />
                                <span>支付</span>
                            </div>
                            <div className={styles['modal-content']}>
                                您剩余的余额为{this.props.amount}
                                <Button onClick={_ => this.pay()} type="primary">支付1000</Button>
                            </div>
                        </div>
                    </Modal>
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

export default connect(selectors)(Home)
