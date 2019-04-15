<template>
  <div id="app">
    <router-view/>
    <self-cart-dialog></self-cart-dialog>
    <self-tip></self-tip>
    <self-loading></self-loading>
  </div>
</template>

<script>
import SelfCartDialog from '@/components/cart'
import SelfTip from '@/components/tip'
import SelfLoading from '@/components/loading'
export default {
  components: {SelfCartDialog, SelfTip, SelfLoading},
  name: "App",
  data() {
    return {
      
    }
  },
  mounted() {
    if(this.$route.name) document.title = this.$route.name
  },
  watch: {
    $route: {
      deep: true,
      handler(v) {
        document.title = v.name
      }
    }
  }
};
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  /*全局样式*/
  
  html,
  body {
    font-family: lato, Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  body {
    font-size: 14px;
    color: #2d2a2a;
  }
  
  * {
    -webkit-text-size-adjust: none;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
  }
  
  a {
    text-decoration: none;
    color: #333333;
    cursor: pointer;
    letter-spacing: .2px;
  }
  
  input {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
  }
  
  @media screen and (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  
  @media screen and (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  
  @media screen and (min-width: 1200px) {
    .container {
      width: 1192px;
    }
  }
  
  .container {
    margin: auto;
  }
  
  .theme_font_color {
    color: rgb(17, 159, 60) !important;
  }
  
  .theme_bg_color {
    background-color: rgb(17, 159, 60) !important;
  }
  
  .title_tip {
    /*padding: 0 5px;*/
    width: 120px;
    position: relative;
    font-size: 26px;
    font-weight: 600;
    margin: auto;
    margin-bottom: 10px;
  }
  
  .title_tip::before {
    content: "";
    width: 30px;
    height: 2px;
    top: 50%;
    left: -40px;
    position: absolute;
    background-color: #2d2a2a;
  }
  
  .title_tip::after {
    content: "";
    width: 30px;
    height: 2px;
    top: 50%;
    right: -40px;
    position: absolute;
    background-color: #2d2a2a;
  }

  .fu_title_tip{
    text-align: center;
    margin-bottom: 30px;
  }

</style>