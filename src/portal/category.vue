<template>
    <div class="cate_box">
        <div class="in_box">
            <div class="menu_box" @mouseover="mouseoverHandler" @mouseout="mouseoutHandler">
                <div class="menu_in_box">
                    <div class="woodmart_burger"></div>
                    <div class="label">商品分类</div>
                    <div :class="['arrow_down', showOver? 'over' : '']"></div>
                </div> 
                  <div :class="showList? 'list_animate' : ''" v-show="showList">   
                    <!--<div :class="showList? 'list_animate' : ''" v-show="true">   -->
                    <category-list style="width: 100%"></category-list>
                </div>
            </div>
            <product style="flex: 1 1 0;padding-left: 10px"></product>
            <!-- <div class="contact">
                联系客服
            </div> -->
        </div>
    </div>
</template>

<script>
import Product from "./product";
import CategoryList from "../modules/index/categoryList";
export default {
  components: { Product, CategoryList },
  data() {
    return {
      showList: false,
      canShow: false, // 控制caterories_list显示
      showOver: false, // 控制caterories arrow翻转
    }; 
  },
  mounted() {
    // 防页面刷新
    if (this.$route.path == "/") {
      this.canShow = false;
    } else this.canShow = true;
  },
  methods: {
      mouseoverHandler() {
          this.showList = true;
          // if(this.canShow) this.showOver = true
          // else this.showOver = false
           this.showOver = true
      },
      mouseoutHandler() {
        this.showList = false;
        this.showOver = false;
      }
  },
  watch: {
    //   监听路由变化控制menu样式
    $route: {
      deep: true,
      handler(val, oldval) {
        if (val.path == "/") {
          this.canShow = false;
        } else this.canShow = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.cate_box {
  border: 1px solid rgb(232, 232, 232);
  .in_box {
    @include view_layout;
    display: flex;
    align-items: center;
    .menu_box {
      position: relative;
      width: 270px;
      @include set_bg_color;
      @include set_font(16px, #fff, 700);
      .menu_in_box {
        display: flex;
        align-items: center;
        line-height: 1;
        transition: all 0.25s ease;
        justify-content: space-between;
        padding: 10px 15px;
        height: 60px;
        .woodmart_burger {
          background-color: #fff;
          position: relative;
          width: 18px;
          height: 2px;
          margin: 6px 10px 6px 0;
        }
        .woodmart_burger::before {
          position: absolute;
          content: "";
          left: 0;
          top: -6px;
          display: inline-block;
          width: 18px;
          height: 2px;
          transition: all 0.25s ease;
          background-color: #fff;
        }
        .woodmart_burger::after {
          position: absolute;
          content: "";
          left: 0;
          top: 6px;
          display: inline-block;
          width: 18px;
          height: 2px;
          transition: all 0.25s ease;
          background-color: #fff;
        }
        .label {
          flex: 1 1 auto;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-right: 10px;
        }
        .arrow_down{
            transition: transform .5s;
        }
        .arrow_down::before {
          content: "\f107";
          font-family: FontAwesome;
        }
        .over{
         transform: rotate(180deg);
        }
      }
       
      .list_animate {
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 100;
        background: #fff;
        width: 270px;
      }
    }
    .contact {
      @include set_font(16px, #83b735, 700);
    }
  }
}
</style>


