<template>
  <div class="search_box">
    <div class="container">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <img :src="baseurl+'/statics/2018/07/25/1532496567_logo.png'" alt="Jmart8" style="" v-setpre>
        </router-link>
      </div>
      <div class="input_box">
        <input  v-model="searchVal" class="input" placeholder="请输入商品进行查询" style="padding-right: 233px;">
        <div class="category_box"  @click.stop="$emit('update:showCategory', true)">
           <span class="txt_box">
                  {{curCate || '选择分类'}}
                  <i class="fa fa-angle-down"></i>
              </span>
        </div>
        <!--category options down -->
        <div class="options_box" v-show="showCategory">
          <div v-for="one in categories" :key="one.id" class="each_opt" @click="clickCate(one.name, one.id)">
            {{one.name}}
          </div>
        </div>
        <a class="search_icon_box">
          <i :class="[!showSearch && searchVal? 'fa fa-refresh refresh':'search_icon', 'com_sty']" ></i>
        </a>
        <!--list-->
        <div class="list_box" v-show="list.length">
             <div class="row" style="margin: 0">
            <router-link :to="`/product-category/detail/${one.id}`" class="col-sm-6 each_list_box" v-for="one in list.slice(0,8)" :key="one.id">
              <img :src="baseurl+one.cover">
              <!-- <img src="../assets/logo.png" :alt="one.name"> -->
              <div class="" style="margin-left: 10px">
                <div style="font-weight: 600">{{one.name}}</div>
                <div style="color: #119f3c;">
                  <span v-if="one.is_promote">$<span style="color: #777777; text-decoration: line-through">{{one.price}}</span><span> {{one.promote_price}}</span></span>
                  <span v-else style="color: #119f3c"><span>${{one.price}}</span></span>
                </div>
              </div>
            </router-link>
            </div>
          <div @click.stop="$router.push({path: `/product-category/name=${searchVal}`})"  v-show="list.length>8" class="view_more">
            查看更多
          </div>
          </div>
          <div class="list_box no_data" v-if="!list.length && showSearch">
              SORRY, NO PRODUCTS FOUND
          </div>
      </div>
      <!-- my account -->
      <personal style="padding-left: 24px"></personal>
    </div>
  </div>
</template>

