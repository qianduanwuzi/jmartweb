
// 作废
import * as api from '../api';
const getCartsNumStore = {
    state:{
        cartsNum: 0, // 
    },
    //处理异步
    actions: {
        getCartsNum({commit},p) {
            api.getCarts((res) => {
                let num = 0;
                res.forEach(one => num = num + one.num)
                commit('SET_CART_NUM', num)
            })
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_CART_NUM: (state, param) => {
            // console.log(Object.assign(state, param))
            state.cartsNum = param
        }
    },
    //获取state的值
    getters: {
        getCartsNum: (state) => state.cartsNum
    }
}

export default getCartsNumStore