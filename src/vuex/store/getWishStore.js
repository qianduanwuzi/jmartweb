import * as api from '../api';
const getWishStore = {
    state:{
        wishs: {}, // wish list
    },
    //处理异步
    actions: {
        getWish({commit},p) {
            api.getWish((res) => {
                commit('SET_WISH', res)
            })
        }
    },
    mutations:{
        SET_WISH: (state, param) => {
            state.wishs = param
        }
    },
    //获取state的值
    getters: {
        getWishs: (state) => state.wishs
        // getCartsNum: (state) => state.cartsNum

    }
}

export default getWishStore