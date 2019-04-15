<template>
<div style="position: relative">
    <div class="page-title page-title-default title-size-default title-design-centered color-scheme-light  title-shop product_bg" style="margin-top: 0">
        <!--<div class="container">
            <div class="nav-shop">
                <div class="shop-title-wrapper">
                    <a href="javascript:woodmartThemeModule.backHistory()" class="woodmart-back-btn woodmart-css-tooltip woodmart-tltp">
                        <span class="woodmart-tooltip-label" style="margin-left: -67px;">Back to products</span>
                        <span>Back to products</span>
                    </a>
                    <h1 class="entry-title">{{curCateName}}</h1>
                </div>
                <div class="woodmart-show-categories">
                    <a href="#">Categories</a>
                </div>
                <ul class="woodmart-product-categories has-product-count">
                    <li class="cat-link shop-all-link">
                        <div class="category-nav-link">
                            <a href="/shop">
                                <span class="category-summary">
                                    <span class="category-name">All</span>
                                    <span class="category-products-count">
                                        <span class="cat-count-label">products</span>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </li>
                    <li class="cat-item cat-item-36 " v-for="one in categories" :key="one.name">
                        <div class="category-nav-link">
                            <router-link :to="`/product-category/${one.id}`">
                                <img :src="one.icon" alt="" class="category-icon">
                                <span class="category-summary">
                                    <span :class="['category-name', curCateName == one.name? 'active_a' : '']">{{one.name}}</span>
                                    <span class="category-products-count">
                                        <span class="cat-count-number">{{one.count || 0}}</span>
                                        <span class="cat-count-label">products</span>
                                    </span>
                                </span>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>-->
    </div>
    <div class="container">
            <div class="nav-shop">
                <!--<div class="shop-title-wrapper">-->
                    <!--<a href="javascript:woodmartThemeModule.backHistory()" class="woodmart-css-tooltip woodmart-tltp">-->
                        <!--<span class="woodmart-tooltip-label" style="margin-left: -67px;">Back to products</span>
                        <span>Back to products</span>-->
                    <!--</a>-->
                    <div class="entry-title" style="">{{curCateName}}</div>
                <!--</div>-->
                <div class="woodmart-show-categories">
                    <a href="#">Categories</a>
                </div>
                <ul class="woodmart-product-categories has-product-count" style="display: flex;align-items: center;justify-content: center">
                    <li class="cat-link shop-all-link">
                        <div class="category-nav-link">
                            <a href="/shop">
                                <span class="category-summary">
                                    <span class="category-name">All</span>
                                    <span class="category-products-count">
                                        <span class="cat-count-label">products</span>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </li>
<i class="fa fa-angle-left left" v-show="curP > 1" @click="clickLeft" style="color: #fff;cursor: pointer"></i>
                    <li class="cat-item cat-item-36 " v-for="(one, index) in categories.slice((curP-1)*8, curP*8)" :key="one.name">
                        <div class="category-nav-link">
                            <router-link :to="`/product-category/${one.id}`">
                                <div style="width: 40px;height: 40px">
                                    <img :src="one.icon" alt="" class="category-icon">
                                </div>
                                <span class="category-summary">
                                    <span :class="['category-name', curCateName == one.name? 'active_a' : '']">{{one.name}}</span>
                                </span>
                            </router-link>
                        </div>
                    </li>
<i class="fa fa-angle-right right" style="color: #fff;cursor: pointer" v-show="(parseInt(categories.length/8)+(categories.length%8? 1 : 0)) > curP" @click="clickRight"></i>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [
        // {name: '火锅专区', icon: 'http://www.jmart8.com/wp-content/uploads/2017/06/chair.svg', count: 1, id: 0},
      ],
      curP: 1
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    }),
    // 始终是一级分类name'
    curCateName() {
      let name = "";
      this.categories.map(one => {
        if (one.id == this.$route.params.id) name = one.name;
        one.sub_list.map(sone => {
          if (sone.id == this.$route.params.id) name = one.name;
        });
      });
      return name;
    }
  },
  mounted() {},
  methods: {
       clickLeft() {
           this.curP -= 1;
         
      },
      clickRight() {
        this.curP += 1;
      },
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .category-name{
        color: #fff;
    }
    .category-products-count{
          color: #fff;
    }
    .entry-title{
        font-size: 28px;
        color: #fff;
        width: 100%;
        text-align: center;
    }
    .left, .right{
        font-size: 22px;
        cursor: pointer;
    }

     .left:hover, .right:hover{
         transform: scale(1.2, 1.2)
     }
}
.page-title {
  /*background: url('/static/images/product.jpg') 100%;*/
  /*background-size: cover;*/
  /*background-position: center center;*/
}
.active_a {
  position: relative;
}
 .product_bg{
    height: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    background: url("https://jmart8.qixin.io/statics/2018/08/10/1533894119_list.jpg") 100% 100%;
} 
.active_a::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  @include set_bg_color;
}
</style>


