<template>
    <div class="recommend_box">
        <div class="recommend_in_box">
            <h4 class="title_tip">为您推荐</h4>
            <div class="fu_title_tip">RECOMMEDN</div>
            <div class="nav_box">
                <!--<div class="left" v-show="curP > 1" @click="clickLeft"><</div>-->
                <i class="fa fa-angle-left left" v-show="curP > 1" @click="clickLeft"></i>
                <div v-for="(one, index) in allCate.slice((curP-1)*12, curP*12)" :key="one.name" @click="clickNav(one)" :class="['each_nav', curName == one.name? 'active' : '']">
                {{one.name}}
                </div>
                <i class="fa fa-angle-right right" v-show="(parseInt(allCate.length/12)+(allCate.length%12? 1 : 0)) > curP" @click="clickRight"></i>
                <!--<div class="right" v-show="(parseInt(allCate.length/12)+(allCate.length%12? 1 : 0)) > curP" @click="clickRight">></div>-->
            </div>
            <div :class="['list_box', showAnimate? 'up_animate' : '']">
                <div class="row">
                    <div class="col-sm-3 each_list_box" v-for="(one, index) in list" :key="index">
                        <div class="each_in_box" style="position: absolute;width: 275px;padding: 10px 10px 0 10px;" @click="$router.push({path:`/product-category/detail/${one.id}`})">
                            <div class="img_box">
                                <img :src="one.cover" alt="">
                                <!-- <img src="../../assets/logo.png" alt=""> -->
                            </div>
                            <div class="detail_box">
                                <div style="font-weight: 600">{{one.name}}</div>
                                <div>{{one.category_name}}</div>
                                <div v-if="one.is_promote" class="theme_font_color">$<span style="color: #777777; text-decoration: line-through">{{one.price}}</span><span> {{one.promote_price}}</span></div>   
                                <div v-else class="theme_font_color"><span>${{one.price}}</span></div>
                                <div class="detail_ope">
                                    <div class="des">
                                        {{one.description}}
                                    </div>
                                    <div class="operator">
                                        <div class="wish" @click.stop="addWish(one)"></div>
                                        <div class="btn theme_bg_color" @click.stop="addCart(one.id)">
                                            <span class="txy">加入购物车</span>
                                            <span class="cart_icon"></span>
                                        </div>
                                        <div class=""></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      curName: "为您推荐",
      curId: '',
      list: [],
      showAnimate: false,
      curP: 1, // 当前分类页
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    }),
    allCate() {
      return [{ name: "为您推荐" }].concat(this.categories);
    //   return [
    //       {name: '111', id: '1'},
    //         {name: '112', id: '1'},
    //           {name: '113', id: '1'},
    //             {name: '114', id: '1'},
    //               {name: '115', id: '1'},
    //                 {name: '116', id: '1'},
    //                   {name: '117', id: '1'},
    //                     {name: '118', id: '1'},
    //                       {name: '119', id: '1'},
    //                         {name: '120', id: '1'},
    //                           {name: '121', id: '1'},
    //                             {name: '122', id: '1'},
    //                               {name: '222', id: '1'},
    //                                 {name: '223', id: '1'},
    //                                   {name: '224', id: '1'},
    //                                     {name: '225', id: '1'},
    //                                       {name: '226', id: '1'},
    //                                         {name: '227', id: '1'},
    //                                           {name: '228', id: '1'},
    //                                             {name: '229', id: '1'},
    //                                               {name: '230', id: '1'}

    //   ]
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
      clickLeft() {
           this.curP -= 1;
           this.$nextTick(() => {
               this.clickNav(this.allCate.slice((this.curP-1)*12, (this.curP-1)*12+1)[0])
           })
      },
      clickRight() {
        this.curP += 1;
        this.$nextTick(() => {
               this.clickNav(this.allCate.slice((this.curP-1)*12, (this.curP-1)*12+1)[0])
           })
      },
    clickNav(d) {
      this.curName = d.name;
      this.curId = d.id;
    },
    getList(id = '') {
        this.$store.dispatch('showLoding', true)
      api.get("/api/products", { recommended: true, categoryId: id }).then(res => {
        this.$store.dispatch('showLoding', false)
        this.list = res.data.docs;
      });
    },
    addCart(id) {
        this.$store.dispatch('showLoding', true)
        api.get("/api/carts/").then(res => {
            let curPro = res.data.find(one => one.product_id == id);
            if(curPro) {
                // console.log('82', curPro)
                api.post("/api/carts/", { product_id: id, num: curPro.num+1 }).then(res => {
                    this.$store.dispatch('showLoding', false)
                    this.$store.dispatch("getCart");
                });
            }else {
                api.post("/api/carts/", { product_id: id, num: 1 }).then(res => {
                    this.$store.dispatch('showLoding', false)
                    this.$store.dispatch("getCart");
                });
            }
        })
     
    },
    addWish(d) {
        this.$store.dispatch('showLoding', true)
        api.post('/api/my-collections', {id: d.id,product_id: d.id}).then(res => {
            this.$store.dispatch('showLoding', false)
            this.$store.dispatch('getWish')
        })
    }
  },
  watch: {
      curId(v) {
         this.getList(v)
      },
      list: {
          deep: true,
          handler(v) {
              this.showAnimate = true;
              setTimeout(() => {
                  this.showAnimate = false
              }, 250)
          }
      }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.recommend_box {
  margin-bottom: 100px;
  margin-top: 30px;
  .recommend_in_box {
    @include view_layout;
    .nav_box {
      /*display: flex;*/
      /*justify-content: space-between;*/
      .left{
          float: left;
          font-size: 22px;
          cursor: pointer;
           background-color: rgb(251, 251, 251);
              padding: 5px 10px;
    margin-top: -6px
      }
      .left:hover,   .right:hover{
          transform: scale(1.1, 1.1)
      }
      .right{
          float: right;
          font-size: 22px;
          cursor: pointer;
          background-color: rgb(251, 251, 251);
              padding: 5px 10px;
    margin-top: -27px
      }
      .each_nav {
        cursor: pointer;
        margin-left: 37px;
        padding: 0 1px;
     width: 60px; 
        display: inline-block
      }
      .active {
        position: relative;
        font-weight: 600;
      }
      .active::after {
        content: "";
        position: absolute;
        top: 110%;
        width: 70px;
        height: 2px;
        background-color: #119f3c;
        left: -8px;
        animation: navactive 0.3s linear;
        transform: translateX(0px);
      }

      @keyframes navactive {
        from {
          transform: translateX(-15px);
        }
        to {
          transform: translateX(0px);
        }
      }
    }
    .list_box {
      margin-top: 20px;
      .each_list_box {
          position: relative;
          height: 400px;
          cursor: pointer;
        .img_box {
          border: 1px solid #f4f4f4;
          width: 100%;
          height: 300px;
          overflow: hidden;
          img {
            width: 100%;
            /*height: 100%;*/
             transition: all .25s;
          }
        }
        .detail_box {
          padding-top: 20px;
          padding-bottom: 15px;
          text-align: center;
          background-color: #fff;
          .detail_ope {
              display: none
          }
        }
      }
      .each_list_box:hover{
          img{
              transform: scale(1.25, 1.25) 
          }
          .each_in_box{
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            z-index: 100;
          }
          .detail_ope {
              display: block;
              .des{
                  height: 40px;
                  overflow: hidden;
                  color: rgb(119,119,119)
              }
          }
      } 
    }
    .up_animate{
        transform: translateY(0px);
        animation: upanimate .25s linear;
    }
     @keyframes upanimate {
        from {
          transform: translateY(30px);
        }
        to {
          transform: translateY(0px);
        }
      }
  }

  //  可能要抽
  .operator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .wish {
      font-size: 20px;
      cursor: pointer;
    }
    .wish::before {
      content: "\f108";
      font-family: woodmart-font;
    }
    .quator {
      font-size: 20px;
    }
    .quator::before {
      content: "\f125";
      font-family: woodmart-font;
    }
    .btn {
      position: relative;
      overflow: hidden;
      text-align: center;
      width: 90px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      .txy{
           position: absolute;
           left: 50%;
           transform: translate(-50%, -50%);
           top: 50%;
           transition: top .25s;
      }
      .cart_icon {
        top: 150%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 20px;
        transition: top .25s;
      }
      .cart_icon::before {
        content: "\f11d";
        font-family: woodmart-font;
      }
    }
    .btn:hover{
         .txy{
             top: -50%;
         }
         .cart_icon{
             top: 50%;
         }
    }
  }
}
</style>

