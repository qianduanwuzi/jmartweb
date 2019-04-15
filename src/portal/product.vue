<template>
    <div class="whb-column whb-col-center whb-visible-lg product_box">
            <div class="in_box">
                <!-- <div class="in_box" @mouseleave="curName = ''"> -->
                <div v-for="(one, index) in menus" :key="index">
                    <div :class="['each_nav_box']" >
                        <router-link :to="one.url" class="nav_link">
                          <!-- <router-link :to="one.url" class="nav_link" @mouseenter.native="mouseHandler(one.name, index)"  > -->
                            <span :class="$route.path == one.url ? 'active' : ''">{{one.name}}</span>
                            <!-- <i class="fa fa-angle-down" style="color: rgb(51, 51, 51)"></i> -->
                        </router-link>
                        <!-- <div :class="['menu_down_list', curName == one.name? 'animate' : '']"  v-show="one.name == curName" style="left:0" @mouseenter="mouseHandler(one.name, index, false)"> -->
                            <!-- <div v-for="one in productList" :key="one.id">
                              {{one.name}}
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import * as utils from "@/utils";
export default {
  data() {
    return {
      menus: [
        { name: "首页", url: "/" },
        // { name: "全部产品", url: "" },
        { name: "专题", url: "/recipe" },
        { name: "商品", url: "/product-category/all"}
        // { name: "PAGES", url: "" },
        // { name: "ELEMENTS", url: "" }
      ],
      curName: "",
      productList: [

      ]
    };
  },
  methods: {
    // mouseHandler(d, i, boo = true) {
    //   this.curName = d;
    //   if (i <= 1){
    //     document.getElementsByClassName("menu_down_list")[i].style.left =
    //       -utils.compuFloat(document.getElementsByClassName("nav_link")[i]) +
    //       "px";
              
    //   }
    //   else document.getElementsByClassName("menu_down_list")[i].style.left = "0px";
      // if(d == '全部产品') {
      //   if(boo) {
      //     api.get("/api/products").then(res => {
      //       this.productList = res.data.docs
      //     })
      //   }
      
      // }
    // },
 

  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.product_box {
  .in_box {
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .each_nav_box {
      position: relative;
      .nav_link {
        height: 60px;
        font-weight: 700;
        font-size: 16px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 1;
        display: flex;
        align-items: center;
      }
      .nav_link:hover {
        @include set_theme_color;
      }
      i {
        margin-left: 4px;
        font-size: 14px;
      }
      .menu_down_list {
        width: 100vw;
        padding-top: 30px;
        position: absolute;
        top: 100%;
        text-align: left;
        background-position: bottom right;
        background-repeat: no-repeat;
        background-clip: border-box;
        background-color: #fff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
        color: #777;
        transition: transform 0.2s, opacity 0.2s;
        opacity: 0;
        z-index: 380;
      }
      .animate {
        opacity: 1;
        animation: myfirst 0.3s;
      }
     @keyframes myfirst
        {
            0%   { transform: translateY(15px);}
            100% {transform: translateY(0px);}
        }
    }
    .active{
      @include set_theme_color;
    }
  }
}
</style>


