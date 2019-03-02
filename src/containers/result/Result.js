import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { Result } from 'antd-mobile'
import styles from 'Less/index.less'
import unAuthSrc from 'Images/unAuth.png'
import authSucSrc from 'Images/authSuc.png'

const myImg = src => <img src={src} className={styles['result-img']} alt="" />
class Home extends React.Component {
    constructor(props) {
        super(props)
        document.title = '我的认证'
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { params: { type = '1' } } = this.props
        const TYPE_CON = {
            '1': {
                src: unAuthSrc,
                text: '您还不是学长，请先申请认证~',
                btnText: '立即认证',
                onClick: _ => {
                    this.props.router.push('auth')
                },
            },
            '2': {
                src: authSucSrc,
                text: '恭喜您认证成功，您现在已经是学长啦！',
                btnText: '查看我的预约',
                onClick: _ => {
                    this.props.router.push('list/t')
                },
            },
        }
        const curInfo = TYPE_CON[type]
        return (
            <div className={`${styles['app-wrap']} ${styles['result-wrap']}`}>
                {myImg(curInfo.src)}
                <p className={styles['result-text']}>{curInfo.text}</p>
                <div className={styles['normal-btn']} onClick={curInfo.onClick}>{curInfo.btnText}</div>
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
