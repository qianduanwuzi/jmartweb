<template>
    <div class="product_list_box" style="margin-top: -1px">
        <header-nav></header-nav>
        <div class="product_list_in_box row">
          
            <div v-show='false' id="woocommerce_product_categories-1" class="woodmart-widget widget sidebar-widget woocommerce widget_product_categories col-sm-3 col-sm-pull-9"  @mouseleave="curName = ''">
                <h5 class="widget-title theme_bg_color">Categories</h5>
                <!-- current-cat -->
                <div :style="{width: '768px', height: 36*categories.length+'px'}">
                   <div class="left_cate_box">
                   <ul class="product-categories" ref="cate_box">
                      <li :class="['cat-item', 'cate_item', curName == one.name? 'active_item':'']" v-for="one in categories" :key="one.name" 
                          @click="clickFirstHandler(one)"
                          @mouseenter="mouseEnterHandler(one)" 
                          >
                          <span class="cate_name">
                            <div style="width:20px;margin-right: 10px;display:inline-block">
                              <img :src="one.icon" alt="" >
                            </div>
                            {{one.name}}</span>
                          <i class="fa fa-chevron-right arrow_right" v-show="one.sub_list.length"></i>
                          <div class="clear"></div>
                      </li>
                  </ul>
                  <div class="second_list_box row" v-show="showLvTwo" :style="{height: 36*categories.length+'px', marginLeft: 0}" @mouseover.self="showLvTwo = true" @mouseout.self="showLvTwo = false">
                          <i class="fa fa-angle-left left" v-show="curP > 1" @click="clickLeft"></i>
                          <!--<i class="fa fa-angle-left left"  @click="clickLeft"></i>-->
                        <div v-for="sone in second_child_list.slice((curP-1)*6, curP*6)" :key="sone.name"  class="each_second_box col-sm-4" @mouseover.self="showLvTwo = true" @click.stop="clickChild(sone.id)">
                            <div class="second_name col-sm-12" @mouseover.self="showLvTwo = true" style="border-bottom: 1px solid #e8e8e8">
                              <div><img :src="sone.icon" alt=""  @mouseover.self="showLvTwo = true" class="sec_cate_img"></div>
                              <div style="text-align:center">{{sone.name}}</div>
                            </div>
                        </div>
                         <!--<i class="fa fa-angle-right right" @click="clickRight"></i>-->
                        <i class="fa fa-angle-right right" v-show="(parseInt(second_child_list.length/6)+(second_child_list.length%6? 1 : 0)) > curP" @click="clickRight"></i>
                    </div>
                  </div>
                </div>
              </div>
            <div class="right_list_box col-sm-12 col-sm-push-3 ">
                <div class="header">
                     <div class="bread">
                        <!--<router-link to="/">首页 / </router-link> <span style="color: #333; font-weight: 700"> {{curCateName}}</span>-->
                    </div>
                    <div class="tools">
                        <div class="per_page_box">
                            Show : <span :class="['num', params.size == 9? 'active_num' : '']" @click="params.size = 9">9  </span> <span class="num">/</span>
                            <span :class="['num', params.size == 24? 'active_num' : '']" @click="params.size = 24">24  </span> <span class="num">/</span>
                              <span :class="['num', params.size == 36? 'active_num' : '']" @click="params.size = 36">36  </span> 
                        </div>
                        <div class="woodmart-products-shop-view products-view-grid">
                          <a rel="nofollow"  class="per-row-2 shop-view current-variation" :style="{opacity: divide == 2? '.7' : '.3', cursor: 'pointer'}" @click="clickDivide(2)">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">
                              <path d="M7,2v5H2V2H7 M9,0H0v9h9V0L9,0z"></path>
                              <path d="M17,2v5h-5V2H17 M19,0h-9v9h9V0L19,0z"></path>
                              <path d="M7,12v5H2v-5H7 M9,10H0v9h9V10L9,10z"></path>
                              <path d="M17,12v5h-5v-5H17 M19,10h-9v9h9V10L19,10z"></path>
                            </svg>
                          </a>
                          <a rel="nofollow"  class="per-row-3 shop-view " @click="clickDivide(3)" :style="{opacity: divide == 3? '.7' : '.3'}">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">
                                <rect width="5" height="5"></rect>
                                <rect x="7" width="5" height="5"></rect>
                                <rect x="14" width="5" height="5"></rect>
                                <rect y="7" width="5" height="5"></rect>
                                <rect x="7" y="7" width="5" height="5"></rect>
                                <rect x="14" y="7" width="5" height="5"></rect>
                                <rect y="14" width="5" height="5"></rect>
                                <rect x="7" y="14" width="5" height="5"></rect>
                                <rect x="14" y="14" width="5" height="5"></rect>
                                </svg>
                            </a>
                            <a rel="nofollow"  class="per-row-4 shop-view " @click="clickDivide(4)" :style="{opacity: divide == 4? '.7' : '.3'}">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">
                                    <rect width="4" height="4"></rect>
                                    <rect x="5" width="4" height="4"></rect>
                                    <rect x="10" width="4" height="4"></rect>
                                    <rect x="15" width="4" height="4"></rect>
                                    <rect y="5" width="4" height="4"></rect>
                                    <rect x="5" y="5" width="4" height="4"></rect>
                                    <rect x="10" y="5" width="4" height="4"></rect>
                                    <rect x="15" y="5" width="4" height="4"></rect>
                                    <rect y="15" width="4" height="4"></rect>
                                    <rect x="5" y="15" width="4" height="4"></rect>
                                    <rect x="10" y="15" width="4" height="4"></rect>
                                    <rect x="15" y="15" width="4" height="4"></rect>
                                    <rect y="10" width="4" height="4"></rect>
                                    <rect x="5" y="10" width="4" height="4"></rect>
                                    <rect x="10" y="10" width="4" height="4"></rect>
                                    <rect x="15" y="10" width="4" height="4"></rect>
                                </svg>
                            </a>
                        </div>
                        <!-- <div class="sort_box">
                            <div @click="showOpt = !showOpt">{{curSortName}}<i class="fa fa-angle-down" style="margin-left: 5px"></i></div> 
                            <div class="opt_box" v-show="showOpt">
                                <div v-for="one in options" :key="one.value" @click="clickSortHandler(one)" class="each_opt">
                                    {{one.label}}
                                </div> 
                            </div>  
                        </div>  -->
                    </div>
                </div>
                <div class="list_box" >
                    <!-- {{list}} -->
                    <div class="products elements-grid woodmart-products-holder  woodmart-spacing-30 products-spacing-30 pagination-pagination row grid-columns-2" data-source="main_loop" data-min_price="" data-max_price="">				
						          <div :class="['product-grid-item', 'product', 'without-stars', 'product-no-swatches', 'quick-shop-on', 'quick-view-on', 'woodmart-hover-base',  
                       'first',  'post-51', 'type-product', 'status-publish', 'has-post-thumbnail', 'product_cat-hot-pot', 'first', 'instock', 'shipping-taxable', 'purchasable', 'product-type-simple', 'hover-width-big', 'hover-ready',
                       divide == 2? 'col-xs-6 col-sm-6 col-md-6' : divide == 3? 'col-xs-4 col-sm-4 col-md-4' : 'col-xs-3 col-sm-3 col-md-3']" 
                      data-loop="1" data-id="51"
                      v-for="one in list" :key="one.id"
                      >
                        <div class="content-product-imagin" style="margin-bottom: -150px;"></div>
                        <div class="product-element-top">
                          <router-link :to="`/product-category/detail/${one.id}`" class="product-image-link">
                            <img width="525" height="600" :src="one.cover" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="">	
                          </router-link>
                          <div class="wrapp-swatches"></div>
                          <div class="quick-shop-wrapper">
                            <div class="quick-shop-close"><span>Close</span></div>
                            <div class="quick-shop-form"></div>
                          </div>
                        </div>
                        <div class="product-information">
	                        <h3 class="product-title">
                            <router-link :to="`/product-category/detail/${one.id}`">{{one.name}}</router-link>
                          </h3>		
                          <div class="product-rating-price">
                            <div class="wrapp-product-price">
                              <span class="price">
                                <span class="woocommerce-Price-amount amount" style="color: rgb(17, 159, 60)">
                                  <!-- <span class="woocommerce-Price-currencySymbol">$</span>
                                  <span v-show="one.is_promote">{{one.promote_price}} - </span>{{one.price}} -->
                                  <span v-if="one.is_promote">$<span style="color: #777777; text-decoration: line-through">{{one.price}}</span><span> {{one.promote_price}}</span></span>   
                                  <span v-else><span>${{one.price}}</span></span>

                                </span>
                              </span>
		                        </div>
	                        </div>
                          <div class="fade-in-block">
                            <div class="hover-content" style="height: 110px;">
                              <div class="hover-content-inner">
                                <!-- 介绍 description -->
                                {{one.description}}
                              </div>
                            </div>
                            <div class="woodmart-buttons">
                              <div class="wrap-wishlist-button">
                                  <!--<div v-if="$route.params.id != 'wish'">
                                    <i style="font-size: 20px;cursor: pointer" class="fa fa-heart-o icon" v-show="one && !one.is_like" @click.stop="addWish(one, true)"></i>
                                    <i style="font-size: 20px;cursor: pointer" class="fa fa-heart icon theme_font_color" v-show="one && one.is_like" @click.stop="addWish(one, false)"></i>
                                  </div>-->
                                  <!--wish-->
                                  <!--<div v-else>
                                     <i style="font-size: 20px;cursor: pointer" class="fa fa-heart icon theme_font_color" @click.stop="cancelWish(one)"></i>
                                  </div>-->
                                <div class="clear"></div>
                              </div>
                              <div class="woodmart-add-btn">
                                <a @click="addToCart(one)" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart add-to-cart-loop" data-product_id="51" data-product_sku="" aria-label="添加“活冻泰国黑虎虾 400g 16-20只/盒 原装进口” 到您的购物车" rel="nofollow">
                                  <span>加入购物车</span>
                                </a>
                              </div>
                                <div class="wrap-quickview-button">			
                                  <div class="quick-view">
                                    <!--<a href="/product/" class="open-quick-view" data-id="51" data-original-title="" title="">
                                      Quick View
                                    </a>-->
                                  </div>
                                </div>
		                        </div>
			                    </div>
                        </div>
	                    </div>
                    </div>
      <!--  -->
                </div>
                <!-- page -->
                  <self-page v-if="total" :total="total" class="rs_page_box" :size="params.size" @pageChange="val => params.page = val"></self-page>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderNav from "./headerNav";
