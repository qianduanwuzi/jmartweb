// import api from '../api';
const loadingStore = {
    state:{
        timeStamp: 0, 
        show: false,
    },
    //处理异步
    actions: {
        showLoding({commit},p) {
            // p.timeStamp = new Date().getTime();
            commit('SHOW_LOAD', {show: p, timeStamp: new Date().getTime()})
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SHOW_LOAD: (state, param) => {
            Object.assign(state, param)
        }
    },
    //获取state的值
    getters: {
        loadInfo: (state) => state
    }
}

export default loadingStore