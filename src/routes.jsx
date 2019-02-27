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

const routes = [{
    path: '/',
    component: Main,
    indexRoute: { component: Home },
    childRoutes: [
        {
            path: 'home',
            component: Home
        },
        {
            path: 'result',
            component: Result
        }
    ]
},
]

export default routes
