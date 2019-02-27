import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { Result } from 'antd-mobile'
import styles from 'Less/index.less'

const myImg = src => <img src={src} className={styles['result-img']} alt="" />

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(123)
    }

    render() {
        return (
            <Result
                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                title="支付成功"
                message={<div>998.00元 <del>1098元</del></div>}
            />
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
