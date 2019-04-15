// import api from '../api';
const setTipStore = {
    state:{
        timeStamp: 0, 
        type: 'success',
        msg: '',
    },
    //处理异步
    actions: {
        setTip({commit},p) {
            p.timeStamp = new Date().getTime();
            commit('SET_TIP', p)
        }
    },
    //只能mutations更新state，必须同步
    mutations:{
        SET_TIP: (state, param) => {
            Object.assign(state, param)
        }
    },
    //获取state的值
    getters: {
        getTipInfo: (state) => state
    }
}

export default setTipStore