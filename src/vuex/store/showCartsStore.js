import * as api from '../api';
const showCartStore = {
    state:{
        carts: [], // cart list
        cartsNum: 0, // icon显示数量
        show: false, // 控制弹出购物车侧边弹框
    },
    //处理异步
    actions: {
        getCart({commit},p = {show: true}) {
            if('show' in p) {
                api.getCarts((res) => {
                    let num = 0;
                    res.forEach(one => num = num + one.num)
                    commit('SET_CART', {num: num,res: res,p })
                    // commit('SET_CART', {res, p})
                })
            }else { // logout设置
                commit('SET_CART', {num: 0,res: [],p:{show: false}} )
            }
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_CART: (state, param) => {
            // console.log(Object.assign(state, param))
            state.carts = param.res
            state.cartsNum = param.num
            state.show = param.p.show
        }
    },
    //获取state的值
    getters: {
        getCarts: (state) => state,
        // getCartsNum: (state) => state.cartsNum

    }
}

export default showCartStore