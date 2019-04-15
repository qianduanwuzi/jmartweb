import Vue from 'vue'
import Vuex from 'vuex'
import getCategoriesStore from "./store/getCategoriesStore"
import setTipStore from "./store/setTipStore"
import showCartsStore from "./store/showCartsStore"
// import getCartsNumStore from "./store/getCartsNumStore"
import getFooterStore from "./store/getFooterStore"
import getWishStore from "./store/getWishStore"
import loadingStore from "./store/loadingStore"
Vue.use(Vuex)

const store = new Vuex.Store(
  {
    modules: {
      setTipStore,
      getCategoriesStore,
      showCartsStore,
      // getCartsNumStore,
      getFooterStore,
      getWishStore,
      loadingStore
    }
  }
)

export default store