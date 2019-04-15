import * as api from '../api';
const getCategoriesStore = {
    state:{
        cate_arr: [],
    },
    //处理异步
    actions: {
        getCate({commit},p) {
            api.getCategories((res) => {
                commit('SET_CATE', res)
            })
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_CATE: (state, param) => {
            // console.log(Object.assign(state, param))
            state.cate_arr = param
        }
    },
    //获取state的值
    getters: {
        getCategories: (state) => state.cate_arr
    }
}

export default getCategoriesStore