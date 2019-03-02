import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { TextareaItem, Toast } from 'antd-mobile'
import styles from 'Less/index.less'

const myImg = src => <img src={src} className={styles['result-img']} alt="" />

class StuReserve extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        document.title = '预约申请'
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
        //     type: 'ADD_BOOK_LIST',
        //     params: { 
        //         item: {
        //             id: 1,
        //             avator: '../../images/user.jpg',
        //             subject: '大大发嘎嘎的噶',
        //             time: '刚刚',
        //             type: 0,
        //             orderType: '待审核',
        //             count: 30,
        //             name: 'SF',
        //             sex: 0,
        //             fee: 200,
        //         },
        //     },
        // })
        Toast.success('提交成功！', 2, () => {
            router.push('list/s')
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
                <div className={`${styles['reserve-wrap']}`}>
                    <textarea
                        className={styles['auth-text']}
                        placeholder="您的信息只有老师可以看到哦，请输入20-300字"
                        onChange={this.handleChange}
                        maxLength={200}
                    />
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

export default connect(selectors)(StuReserve)
