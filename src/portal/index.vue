<template>
    <div class="website-wrapper" @click.self="show = false">
        <headers ></headers>
        <router-view></router-view>
        <footers></footers>
        <!-- 悬浮菜单 -->
        <sus-nav :show.sync="showSus"></sus-nav>
        <!-- back to top -->
        <a :class="['scrollToTop',  showSus? 'button-show' : '']" @click="scrollTop">Scroll To Top</a>
    </div> 
</template>

<script>
import Footers from "./footer";
import Headers from "./header";
import SusNav from "./susNav";
export default {
  components: { Footers, Headers, SusNav },
  data() {
    return {
      showSus: false,
      show: false, // 修改cate drown
    };
  },
  mounted() {
    // 监听滚动
    window.addEventListener("scroll", this.handleScroll);
    // 收藏
    this.$store.dispatch("getWish");
    // 分类
    this.$store.dispatch("getCate");
    // footer(由于合作商在footer接口里，考虑需抽公用模块)
    this.$store.dispatch("getFooter");
  },
  methods: {
    handleScroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 200) {
        this.showSus = true;
      } else {
        this.showSus = false;
      }
    },
    scrollTop() {
      var scrollToptimer = setInterval(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;
        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed;
        } else {
          document.documentElement.scrollTop -= speed;
        }
        if (top <= 0) {
          clearInterval(scrollToptimer);
        }
      }, 30);
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
</style>

