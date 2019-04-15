import * as api from '../api';
const getCategoriesStore = {
    state:{
        result: {},
    },
    //处理异步
    actions: {
        getFooter({commit},p) {
            api.getFooter((res) => {
                commit('SET_FOOTER', res)
            })
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_FOOTER: (state, param) => {
            // console.log(Object.assign(state, param))
            state.result = param
        }
    },
    //获取state的值
    getters: {
        getFooter: (state) => state.result
    }
}

export default getCategoriesStore