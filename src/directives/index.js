import Vue from "vue";
Vue.directive("focus", {
  // 当vnode全部更新后调用
  componentUpdated: function(el) {
    // 聚焦元素
    el.getElementsByClassName("el-input__inner")[0].focus();
  }
});

//--设置背景颜色
Vue.directive("setfm", {
  bind: function(el, binding, vnode) {
    el.style.fontFamily = 'ArialMT';
  }
});

//--设置img 前缀
Vue.directive("setpre", {
  bind: function(el, binding, vnode) {
    // console.log('binding', el.src)
    el.src = 'https://storage.googleapis.com/jmart8-prod.qixin.io/statics'+el.src.split('statics')[1]
  }
});

