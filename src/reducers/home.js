import { handleActions } from 'redux-actions'
import { Toast } from 'antd-mobile'

export default handleActions({
    ['PAY_SUNLAND_YUAN_SUCCEEDED'](state, action) {
        const { params: { decrement }, cb } = action
        Toast.loading('Loading...', 1, () => {
            cb && cb()
        })
        return {
            ...state,
            amount: state.amount - decrement,
        }
    },
    ['SET_CUR_DETAIL'](state, action) {
        const { params: { orderDetail }, cb } = action
        cb && cb()
        return {
            ...state,
            orderDetail,
        }
    },
    ['ADD_ORDER_LIST'](state, action) {
        const { params: { item }, cb } = action
        const { orderList: { dataSource } } = state
        cb && cb()
        return {
            ...state,
            orderList: {
                dataSource: [
                    item,
                    ...dataSource,
                ],
            },
        }
    },
    ['ADD_BOOK_LIST'](state, action) {
        const { params: { item }, cb } = action
        const { bookList: { dataSource } } = state
        cb && cb()
        return {
            ...state,
            bookList: {
                dataSource: [
                    item,
                    ...dataSource,
                ],
            },
        }
    },
    ['UPDATE_BOOK_LIST_ITEM'](state, action) {
        const { params: { id, type = 0 }, cb } = action
        const { bookList: { dataSource } } = state
        cb && cb()
        return {
            ...state,
            bookList: {
                dataSource: [
                    ...dataSource(item => ({ 
                        ...item,
                        [item.id === id ? 'type' : '']: type,
                        [item.id === id ? 'time' : '']: '刚刚',
                     }))
                ],
            },
        }
    },
    ['SET_TAB'](state, action) {
        const { index } = action
        return {
            ...state,
            currentTab: index,
        }
    },
}, {
    home: {

    },
    currentTab: 0,
    orderDetail: {

    },
    orderList: {
        dataSource: [
            {
                id: 1,
                avator: '../../images/users/user2.png',
                title: '全国工商企业管理',
                subject: '市场营销',
                count: 3,
                name: '王金龙',
                sex: 0,
                fee: 200,
            },
            {
                id: 1,
                avator: '../../images/users/user1.png',
                title: '全国工商企业管理',
                subject: '企业管理',
                count: 8,
                name: '徐晓慧',
                sex: 1,
                fee: 200,
            },
            {
                id: 1,
                avator: '../../images/users/user3.png',
                title: '全国工商企业管理',
                subject: '企业管理',
                count: 10,
                name: '卢家国',
                sex: 0,
                fee: 200,
            },
        ],
    },
    bookList: {
        dataSource: [
            {
                id: 1,
                avator: '../../images/users/user2.png',
                subject: '考了2次都没有通过，快坚持不下去了，学长帮帮忙...',
                time: '1天前',
                type: 0,
                name: '李建明',
                orderType: '待支付',
                role: 't',
            },
            {
                id: 1,
                avator: '../../images/users/user1.png',
                subject: '希望能够跟学长一起学习，共同进步...',
                time: '1天前',
                type: 0,
                name: '刘言芳',
                orderType: '待审核',
                role: 't',
            },
            {
                id: 1,
                avator: '../../images/users/user3.png',
                subject: '希望能够跟学长一起学习，共同进步...',
                time: '1天前',
                type: 1,
                name: '田秀兰',
                orderType: '待审核',
                role: 't',
            },
            {
                id: 1,
                avator: '../../images/users/user4.png',
                subject: '我专科毕业后就出来工作，希望能够跟学长一起考取本科学历...',
                time: '1天前',
                type: 2,
                name: '杨庄那',
                orderType: '待审核',
                role: 't',
            },
            {
                id: 1,
                avator: '../../images/users/user5.png',
                subject: '我专科毕业后就出来工作，希望能够跟学长一起考取本科学历...',
                time: '1天前',
                type: 3,
                name: '刘言芳',
                orderType: '待审核',
                role: 't',
            },
            {
                id: 1,
                avator: '../../images/users/user2.png',
                subject: '市场营销',
                time: '1天前',
                type: 0,
                name: '王金龙',
                orderType: '待支付',
                role: 's',
            },
            {
                id: 1,
                avator: '../../images/users/user1.png',
                subject: '企业管理',
                time: '1天前',
                type: 0,
                name: '徐晓慧',
                orderType: '待审核',
                role: 's',
            },
            {
                id: 1,
                avator: '../../images/users/user6.png',
                subject: '企业管理',
                time: '1天前',
                type: 1,
                name: '卢家国',
                orderType: '待审核',
                role: 's',
            },
            {
                id: 1,
                avator: '../../images/users/user1.png',
                subject: '企业管理',
                time: '1天前',
                type: 2,
                name: '徐晓慧',
                orderType: '待审核',
                role: 's',
            },
            {
                id: 1,
                avator: '../../images/users/user2.png',
                subject: '市场营销',
                time: '1天前',
                type: 3,
                name: '王金龙',
                orderType: '待审核',
                role: 's',
            },
        ],
    },
})