import category from "@/mixins/category";
export default {
  mixins: [category],
  components: { HeaderNav },
  data() {
    return {
      list: [],
      divide: 3, // 控制list布局
      params: {
        // sort: 0, // ？？？隐藏
        size: 9, // 默认一页显示9
        page: 1, // 默认第一页
      },
      options: [
        { label: "按受关注度排序", value: 0 },
        { label: "按好评度排序", value: 1 },
        { label: "按更新时间排序", value: 2 },
        { label: "按价格从低到高", value: 3 },
        { label: "按价格从高到低", value: 4 }
      ],
      curSortName: "按受关注度排序",
      showOpt: false, // sort options
      total: 0,
      curCateName: '', // header img 显示分类名称
      cateHeight: 0, // 高度
      curP: 1,
    };
  },
  computed: {},
  mounted() {
    this.getList();
    // this.$nextTick(() => {
      // console.log(this.$refs['cate_box'].offsetHeight)
      // this.cateHeight = this.$refs['cate_box'].offsetHeight
    // }, 1000)
  },
  methods: {
     clickLeft() {
           this.curP -= 1;
          //  this.$nextTick(() => {
          //      this.clickNav(this.allCate.slice((this.curP-1)*12, (this.curP-1)*12+1)[0])
          //  })
      },
      clickRight() {
        this.curP += 1;
        // this.$nextTick(() => {
        //        this.clickNav(this.allCate.slice((this.curP-1)*12, (this.curP-1)*12+1)[0])
        //    })
      },
    clickChild(pa) {
      this.$router.push({path: '/product-category/'+pa})
      this.showLvTwo = false
    },
    //产品list
    getList(params = Object.assign({}, this.params)) {
      this.$store.dispatch('showLoding', true)
      let id = this.$route.params.id;
      let newP = {};
      if(id.indexOf('=')>=0) { // 首页查询商品>8 view more
        params.name = id.split('=')[1]
        newP = Object.assign({}, params)
        this.curCateName = '?='+params.name
        document.title = params.name+ '?-Jmart8'
      } else if(id == 'all') { // 所有商品页
         params.name = ''
         newP = Object.assign({}, params)
         this.curCateName = 'shop'
         document.title = '商品-Jmart8'
      }else if(id == 'wish'){
        this.curCateName = 'wish'
         document.title = '收藏-Jmart8'
        api.get('/api/my-collections').then(res => {
          this.list = res.data.docs;
          this.total = res.data.count
        })
        return 
      }else newP = Object.assign({ categoryId: this.$route.params.id }, params)
      document.title = '商品-Jmart8'
      api
        .get("/api/products", newP)
        .then(res => {
             this.$store.dispatch('showLoding', false)
          this.list = res.data.docs;
          this.total = res.data.count
          // this.total = parseInt(res.data.count / params.size) + (res.data.count % params.size ? 1 : 0)
        })
    },
    clickSortHandler(d) {
      this.curSortName = d.label;
      this.params.sort = d.value;
    },
    clickDivide(i) {
      this.divide = i;
      // 重新get list

    },
    // 加入购物车
    addToCart(d) {
      this.$store.dispatch('showLoding', true)
      api.post('/api/carts', {product_id: d.id, num: 1}).then(res => {
        console.log('288', res)
        if(res.code == 200 || res.data.code == 200) {
          this.$store.dispatch("getCart");
        }
        this.$store.dispatch('showLoding', false)
      })
    },
    addWish(d, b) {
      this.$store.dispatch('showLoding', true)
      if(b){ // 收藏
         api.post('/api/my-collections', {id: d.id,product_id: d.id}).then(res => {
           this.$store.dispatch('showLoding', false)
            this.$store.dispatch("setTip", {type: 'success', msg: '收藏成功'})
            this.$store.dispatch('getWish')
            this.getList()
        })
      } else { // 取消收藏
         api.delete('/api/my-collections/'+d.product_id).then(res => {
           this.$store.dispatch('showLoding', false)
          this.$store.dispatch("setTip", {type: 'success', msg: '收藏取消成功'})
          this.getList()
          this.$store.dispatch('getWish')
        })
      }
       
    },
    cancelWish(d) {
      api.delete('/api/my-collections/'+d.product_id).then(res => {
        this.$store.dispatch("setTip", {type: 'success', msg: '收藏取消成功'})
         api.get('/api/my-collections').then(res => {
          this.list = res.data.docs;
          this.total = res.data.count
        })
        this.$store.dispatch('getWish')
      })
    
    }
  },
  watch: {
    "$route.params.id"(t) {
      this.getList();
      // this.getCurCateName()
    },
    params: {
      deep: true,
      handler(val) {
        this.getList(val)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.product_list_box {
  .product_list_in_box {
    @include view_layout;
    .widget-title{
        color: #fff;
        line-height: 33px;
        padding-left: 10px; 
        margin-bottom: 0px;
    }
    .cate_name {
      cursor: pointer;
      padding: 8px 25px 8px 0;
      line-height: 1.4;
      @include set_font(14px, #727272, 400);
    }
    .left_cate_box{
      position: relative;
      width: 268px;
      .cate_item{
        line-height: 35px;
        border: 1px solid #e8e8e8;
        border-top: none;
        padding-left: 20px;
        cursor: pointer;
        .arrow_right{
           color: rgb(119, 119, 119);
           float: right;
           margin-right: 10px;
           margin-top: 10px;
        }
      }
      .active_item{
        border-right: 1px solid #fff;
      }
      .second_list_box{
        position: absolute;
        left: 100%;
        top: 0;
        box-shadow: 4px 0 8px rgba(0,0,0,.2);
        width: 500px;
        z-index: 1000;
        background: #fff;
        padding: 30px 30px 0 56px;
        .left{
              position: absolute;
              top: 50%;
              font-size: 30px;
              left: 35px;
              cursor: pointer;
              color: rgb(232, 232, 232);
        }
        .right{
              position: absolute;
              top: 50%;
              font-size: 30px;
              left: 465px;
              cursor: pointer;
               color: rgb(232, 232, 232);
        }
        .left:hover, .right:hover{
          color: #000;
           transform: scale(1.1, 1.1)
        }
        .each_second_box{
          line-height: 30px;
          height: 30px ;
          .second_name{
            cursor: pointer;
            z-index: 10000000;
            .sec_cate_img{
               transition: all .2s
            }
          }
          .second_name:hover{
            border-color: #333 !important; 
          }
          .second_name:hover  .sec_cate_img{
            transform: scale(1.2, 1.2)
          }
        }
      } 
    }
    .second_list_box {
      /*cursor: pointer;
      padding-left: 30px;
      @include set_font(12px, #727272, 400);*/
    }
    .each_second_box {
      margin-top: 25px;
      z-index: 1000;
    }
    .cate_item:hover .cate_name,.cate_item:hover .arrow_right,.each_second_box:hover {
      color: #333;
      font-weight: 700;
    }
    .right_list_box {
      padding-bottom: 110px;
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        @include set_font_family;
        .tools {
          color: #2d2a2a;
          font-weight: 600;
          display: flex;
          .per_page_box {
            margin-right: 23px;
            .num {
              color: #8e8e8e;
              font-weight: 400;
              cursor: pointer;
            }
            .active_num{
              font-weight: 600;
              font-size: 16px;
              color: #333;
            }
          }
        }
        .sort_box {
          position: relative;
          border-bottom: 2px solid rgba(129, 129, 129, 0.2);
          height: 25px;
          width: 114px;
          .opt_box {
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            border: 1px solid rgba(129, 129, 129, 0.2);
            font-weight: 400;
            z-index: 100;
            .each_opt {
            }
            .each_opt:hover {
              cursor: pointer;
              background-color: rgba(129, 129, 129, 0.2);
            }
          }
        }
      }
      .rs_page_box{
        display: flex;
        justify-content: center;
        margin-top: 30px 
      }
    }
  }
}
</style>


