<template>
<div class="cate_list_box"  @mouseleave="mouseLeaveHandler">
    <div v-for="one in categories" :key="one.name" :to="`/product-category/${one.id}`" 
                :class="['each_box', showLvTwo && curName==one.name? 'each_box_hover':'']"
                @click="clickFirstHandler(one)"
                @mouseenter="mouseEnterHandler(one)" 
                :style="{
                          height: 495/categories.length + (495%categories.length/categories.length) + 'px'
                }">
                <div>
                  <img :src="one.icon" alt="">
                  <div class="first_name">{{one.name || ''}}</div>
                </div>
                <i class="fa fa-chevron-right arrow_right" v-show="one.sub_list.length"></i>
       
    </div>
     <!-- 二级分类 -->
    <div class="second_list_box" v-show="showLvTwo">
          <div v-for="one in second_child_list" :key="one.name" class="each_second_box" @click="$router.push({path:'/product-category/'+one.id})"
          :style="{
                    height: '45px',
                    'line-height': '45px'
                }"
          >
            <img :src="one.icon" alt="">
            <div class="second_name">{{one.name}}</div>
        </div>
        <!-- <div class="each_second_box" v-show="curName && !second_child_list.length" style="height: 495px;line-height: 495px;color: #333;padding-left:0;text-align:center">
            SORRY, NO CHILDREN FOUND
        </div> -->
    </div>
</div>
    
</template>

<script>
import category from "@/mixins/category";
export default {
  mixins: [category],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>


<style lang="scss" scoped>
@import "@/scss/com.scss";
.cate_list_box {
  border-left: 1px solid rgba(129, 129, 129, 0.2);
  position: relative;
  height: 495px;
  .each_box {
    cursor: pointer;
    background-color: #fff;
    border-right: 1px solid rgba(129, 129, 129, 0.2);
    width: 100%;
    border-bottom: 1px solid rgba(129, 129, 129, 0.15);
    padding: 0px 18px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include set_font(14px, #333, 700);
    .arrow_right {
      color: rgb(119, 119, 119);
    }
    img {
      width: 18px;
      margin-right: 7px;
      display: inline-block;
    }
    .first_name {
      display: inline-block;
      font-size: 16px;
    }
  }
  .second_list_box {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: #fff;
    width: 270px;
    .each_second_box:first-child {
      border-top: 1px solid rgba(129, 129, 129, 0.15);
    }
    .each_second_box:last-child {
      // border-bottom: none;
    }
    .each_second_box:hover {
      background-color: #f9f9f9;
    }
    .each_second_box {
      cursor: pointer;
      line-height: 35px;
      padding-left: 60px;
      border-right: 1px solid rgba(129, 129, 129, 0.15);
      border-bottom: 1px solid rgba(129, 129, 129, 0.15);
      img {
        width: 18px;
        margin-right: 7px;
        display: inline-block;
      }
      .second_name {
        display: inline-block;
        opacity: 0.7;
        color: #333;
        font-size: 14px;
      }
    }
  }
  .each_box_hover {
    background-color: #f9f9f9;
    color: #494949;
  }
  .each_box:hover {
    background-color: #f9f9f9;
    color: #494949;
  }
}
</style>


