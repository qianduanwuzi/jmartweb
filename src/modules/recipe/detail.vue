<template>
    <div class="main-page-wrapper recipe_box" style="margin-top: 0;padding-top: 39px;">
        <div class="page-title page-title-default title-size-default title-design-centered color-scheme-light title-blog recipe_bg" style="">
            <div class="container">
                <header class="entry-header">
                    <h3 class="entry-title">菜单</h3>
                </header>
                <!-- .entry-header -->
            </div>
        </div>
        <!-- MAIN CONTENT AREA -->
        <div class="container">
            <div class="row content-layout-wrapper">
                <div class="site-content col-sm-12" role="main">
                    <article id="post-232" class="post-single-page post-232 post type-post status-publish format-standard has-post-thumbnail hentry category-homemade-recipes">
                        <div class="article-inner">
                            <div class="meta-post-categories">
                                <a  rel="category tag">{{form.tag}}</a>
                            </div>
                            <h1 class="entry-title">{{form.title}}</h1>
                            <div class="entry-meta woodmart-entry-meta">
                                <ul class="entry-meta-list">
                                    <li class="meta-author">
                                        Posted by <img alt="" src="https://secure.gravatar.com/avatar/b30742f8b802009a9ffc7ff43f20da50?s=32&amp;d=mm&amp;r=g" srcset="https://secure.gravatar.com/avatar/b30742f8b802009a9ffc7ff43f20da50?s=64&amp;d=mm&amp;r=g 2x" class="avatar avatar-32 photo" height="32" width="32">
                                        <a rel="author">
                                            <span class="vcard author author_name">
                                                <span class="fn">{{form.author}}</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- .entry-meta -->
                            <header class="entry-header">
                                <figure id="carousel-281" class="entry-thumbnail">
                                    <img :src="form.cover" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="">
                                </figure>
                                <div class="post-date woodmart-post-date">
                                    <span class="post-date-day">
                                        {{formatDateTimeDay(form.created_at)}} </span>
                                    <span class="post-date-month" style="text-transform:none;">
                                        {{formatDateTimeMonth(form.created_at)}} </span>
                                </div>
                            </header>
                            <!-- .entry-header -->
                            <div class="article-body-container content_box">
                                <div class="entry-content woodmart-entry-content">
                                    <div class="vc_row wpb_row vc_row-fluid">
                                        <div class="wpb_column vc_column_container vc_col-sm-12">
                                            <div class="vc_column-inner ">
                                                <div class="wpb_wrapper">
                                                    <div class="wpb_text_column wpb_content_element ">
                                                        <div class="wpb_wrapper">
                                                            <p>{{form.brief}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vc_row wpb_row vc_row-fluid">
                                        <div class="wpb_column vc_column_container vc_col-sm-12">
                                            <div class="vc_column-inner ">
                                                <div class="wpb_wrapper">

                                                    <div class="wpb_text_column wpb_content_element ">
                                                        <div class="wpb_wrapper"  v-html="form.content">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- .entry-content -->
                            </div>
                        </div>
                    </article>
                    <div style="display: flex;align-items: center;justify-content:center;margin-bottom: 30px;">
                         <div v-show="form.products && form.products.length" class="theme_bg_color add_all_dish PC_all_dish" @click="addAllDish">
                            立即购买
                        </div>
                        <div v-show="form.products && form.products.length" class="theme_bg_color add_all_dish M_all_dish" @click="maddAllDish">
                            立即购买
                        </div>
                        <a href="#/recipe" style="margin-left: 20px">
                            <div @click="$router.back()" class="theme_bg_color add_all_dish " style="color: #fff;border-radius: 5px"><i class="fa fa-reply"style="margin-right: 5px"></i>返回</div>
                        </a>
                    </div>


                    <!-- #post -->
                    <div class="woodmart-single-footer">
                        <div class="single-post-social">
                            <div class="woodmart-social-icons text-center icons-design-colored icons-size-default color-scheme-dark social-share social-form-circle">
                                <div class="woodmart-social-icon social-facebook">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=/new-home-decor-from-john-doerson.html" target="_blank" class="woodmart-tooltip" data-original-title="" title="">
                                        <i class="fa fa-facebook"></i>
                                        <span class="woodmart-social-icon-name">Facebook</span>
                                    </a>
                                </div>
                                <div class="woodmart-social-icon social-twitter">
                                    <a href="http://twitter.com/share?url=/new-home-decor-from-john-doerson.html" target="_blank" class="woodmart-tooltip" data-original-title="" title="">
                                        <i class="fa fa-twitter"></i>
                                        <span class="woodmart-social-icon-name">Twitter</span>
                                    </a>
                                </div>
                                <div class="woodmart-social-icon social-google">
                                    <a href="http://plus.google.com/share?url=/new-home-decor-from-john-doerson.html" target="_blank" class="woodmart-tooltip" data-original-title="" title="">
                                        <i class="fa fa-google-plus"></i>
                                        <span class="woodmart-social-icon-name">Google</span>
                                    </a>
                                </div>
                                <div class="woodmart-social-icon social-email">
                                    <a href="mailto:?subject=Check this /new-home-decor-from-john-doerson.html" target="_blank" class="woodmart-tooltip" data-original-title="" title="">
                                        <i class="fa fa-envelope"></i>
                                        <span class="woodmart-social-icon-name">Email</span>
                                    </a>
                                </div>
                                <div class="woodmart-social-icon social-pinterest">
                                    <a href="http://pinterest.com/pin/create/button/?url=/new-home-decor-from-john-doerson.html&amp;media=/wp-content/uploads/2017/06/wood-blog-placeholder.jpg" target="_blank" class="woodmart-tooltip" data-original-title="" title="">
                                        <i class="fa fa-pinterest"></i>
                                        <span class="woodmart-social-icon-name">Pinterest</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="single-post-navigation" style="justify-content:stretch">
                        <div class="blog-posts-nav-btn prev-btn">
                        </div>
                        <div class="back-to-archive">

                        </div>
                    </div>
                    <!-- #comments -->
                </div>
                <!-- .site-content -->
                <!-- .sidebar-container -->
            </div>
            <!-- .main-page-wrapper -->
        </div>
        <peicai-dialog :show.sync="showPeicai" :products.sync="products"></peicai-dialog>
    </div>
</template>

<script>
import peicaiDialog from "./peicaiDialog"
export default {
    components: {peicaiDialog},
  data() {
    return {
      form: {},
      showPeicai: false,
      products: [], // 传给弹框
    };
  },
  mounted() {
    var id = this.$route.params.id;
    this.$store.dispatch('showLoding', true)
    api.get("/api/posts/" + id).then(res => {
    this.$store.dispatch('showLoding', false)
      this.form = res.data;
      document.title = res.data.title + '-Jmart8'
      this.products = [];
      if(res.data && res.data.products) {
          res.data.products.forEach(one => this.products.push(one))
      }
    });
  },
  methods: {
    formatDateTimeMonth(timeStamp) {
      var month = "";
      if (timeStamp != undefined && timeStamp != null && timeStamp != "") {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var m = date.getMonth() + 1;
        month = m + " Month";
      }
      return month;
    },
    formatDateTimeDay(timeStamp) {
      var day = "";
      if (timeStamp != undefined && timeStamp != null && timeStamp != "") {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var d = date.getDate();
        day = d;
      }
      return d;
    },
    addAllDish() {
        this.showPeicai = true;
            // let arr = this.form.products.map(one => {
            //     return {product_id: one.product_id, num: 1}
            // })
            // api.post("/api/carts/batch-create", arr ).then(res => {
            //     this.$store.dispatch("getCart");
            // });
    },
    // 专题详情 m 立即购买
    maddAllDish() {
        let arr = this.form.products.map(one => {
            return {"product_id": one.product_id,
                    "num": 1,
                    "product_name": one.product_name,
                    "cover": one.cover,
                    "is_promote":one.is_promote,
                    "promote_price": one.promote_price,
                    "price": one.price }
        })
        // let Jarr = JSON.stringify(arr);
        window.webkit.messageHandlers.webViewApp.postMessage({"method":"addAllDish", arr});
    },
     // 专题详情 m 添加至购物车
    // addToCart() {
    //      let arr = this.form.products.map(one => {
    //         return {"product_id": one.product_id,
    //                 "num": 1,
    //                 "product_name": one.product_name,
    //                 "cover": one.cover,
    //                 "is_promote":one.is_promote,
    //                 "promote_price": one.promote_price,
    //                 "price": one.price }
    //     })
    //     window.webkit.messageHandlers.webViewApp.postMessage({"method":"addToCart", arr})
    // },
    //  // 专题详情 m 直接购买
    // quickBuy() {
    //       let arr = this.form.products.map(one => {
    //         return {"product_id": one.product_id,
    //                 "num": 1,
    //                 "product_name": one.product_name,
    //                 "cover": one.cover,
    //                 "is_promote":one.is_promote,
    //                 "promote_price": one.promote_price,
    //                 "price": one.price }
    //     })
    //      window.webkit.messageHandlers.webViewApp.postMessage({"method":"quickBuy",arr})
    // },
  }
};
</script>

<style>
.recipe_bg{
    background: url('/statics/2018/08/10/1533892884_caipu.jpg')  100%
}
.page-title-default {
  background-color: #0a0a0a;
  background-size: cover;
  background-position: center center;
}

.content_box{
    width: 870px;
    margin: auto;
}

.add_all_dish{
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 5px;
    width: 110px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    /*margin:10px auto;*/
    /* animation: up-down 1s linear infinite; */
}

.M_all_dish{
    display: none;
}

.footer_ope_box{
    display: none;
}

@keyframes up-down{
    0%{
        transform: scale(1,1)
    }
     50%{
        transform: scale(1.1,1.1)
    }
     100%{
        transform: scale(1.2,1.2)
    }
}

@media (max-width: 1200px) {
  /* .recipe_box {
      display: block
  } */
  .footer_ope_box{
      display: block;
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
  }
    .btn{
          width: 50%;
          color: #fff;
          font-weight: 400;
      }
      .left_btn {
          background:  rgba(17, 159, 60, .8)
      }
  .portal_header_box, .portal_footer_box, .sus_box, .single-post-navigation, .woodmart-single-footer, .PC_all_dish, .page-title{
      display: none;
  }
  .M_all_dish{
      display: block;
  }

  .content_box{
      width: 90%;
      margin: auto;
  }

}



</style>
