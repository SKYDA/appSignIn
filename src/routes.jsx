import React from 'react'
import ReactDom from 'react-dom'

import { getJSON } from './common/dataService'
import global from './common/global'
import util from './common/util'
import URLS from './constants/URLS'

//main
import Main from './containers/Main'
// import MyRoom from './containers/myRoom/myRoom'
// import RoomList from './containers/roomList/roomList'
// import RoomDetail from './containers/roomDetail/RoomDetail'

import Home from './containers/home/Home'
import Result from './containers/result/Result'
import OrderDetail from './containers/orderDetail/OrderDetail'
import OrderList from './containers/orderList/OrderList'
import Auth from './containers/auth/Auth'
import BookDetail from './containers/bookDetail/BookDetail'
import StuReserve from './containers/stuReserve/StuReserve'

const routes = [{
    path: '/',
    component: Main,
    indexRoute: { component: Home },
    childRoutes: [
        {
            path: 'home',
            component: Home,
        },
        {
            path: 'detail',
            component: OrderDetail,
        },
        {
            path: 'list(/:role)',
            component: OrderList,
        },
        {
            path: 'result(/:type)',
            component: Result,
        },
        {
            path: 'auth',
            component: Auth,
        },
        {
            path: 'bookDetail/:role/:type(/:orderType)',
            component: BookDetail,
        },
        {
            path: 'reserve',
            component: StuReserve,
        },
    ]
},
]

export default routes
