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
}, {
    amount: 1000,
})
