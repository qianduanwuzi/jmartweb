<template>
  <div>
    <div class="product_detail_box PC">
      <div class="in_box row">
        <div class="col-sm-6 left">
          <div class="img_box" style="width: 577px;height: 659px;overflow: hidden;border: 1px solid #f4f4f4;position: relative">
            <img :src="detailData.cover" class="img" @mousemove="event => imgMouseOver(event)" @mouseleave="imgMouseOut()">
            <!-- <img class="img" src="../../assets/logo.png" alt="" @mousemove="event => imgMouseOver(event)" @mouseleave="imgMouseOut()"> -->
          </div>

        </div>
        <div class="col-sm-6 right">
          <div class="header">
            <div class="bread">
              <!--<router-link to="/" class="nav">首页 </router-link>
                        <router-link :to="`/product-category/${curCateId}`" class="nav">/ {{curCateName}} /</router-link>
                        <span class="cur_product_name">{{detailData.name}}</span>-->
            </div>
            <!--<div class="tool">
               <span class="pre_product" @mouseover="showPre = true" @mouseout="showPre = false"></span> 
              <span class="woodmart-tltp" v-show="showTip" style="position: inherit">
                <span class="woodmart-tooltip-label" style="opacity: 1;visibility: inherit;left: -55px;top: -45px;">Back to products</span>
              </span>
              <span class="back_to_caterory" @click="$router.push({path: '/product-category/'+detailData.id})" @mouseover="showTip = true" @mouseout="showTip = false"></span>
               <div class="pre_pro" v-show="showPre">
                             <img src="" alt="">
                             <div class="pre_pro_detail">
                                 <div class="title">title</div>
                                 <div>price</div>
                             </div>
                        </div> 
            </div>-->
          </div>
          <div class="instruction_box">
            <div class="title">
              {{detailData.name}}
            </div>
            <p class="price">
              <span v-if="detailData.is_promote">$
                <span style="color: #777777; text-decoration: line-through">{{detailData.price}}</span>
                <span> {{detailData.promote_price}}</span>
              </span>
              <span v-else style="color: #119f3c">
                <span>${{detailData.price}}</span>
              </span>
            </p>
            <div class="instruc_content">
              {{detailData.description}}
            </div>
          </div>
          <div class="operator_box">
            <div class="quantity">
              <input type="button" value="-" class="minus re_hover" @click="reduceNum">
              <label class="screen-reader-text" for="quantity_num">数量</label>
              <input type="number" class="input-text qty text" v-model="num">
              <input type="button" value="+" class="plus re_hover" @click="num = num + 1">
            </div>
            <button type="button" class="btn btn-success btn_cart" @click="addCart(detailData.id)">加入购物车</button>
          </div>
          <div class="wishlist" @click="addWish(detailData.is_like)">
            <i class="fa fa-star-o icon" v-show="detailData && !detailData.is_like"></i>
            <i class="fa fa-star icon theme_font_color" v-show="detailData && detailData.is_like"></i>
            <div style="font-size: 12px;color: rgba(122, 122, 122, 0.8);margin-left: 3px">{{detailData && detailData.is_like? '已收藏' : '收藏'}}</div>
            <!-- <span class="heart_icon"></span> -->
            <!-- <span class="txt">Add to Wishlist</span> -->
          </div>
          <div class="right_bottom_box">
            <div class="cate_box">
              <label for="">分类：{{detailData.category_name}}</label>
              <router-link :to="`/product-category/${curCateId}`" class="nav">{{curCateName}} </router-link>
            </div>
            <div class="product_share">
              <label>Share：</label>
            </div>
          </div>

          <!-- <div class="product-share">
					<span class="share-title">Share</span>
			            <div class="woodmart-social-icons text-center icons-design-default icons-size-small color-scheme-dark social-share social-form-circle">
							<div class="woodmart-social-icon social-facebook">
                                <a href="https://www.facebook.com/sharer/sharer.php?u=/product/eames-plastic-side-chair" target="_blank" class="">
                                    <i class="fa fa-facebook"></i>
                                    <span class="woodmart-social-icon-name">Facebook</span>
                                </a>
					        </div>
				
									<div class="woodmart-social-icon social-twitter">
						<a href="http://twitter.com/share?url=/product/eames-plastic-side-chair" target="_blank" class="">
							<i class="fa fa-twitter"></i>
							<span class="woodmart-social-icon-name">Twitter</span>
						</a>
					</div>
				
									<div class="woodmart-social-icon social-google">
						<a href="http://plus.google.com/share?url=/product/eames-plastic-side-chair" target="_blank" class="">
							<i class="fa fa-google-plus"></i>
							<span class="woodmart-social-icon-name">Google</span>
						</a>
					</div>
				
									<div class="woodmart-social-icon social-email">
						<a href="mailto:?subject=Check this /product/eames-plastic-side-chair" target="_blank" class="">
							<i class="fa fa-envelope"></i>
							<span class="woodmart-social-icon-name">Email</span>
						</a>
					</div>
				
				
				
									<div class="woodmart-social-icon social-pinterest">
						<a href="http://pinterest.com/pin/create/button/?url=/product/eames-plastic-side-chair&amp;media=/wp-content/uploads/2017/06/wood-product-paceholder.jpg" target="_blank" class="">
							<i class="fa fa-pinterest"></i>
							<span class="woodmart-social-icon-name">Pinterest</span>
						</a>
					</div>
			</div> -->

        </div>

        <div class="detail_box">
          <div class="tab_box">
            <div :class="[showDetail? 'active' : '']" @click="showDetail = true">商品详情</div>
            <div :class="[!showDetail? 'active' : '']" @click="showDetail = false">累计评价({{comment.count}})</div>
          </div>
          <div v-show="showDetail" class="detail_in_box">
            <div v-html="detailData.detail" style="text-align: center"></div>
          </div>
          <div v-show="!showDetail" class="detail_in_box">
            <div v-if="comment.docs && comment.docs.length">
              <div v-for="(one, index) in comment.docs" :key="one.id" class="row each_comment_box">
                <div class="col-sm-9">
                  <div style="margin-bottom: 10px">{{one.content}}</div>
                  <div v-for="one in one.media_list" :key="one" @click="clickPcComImg(one, index)" :class="['pc_com_img_box',curPcImg == one? 'active_img_box':'' ]">
                    <!-- <img class="com_img" :src="one" alt=""   style="cursor: pointer"> -->
                     <img class="com_img" :src="one" alt=""   style="cursor: pointer">
                  </div>
                  <div class="img_big_box" v-show="showPcImg && curIndex == index">
                    <div class="ope_icon_box">
                      <div class="pick_up_box" @click="pickHandler">
                        <i class="fa fa-level-up pick_up"></i><span>收起</span>  
                      </div>
                    </div>  
                    <!-- <img :src="curPcImg" alt=""> -->
                     <img :src="curPcImg" alt="">
                  </div>
                </div>
                <div class="col-sm-2">
                  {{moment(one.created_at).format('YYYY-MM-DD')}}
                </div>
                <div class="col-sm-1">
                  {{secret(one.username || '')}}
                </div>
              </div>
              <self-page v-if="comment.count" :total="comment.count" class="rs_page_box" @pageChange="val => getComment(val)"></self-page>
            </div>
            <div v-else>
              暂无评论
            </div>

          </div>
        </div>

      </div>
    </div>
    <div class="MB">
      <div class="header_box">
        <div class="img_box">
          <img :src="detailData.cover" alt="" class="img">
          <!-- <img src="../../assets/logo.png" alt="" class="img"> -->
        </div>
        <div class="des">
          <div class="row1">
            <div class="name">{{detailData.name}}</div>
            <!-- <div class="wish_box">
              <div class="heart_icon"></div>
              <div>关注</div>
            </div> -->
          </div>
          <div class="des_txt">
            {{detailData.description}}
          </div>
          <div style="color: #119f3c;font-size: 18px">
            <span v-if="detailData.is_promote">$
              <span style="color: #777777; text-decoration: line-through">{{detailData.price}}</span>
              <span> {{detailData.promote_price}}</span>
            </span>
            <span v-else style="color: #119f3c">
              <span>${{detailData.price}}</span>
            </span>
          </div>
          <div style="display: flex;align-items: center;margin-top: 2px">
            <div>数量</div>
            <div class="quantity">
              <input type="button" value="-" class="minus re_hover" @click="mReduce">
              <label for="quantity_num" class="screen-reader-text">数量</label>
              <input type="number" class="input-text qty text" v-model="mNum">
              <input type="button" value="+" class="plus re_hover" @click="mNum = mNum+1">
            </div>
          </div>
        </div>
      </div>
      <div class="border"></div>
      <!--m 评价-->
      <div class="" style="border-bottom:1px solid rgba(122, 122, 122, .1);">
        <div class="header">
          <div>评价</div>
          <div v-show="comment.docs && comment.docs.length" @click="$router.push({path:`/product-category/detail/${$route.params.id}/more-comment`})">></div>
        </div>
        <div class="m_comment_box">
          <div v-if="comment.docs && comment.docs.length">
            <div v-for="(one, index) in comment.docs.slice(0,2)" :key="index" class="each_comment_box">
              <div class="name_data" style="display: flex;justify-content: space-between;color:#999">
                <!-- <div>{{secret(one.username)}}</div> -->
                <div>{{moment(one.created_at).format('YYYY-MM-DD')}}</div>
              </div>
              <div>
                <div style="margin-bottom: 5px">{{one.content}}</div>
                <div class="row">
                  <div class="col-2 " v-for="sone in one.media_list.slice(0,5)" :key="sone">
                    <img :src="sone" alt="" style="margin-right: 10px" @click="showComImg(one)">
                    <!-- <img :src="'https://jmart8.qixin.io'+sone" alt="" style="margin-right: 10px" @click="showComImg(one)"> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="more_comment_box">
              <div class="btn_more" @click="$router.push({path:`/product-category/detail/${$route.params.id}/more-comment`})">查看更多评价 ></div>
            </div>
          </div>
          <div v-else>
            暂无数据
          </div>
        </div>
      </div>
      <!--m 详情-->
      <div class="border"></div>
      <div class="m_detail_box">
        <div class="header">详情</div>
        <div v-html="detailData.detail" style="text-align: center;padding: 10px"></div>
      </div>
      <div class="footer_ope_box">
        <div style="text-align: center " class="shopping_cart" @click="back">
          <i class="fa fa-shopping-cart icon"></i>
          <!-- <div style="font-size: 12px;color: rgba(122, 122, 122, 0.8)">返回</div> -->
        </div>
        <div style="text-align: center;padding: 0 15px 0 10px" @click="addToWish(detailData.is_like)">
          <i class="fa fa-star-o icon" v-show="detailData && !detailData.is_like"></i>
          <i class="fa fa-star icon theme_font_color" v-show="detailData && detailData.is_like"></i>
          <div style="font-size: 12px;color: rgba(122, 122, 122, 0.8)">收藏</div>
        </div>
        <Button class="btn left_btn" style="" @click="addToCart">加入购物车</Button>
        <Button class="btn right_btn theme_bg_color" @click="quickBuy">直接购买</Button>
      </div>
      <!-- 图片遮罩 -->
       <div class="zz" v-show="showImg">
        <div class="" style="height: 10%;position: relative;padding-top: 10px">
          <i class="fa fa-close" style="color: #fff;font-size: 26px" @click="showImg = false"></i>
          <div style="position: absolute;color: #fff;top: 10px;left: 50%;transform: translateX(-50%)"> {{$refs.mySwiper && $refs.mySwiper.swiper? ($refs.mySwiper.swiper.activeIndex+1) +'/'+ curCom.media_list.length : ''}}</div> 
        </div>
        <div class="" style="height: 75%">
           <swiper :options="swiperOption" class="swiper-container" style="width: 100%" ref="mySwiper">
                <swiper-slide v-for="(slide, index) in curCom.media_list" :key="index" >
                  <img :src="slide" alt="" style="width: 100%; max-height: 75vh">
                    <!-- <img :src="slide" alt="" style="width: 100%; max-height: 80vh"> -->
                </swiper-slide>
            </swiper>
        </div>
        <div class="" style="height: 15%;color: #fff;overflow-y: auto">
          <div>{{secret(curCom.username || '')}}</div> 
          <div style="color: rgb(153, 153, 153)">{{detailData.name}}</div> 
          <div>{{curCom.content}}</div>
        </div>
      </div>
    </div>
   
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import * as utils from "@/utils";
import Store from "storejs";
import moment from "moment";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import seturl from "@/mixins/setbaseurl";
import img1 from "../../assets/logo.png"
import img2 from "../../assets/aqy.png"
export default {
  mixins: [seturl],
  components: {swiper, swiperSlide},
  data() {
    return {
      curIndex: 0,
      curPcImg: '',
      showPcImg: false, // 
      num: 1, // 数量
      detailData: {}, // 产品详情数据
      showPre: false, // pre product
      showTip: false, // back to products top tip
      curCateName: "",
      curCateId: "",
      showDetail: true,
      comment: { docs: [], count: 0 }, // 评价
      moment,
      mNum: 1, //移动端数量
      showImg: false,
      curCom:  {username: '',media_list: [] } ,
      curComImgArr: [img1,img2], // m端当前评论遮罩img arr
       swiperOption: { //轮播配置
        // effect : 'fade'
                //   pagination :{
                //     el: '.swiper-pagination',
                //     clickable :true,
                // },
              
                // autoplay: {
                //     delay: 3000,
                //     stopOnLastSlide: false,
                //     disableOnInteraction: true,
                // },
                //  navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev'
                // }
            },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "getCategories"
    }),

    //  curCateName() {
    //     // let name = '';
    //     // this.categories.map(one => {
    //     //   if(one.id == this.detailData.id) name = one.name
    //     //     one.sub_list.map(sone => {
    //     //     if(sone.id == this.detailData.id) name = sone.name
    //     //     })
    //     // })
    //     // return name
    //   }
  },
  mounted() {
    this.curCateName = Store.get("curCateName");
    this.curCateId = Store.get("curCateId");
    this.getProductDetail();
    this.getComment();
    // 处理app
    if(location.href.indexOf('token=') > 0){
      Store.set('token', location.href.split('token=')[1])
    }
  },
  methods: {
    // 收起
    pickHandler() {
      this.showPcImg = false;
      this.curIndex = '';
      this.curPcImg = '';
    },
    clickPcComImg(d, i) {
      this.showPcImg = true
      this.curIndex = i
      // this.curPcImg = 'https://jmart8.qixin.io'+d
      this.curPcImg = d
    },
    showComImg(d) {
      this.curCom = Object.assign(d)
      //遮罩 img放大展示
      this.showImg = true
    },
    // 处理名字
    secret(name) {
      if (name.length == 1) return name;
      if (name.length == 2) return name.slice(0, 1) + "*";
      // if(name.length == 3) return name.slice(0,1) + '*' + name.slice(2,3)
      if(name.length)
      return (
        name.slice(0, 1) +
        "*".repeat(name.length - 2) +
        name.slice(name.length - 1)
      );
      return ''
    },
    addWish(is_like) {
      if(is_like) {
        api.delete("/api/my-collections/"+this.$route.params.id).then(res => {
          this.$store.dispatch('setTip', { type: 'success', msg: '收藏取消成功!'})
          this.getProductDetail()
          this.$store.dispatch("getWish");
        })
      }else {
         api
        .post("/api/my-collections", {
          id: this.$route.params.id,
          product_id: this.$route.params.id
        })
        .then(res => {
          this.$store.dispatch('setTip', { type: 'success', msg: '收藏成功!'})
          this.getProductDetail()
          this.$store.dispatch("getWish");
        });
      }
     
    },
    // get 评价
    getComment(page = 1) {
      api
        .get("/api/product-comments/list", {
          page: page,
          productId: this.$route.params.id,
          size: 10
        })
        .then(res => {
          // console.log('370-------', res.data)
          this.comment = res.data;
        });
    },
    // get 产品详情
    getProductDetail() {
      // if(id)
      api.get("/api/products/" + this.$route.params.id).then(res => {
        document.title = res.data.name+'-Jmart8'
        this.detailData = Object.assign({}, res.data);
      });
    },
    //  pc 减少数量
    reduceNum() {
      if (this.num > 1) {
        this.num = this.num - 1;
      } else this.num = 1;
    },
    // m
    mReduce() {
      if (this.mNum > 1) {
        this.mNum = this.mNum - 1;
      } else this.mNum = 1;
    },
    addCart(id) {
      api.get("/api/carts/").then(res => {
        let curPro = res.data.find(one => one.product_id == id);
        if (curPro) {
          api
            .post("/api/carts/", { product_id: id, num: curPro.num + this.num })
            .then(res => {
              this.$store.dispatch("getCart");
            });
        } else {
          api
            .post("/api/carts/", { product_id: id, num: this.num })
            .then(res => {
              this.$store.dispatch("getCart");
            });
        }
      });
    },
    // 进一层封装
    compu(dir) {
      return utils.compuFloat(document.getElementsByClassName("left")[0], dir);
    },
    // 图片
    imgMouseOver(e) {
      document.getElementsByClassName("img")[0].style.transform =
        "translate(" + x * 100 + "px," + y * 100 + "px)";
      let m_left = e.clientX;
      let m_top = e.clientY;
      // 宽度临界点
      let w_b =
        (this.compu("right") - this.compu("left")) / 2 + this.compu("left");
      // 高度临界点
      let h_b =
        (this.compu("bottom") - this.compu("top")) / 2 + this.compu("top");
      var x = 0.4 - m_left / w_b;
      var y = 0.4 - m_top / h_b;
      document.getElementsByClassName("img")[0].style.transform =
        "scale(1.25, 1.25)";
      document.getElementsByClassName("img")[0].style.top = x * 100 + "px";
      document.getElementsByClassName("img")[0].style.left = y * 100 + "px";
    },
    imgMouseOut() {
      document.getElementsByClassName("img")[0].style.transform = "scale(1, 1)";
      document.getElementsByClassName("img")[0].style.top = "0px";
      document.getElementsByClassName("img")[0].style.left = "0px";
    },
    // 商品详情 m 返回
    back() {
      window.webkit.messageHandlers.webViewApp.postMessage({
        method: "gotoShopCart",
        param: {}
      });
    },
    // 商品详情 m 收藏
    addToWish(is_like) {
      if(is_like) { // 取消收藏
        //H5直接处理高亮 
        this.$store.dispatch('setTip', { type: 'm_success', msg: '取消收藏成功!'})
        setTimeout(() => {
          this.detailData.is_like = false
        }, 500)
        // 原生
         window.webkit.messageHandlers.webViewApp.postMessage({
          method: "cancelWish",
          param: { product_id: this.detailData.id, is_like: is_like }
        });
      }else { // 添加收藏
        this.$store.dispatch('setTip', { type: 'm_success', msg: '收藏成功!'})
        setTimeout(() => {
          this.detailData.is_like = true
        }, 500)
        window.webkit.messageHandlers.webViewApp.postMessage({
          method: "addToWish",
          param: { product_id: this.detailData.id }
        });
      }
    },
    // 商品详情 m 添加至购物车
    addToCart() {
      window.webkit.messageHandlers.webViewApp.postMessage({
        method: "addToCart",
        param: {
          product_id: this.detailData.id,
          num: this.mNum,
          product_name: this.detailData.name,
          cover: this.detailData.cover,
          is_promote: this.detailData.is_promote,
          promote_price: this.detailData.promote_price,
          price: this.detailData.price
        }
      });
    },
    //商品详情 m 直接购买
    quickBuy() {
      window.webkit.messageHandlers.webViewApp.postMessage({
        method: "quickBuy",
        param: {
          product_id: this.detailData.id,
          num: this.mNum,
          product_name: this.detailData.name,
          cover: this.detailData.cover,
          is_promote: this.detailData.is_promote,
          promote_price: this.detailData.promote_price,
          price: this.detailData.price
        }
      });
    }
  },
  watch: {
    showImg(v) {
      if(v) {
        document.body.addEventListener('touchmove',this.bodyScroll,{passive: false});  
        document.body.style.overflow = 'hidden'
      }else {
        document.body.removeEventListener('touchmove',this.bodyScroll,{passive: false});  
        document.body.style.overflow = 'inherit'
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/com.scss";
.MB {
  display: none;
}

.footer_ope_box {
  display: none;
  .shopping_cart {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-right: 1px solid #e1e1e1;
    i {
      font-size: 24px;
      color: rgb(17, 159, 60) !important;
    }
  }
}
.product_detail_box {
  margin: 40px auto;
  .in_box {
    @include view_layout;
    .left {
      position: relative;
      overflow: hidden;
      min-height: 700px;
      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /*height: 100%;*/
        cursor: pointer;
      }
    }
    .right {
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .bread {
          .nav {
            color: #8e8e8e;
            display: inline-block;
            margin-right: 6px;
          }
          .cur_product_name {
            color: #333;
            font-weight: 600;
          }
        }
        .tool {
          position: relative;
          .pre_pro {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1001;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
            display: flex;
            animation: slide 1s;
            padding-top: 10px;
            min-width: 240px;
            .pre_pro_detail {
              padding: 10px 15px;
              .title {
                margin-bottom: 7px;
              }
            }
          }
          @keyframes slide {
            0% {
              right: 20px;
            }
            100% {
              right: 0px;
            }
          }
          .pre_product {
            margin-right: 5px;
          }
          .pre_product::before {
            content: "\f111";
            font-family: woodmart-font;
          }
          .back_to_caterory::after {
            content: "\f11a";
            font-family: woodmart-font;
          }
          .back_to_caterory:hover,
          .pre_product:hover {
            opacity: 0.7;
            cursor: pointer;
          }
        }
      }
      .instruction_box {
        margin-bottom: 20px;
        .title {
          @include set_font(34px, #2d2a2a, 600);
          line-height: 1.2;
        }
        .price {
          @include set_font(22px, rgb(17, 159, 60), 600);
          @include set_font_family;
          line-height: 26.4px;
        }
        .instruc_content {
          @include set_font_family;
          line-height: 25.2px;
          color: rgb(119, 119, 119);
        }
      }
      .operator_box {
        .quantity {
          .re_hover:hover {
            @include set_bg_color;
          }
        }
        .btn_cart {
          margin-left: 10px;
          @include set_bg_color;
          color: #fff;
          box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 0px 0px inset;
        }
      }
      .wishlist {
        cursor: pointer;
        margin-top: 25px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        // .heart_icon::before {
        //   content: "\f108";
        //   font-family: woodmart-font;
        //   margin-right: 5px;
        // }
        .txt {
          color: #333;
          font-weight: 600;
          @include set_font_family;
        }
      }
      .right_bottom_box {
        padding-top: 20px;
        border-top: 1px solid rgba(129, 129, 129, 0.2);
        .cate_box,
        .product_share {
          display: flex;
          margin-bottom: 15px;
        }
        label {
          @include set_font_family;
          color: #333;
          font-weight: 600;
          margin-right: 10px;
        }
      }
    }
    .detail_box {
      width: 100%;
      margin: auto;
      .tab_box {
        border: 1px solid #e8e8e8;
        display: flex;
        background: #f5f5f5;
        color: rgb(166, 166, 166);
        .active {
          background: #fff;
          position: relative;
          // margin-top: -1px;
          color: #333;
        }
        .active::after {
          content: "";
          position: absolute;
          width: 100%;
          background: rgb(17, 159, 60);
          height: 4px;
          top: 100%;
          left: 0;
        }
        div {
          cursor: pointer;
          line-height: 20px;
          padding: 10px 20px;
        }
      }
      .detail_in_box {
        margin: 25px 0 100px;
        .each_comment_box {
          color: rgb(96, 96, 96);
          padding: 20px 0;
          border-bottom: 1px solid #ddd;
          .pc_com_img_box{
            display: inline-block;
            border: 2px solid #F0F0F0;
            padding: 2px;
            margin-right: 6px;
            background-color: #FFF
          }
          .active_img_box{
            position: relative;
            border-color: rgb(17, 159, 60);
          }
          .active_img_box::after{
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            content: '';
            border-top: 6px solid rgb(17, 159, 60);
            border-left: 6px solid transparent;
            border-right: 6px solid transparent
          }
          img {
            width: 90px;
            height: 90px;
          }
          .img_big_box{
            width: 300px;
            height: 400px;
            margin: 10px 0;
            border: 1px solid #DDD;
            background: #FFF;
            padding: 5px;
            overflow: hidden;
            .ope_icon_box{
              .pick_up_box{
                width: 40px;
                margin-bottom: 5px;
                .pick_up{
                  transform: rotateY(180deg)
                }
              }
              .pick_up_box:hover{
                cursor: pointer;
                color: rgb(17, 159, 60);
              }
             
            }
            img{
              height: 100%;
              width: auto
            }
          }
        }
        .rs_page_box {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
      }
      .title {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
}

@media all and(max-width: 1200px) {
  .PC {
    display: none;
  }
  .MB {
    display: block;
    .border {
      height: 10px;
      background: #e8e8ed;
    }
    .header {
      padding: 5px 10px;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(122, 122, 122, 0.4);
    }
    .m_comment_box {
      padding: 10px;
      .each_comment_box {
        padding: 5px 0;
        border-bottom: 1px solid rgba(122, 122, 122, 0.1);
      }
      .more_comment_box {
        display: flex;
        justify-content: center;
        .btn_more {
          border-radius: 6px;
          border: 1px solid rgba(122, 122, 122, 0.5);
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          font-size: 12px;
          text-align: center;
          color: #333;
          margin: 10px 0;
          position: relative;
          display: inline-block;
        }
      }
    }
    .footer_ope_box {
      display: block;
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #fff;
      padding: 5px 0;
    }
    .btn {
      width: 50%;
      color: #fff;
      font-weight: 400;
    }
    .left_half_circle {
      border-radius: 22px 0 0 22px;
    }
    .right_half_circle {
    }
    .icon {
      min-width: 30px;
      font-size: 16px;
      padding: 0 10px 0 10px;
      /*color: #fff;*/
    }
    .left_btn {
      background: rgba(17, 159, 60, 0.8);
      border-radius: 22px 0 0 22px;
      font-size: 14px;
      /*margin-right: -50px;*/
    }
    .right_btn {
      border-radius: 0px 22px 22px 0px;
      margin-right: 10px;
      font-size: 14px;
      /*border-radius: 50px;*/

      /*border-radius: 50px;*/
      /*margin-left: -50px;*/
    }
    .header_box {
      /*border-bottom:1px solid rgba(122, 122, 122, .4);*/
      .img_box {
        border-bottom: 1px solid rgba(122, 122, 122, 0.4);
        .img {
          width: 100%;
        }
      }
      .des {
        padding: 10px;
        .row1 {
          display: flex;
          justify-content: space-between;
          .name {
            padding-right: 5px;
            margin-right: 10px;
            // border-right: 1px solid rgba(122, 122, 122, 0.4);
          }
          .wish_box {
            min-width: 30px;
            text-align: center;
          }
          .heart_icon::before {
            content: "\F108";
            font-family: woodmart-font;
          }
        }
        .des_txt {
          color: rgba(122, 122, 122, 0.9);
          font-size: 12px;
          margin-top: 2px;
          margin-bottom: 2px;
        }
        .quantity {
          margin-left: 10px;
          input {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  .portal_header_box,
  .portal_footer_box,
  .sus_box,
  .single-post-navigation,
  .woodmart-single-footer {
    display: none;
  }

  .zz{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    background: #333;
  }

}
</style>