<script>
import seturl from "@/mixins/setbaseurl";
import Personal from './personal'
import { mapGetters } from 'vuex'; 
import _ from 'lodash';
export default {
  mixins: [seturl],
  components: {Personal},
  props: {
    showCategory: {
      default:false,
      type: Boolean
    }
  },
  data() {
    return {
      // showCategory: false,
      showAccount: false,
      curCate: '',
      searchVal: '', // 搜索name
      cateId: '', // 搜索分类id
      list: [], // 搜索list
      showSearch: false,
    };
  },
   computed: {
        ...mapGetters({
          categories: "getCategories"
        })
      },
  mounted() {},
  methods: {
    clickCate(name, cateId) {
      this.curCate = name;
      this.cateId = cateId;
      this.$emit('update:showCategory', false)
      // this.showCategory = false;
    },
  //   changeHandler:_.debounce(function () {  
  //      if(this.searchVal == '') {
  //       this.list = [];
  //       this.showSearch = false;
  //     }else {
  //       this.showSearch = false;
  //       api.get('/api/products/',{name: this.searchVal, categoryId: this.cateId}).then(res => {
  //         this.list = res.data.docs;
  //         this.showSearch = true;
  //       })
  //     }
  // },500),
  },
  watch: {
    cateId(v) {
      if(this.searchVal) {
         this.showSearch = false;
          api.get('/api/products/',{name: this.searchVal, categoryId: this.cateId}).then(res => {
            this.list = res.data.docs;
            this.showSearch = true;
          })
        } else {
          this.list = [];
          this.showSearch = false;
        }
      },
    searchVal:_.debounce(function (v) {   
      if(v == '') {
        this.list = [];
        this.showSearch = false;
      }else {
        this.showSearch = false;
        api.get('/api/products/',{name: this.searchVal, categoryId: this.cateId}).then(res => {
          this.list = res.data.docs;
          this.showSearch = true;
        })
      }
     
    }, 500),
    $route:{
      deep: true,
      handler() {
        this.searchVal = '';
        this.list = [];
        this.curCate = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/scss/com.scss";
  //  @include set_font(14px, #333);
  //   @include view_layout;
  // @include set_bg_color
  .search_box {
    .container {
      height: 105px;
      display: flex;
      align-items: center;
      .logo {
        width: 260px;
        padding-right: 10px;
        text-align: center;
        // margin-top: 3px;
      }
      .input_box {
        padding: 0 0 0 10px;
        position: relative;
        -ms-flex: 1 1 0px;
        flex: 1 1 0;
        -webkit-box-flex: 1;
        .no_data{
          font-weight: 600;
          padding: 10px;
        }
        .list_box {
          position: absolute;
          top: 100%;
           background-color: #fff;
          width: 622px;
          border: 1px solid rgba(129, 129, 129, 0.2);
          z-index: 1;
          .each_list_box {
            background-color: #fff;
            display: flex;
            padding: 15px 5px 25px 30px;
            border-right: 1px solid rgba(129, 129, 129, 0.2);
            border-bottom: 1px solid rgba(129, 129, 129, 0.2);
            z-index: 1;
            img {
              width: 65px !important;
              height: 75px !important;
            }
          }
          .view_more {
            display: block;
            width: 100%;
            text-align: center;
            font-weight: 600;
            color: #333;
            height: 50px;
            line-height: 50px;
            @include set_font_family;
            background-color: #fff;
          }
        }
        .input {
          @include set_font_family;
          height: 46px;
          font-size: 15px;
          padding: 15px;
          width: 100%;
          max-width: 100%;
          border: 2px solid rgba(129, 129, 129, 0.2);
          background-color: transparent;
          border-radius: 0;
          box-shadow: none;
          transition: border-color 0.5s ease;
        }
        .category_box {
          @include set_font_family;
          width: 168px;
          cursor: pointer;
          position: absolute;
          top: 2px;
          right: 52px;
          border-left: 1px solid rgba(129, 129, 129, 0.2);
          border-right: 1px solid rgba(129, 129, 129, 0.2);
          height: 42px;
          line-height: 42px;
          text-transform: uppercase;
          padding: 0 15px;
          @include set_font(13px, #777);
          .txt_box {
            width: 136px;
            display: block;
            position: relative;
          }
          .txt_box i {
            /*margin-left: 4px; */
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
          }
        }
        .search_icon_box {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 46px;
          right: 2px;
          width: 50px;
          padding: 0;
          border: none;
          background-color: transparent;
          @include set_font(20px, #777);
          transition: color 0.2s ease;
          .com_sty{
            position: absolute;
            top: 30%;
            left: 35%;
            font-size: 20px;
            /*transform: translate(-50%, -50%);*/
          }
          .refresh{
            animation: wd-rotate 1s infinite linear;
          }
          .search_icon {
            top: 17%;
            /*position: absolute;
            top: 50%;
            left: 50%;
            font-size: 20px;
            transform: translate(-50%, -50%);*/
          }
          .search_icon::before {
            content: "\f125";
            font-family: woodmart-font
          }
       
        }
        .search_icon_box:hover {
          color: #3e3e3e;
        }
        .options_box {
          position: absolute;
          right: 53px;
          top: 99%;
          margin-top: 2px;
          width: 170px;
          height: auto;
          z-index: 300;
          background-color: #fff;
          -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
          .each_opt {
            @include set_font(14px, #777);
            padding-top: 8px;
            padding-bottom: 8px;
            padding-left: 18px;
            padding-right: 18px;
            line-height: 20px;
          }
          .each_opt:hover {
            cursor: pointer;
            background-color: #f9f9f9;
          }
        }
      }
      // .account_box {
      //   font-weight: 700;
      //   display: flex;
      //   padding: 0 0 0 32px;
      //   @include set_font(16px, rgb(51, 51, 51));
      //   position: relative;
      //   justify-content: end;
      //   text-transform: uppercase;
      //   height: 46px;
      //   align-items: center;
      //   .hover_sty:hover {
      //     cursor: pointer;
      //     color: rgba(51, 51, 51, 0.6);
      //   }
      //   .account_opts {
      //     position: absolute;
      //     top: 100%;
      //     left: -10px;
      //     z-index: 380;
      //     text-align: left;
      //     background-position: bottom right;
      //     background-repeat: no-repeat;
      //     background-clip: border-box;
      //     background-color: #fff;
      //     -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
      //     box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
      //     width: 165px;
      //     padding-top: 25px;
      //     padding-bottom: 10px;
      //     font-weight: 400;
      //     .each_opt {
      //       @include set_font(14px, #777);
      //       @include set_font_family;
      //       padding-top: 8px;
      //       padding-bottom: 8px;
      //       padding-left: 18px;
      //       padding-right: 18px;
      //       line-height: 20px;
      //     }
      //     .each_opt:hover {
      //       cursor: pointer;
      //       background-color: #f9f9f9;
      //     }
      //   }
      //   .badge_box {
      //     position: relative;
      //     padding: 0 0 0 10px;
      //     display: flex;
      //     i {
      //       font-size: 20px;
      //     }
      //     .badge {
      //       @include set_font(10px, #fff);
      //       position: absolute;
      //       top: -5px;
      //       left: 35px;
      //       z-index: 1;
      //       width: 15px;
      //       height: 15px;
      //       line-height: 10px;
      //       letter-spacing: 0 !important;
      //       font-weight: 400 !important;
      //       text-align: center;
      //       border-radius: 50%;
      //       background-color: #83b735;
      //     }
      //     .bag {
      //       left: 82px;
      //     }
      //     .rest_money {
      //       margin-left: 5px;
      //     }
      //   }
      // }
    }
  }
</style>