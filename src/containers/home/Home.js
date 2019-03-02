import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import classNames from 'classnames'
import styles from 'Less/index.less'
import {Button, Toast, Card, Modal, Icon, Carousel, Popover } from 'antd-mobile'
import Room from '../../components/home/Index'
import {MYROOM_SUMMARY_REQUESTED, MYROOM_DELETE_REQUESTED} from '../../constants/home'
import femaleSrc from 'Images/female.png'
import maleSrc from 'Images/male.png'
import freeSrc from 'Images/free.png'
import menuSrc from 'Images/menu.png'
import banner1 from 'Images/banner1.png'
import banner2 from 'Images/banner2.png'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpVisible: false,
            data: [banner1, banner2],
            // imgHeight: 100,
        }
        document.title = '学长学姐计划'
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

    goToList = _ => {
        this.props.router.push('list')
    }
    goToAuth = _ => {
        this.props.router.push('auth')
    }
    goToResult = _ => {
        this.props.router.push('result/1')
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

    renderTList = _ => {
        const { 
            orderList: {
                dataSource = [],
            },
        } = this.props
        return (<div>
                <div className={styles['title-wrap']}>
                    <div className={styles['red-line']}></div>
                    <div className={styles['t-title']}>推荐学长</div>
                </div>
                {
                    dataSource.map(item => (
                        <div className={styles['orders-wrap']}>
                            <ul className={styles['order-list']}>
                                <li className={styles['list-item']}>
                                    <div className={styles['flex-wrap']}>
                                        <img className={styles['avator']} src={item.avator} />
                                        <ul>
                                            <li>
                                                <span className={styles['item-name']}>{item.name}</span>
                                                <img className={styles['item-sex']} src={item.sex === 0 ? maleSrc : femaleSrc} />
                                                <span className={styles['item-subject']}>{item.title}</span>
                                            </li>
                                            <li className={styles['normal-li']}>通过科目：{item.subject}</li>
                                            <li className={styles['normal-li']}>帮助人数：{item.count}</li>
                                        </ul>
                                    </div>
                                    <div className={styles['jump-wrap']}>
                                        <img className={styles['item-free']} src={freeSrc} />
                                        <span className={styles['item-num']}>￥{item.fee}</span>
                                        <span className={styles['jump-btn']} onClick={ _ => this.goToDetail(item)}>查看详情</span>
                                    </div>
                                </li>
                            </ul>
                        </div>))
                }
            </div>)
    }
    
    render() {
        const { 
            orderList: {
                dataSource = [],
            },
        } = this.props
        console.log(this.props)
        return (
            <div className={styles['app-wrap']}>
                <Carousel
                    autoplay={true}
                    infinite
                    dots={false}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            style={{ display: 'inline-block', width: '100%' }}
                        >
                            <img
                                className={styles['carousel-img']}
                                src={val}
                                alt=""
                                style={{ verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                {this.renderTList()}
                <Popover 
                    mask={false}
                    // overlayClassName={styles['pop-wrap']}
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        <ul className={styles['pop-wrap']}>
                            <li onClick={this.goToList}>我的预约</li>
                            <li onClick={this.goToResult}>我是学长</li>
                            {/* <li onClick={this.goToAuth}>我是学长</li>
                            <li onClick={this.goToResult}>我的认证</li> */}
                        </ul>,
                    ]}
                    align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                >
                    <div className={styles['menu-btn']}>
                        <img src={menuSrc} />
                    </div>
                </Popover>
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
