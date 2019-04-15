<template>
    <div class="main-page-wrapper" style="margin-top:-1px;">
        <div style="position: relative">
            <div class="page-title page-title-default title-size-default title-design-centered color-scheme-light title-blog   recipe_bg" style="">
            </div>
            <div class="container Recipe_title">
                <header class="entry-header">
                    <h1 class="entry-title">菜单</h1>
                </header>
            </div>
        </div>
       
        <!-- MAIN CONTENT AREA -->
        <div class="container" id="_container">
            <div class="content-layout-wrapper">
                <div class="site-content col-sm-12" role="main">
                    <div class="recipe woodmart-blog-holder blog-pagination-pagination masonry-container woodmart-spacing-20 blog-spacing-20" id="5b4d8336ae00e" data-paged="1" data-source="main_loop" style="position: relative; height: 1468.13px;">
                        <article v-for="(item,index) in recipeData" :key="index" class="recipe-item blog-design-masonry blog-post-loop blog-style-shadow  col-xs-12 col-sm-6 col-md-4 post-232 post type-post status-publish format-standard has-post-thumbnail hentry category-homemade-recipes">
                            <div class="article-inner">
                                <header class="entry-header">
                                    <figure id="carousel-554" class="entry-thumbnail">
                                        <div class="post-img-wrapp">
                                            <router-link :to="`/recipe/${item.id}`">
                                                <img :src="item.cover" class="attachment-large wp-post-image attachment-large" alt="">
                                            </router-link>
                                        </div>
                                        <div class="post-image-mask">
                                            <span></span>
                                        </div>
                                    </figure>
                                    <div class="post-date woodmart-post-date">
                                        <span class="post-date-day">
                                            {{formatDateTimeDay(item.created_at)}} </span>
                                        <span class="post-date-month" style="text-transform:none;">
                                            {{formatDateTimeMonth(item.created_at)}} </span>
                                    </div>
                                </header>
                                <!-- .entry-header -->
                                <div class="article-body-container">
                                    <div class="meta-categories-wrapp">
                                        <div class="meta-post-categories">
                                            <router-link :to="`/recipe/${item.id}`">{{item.tag}}</router-link>
                                        </div>
                                    </div>
                                    <h3 class="entry-title">
                                        <router-link :to="`/recipe/${item.id}`">{{item.title}}</router-link>
                                    </h3>
                                    <div class="entry-meta woodmart-entry-meta">
                                        <ul class="entry-meta-list">
                                            <li class="meta-author">
                                                By <img alt="" src="https://secure.gravatar.com/avatar/b30742f8b802009a9ffc7ff43f20da50?s=32&amp;d=mm&amp;r=g" srcset="https://secure.gravatar.com/avatar/b30742f8b802009a9ffc7ff43f20da50?s=64&amp;d=mm&amp;r=g 2x" class="avatar avatar-32 photo" height="32" width="32">
                                                <a rel="author">
                                                    <span class="vcard author author_name">
                                                        <span class="fn">{{item.author}}</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <!-- <li>
                                                <span class="meta-reply">
                                                    <a href="/new-home-decor-from-john-doerson.html#respond">
                                                        <span class="comments-count">12</span>
                                                        <span class="comments-count-label">comments</span>
                                                    </a>
                                                </span>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <!-- .entry-meta -->
                                    <div class="hovered-social-icons">
                                        <div class="woodmart-social-icons text-center icons-design-default icons-size-small color-scheme-light social-share social-form-circle">
                                            <div class="woodmart-social-icon social-facebook">
                                                <a href="https://www.facebook.com/sharer/sharer.php?u=/blog" target="_blank" class="">
                                                    <i class="fa fa-facebook"></i>
                                                    <span class="woodmart-social-icon-name">Facebook</span>
                                                </a>
                                            </div>
                                            <div class="woodmart-social-icon social-twitter">
                                                <a href="http://twitter.com/share?url=/blog" target="_blank" class="">
                                                    <i class="fa fa-twitter"></i>
                                                    <span class="woodmart-social-icon-name">Twitter</span>
                                                </a>
                                            </div>
                                            <div class="woodmart-social-icon social-google">
                                                <a href="http://plus.google.com/share?url=/blog" target="_blank" class="">
                                                    <i class="fa fa-google-plus"></i>
                                                    <span class="woodmart-social-icon-name">Google</span>
                                                </a>
                                            </div>
                                            <div class="woodmart-social-icon social-email">
                                                <a href="mailto:?subject=Check this /blog" target="_blank" class="">
                                                    <i class="fa fa-envelope"></i>
                                                    <span class="woodmart-social-icon-name">Email</span>
                                                </a>
                                            </div>
                                            <div class="woodmart-social-icon social-pinterest">
                                                <a href="http://pinterest.com/pin/create/button/?url=/blog&amp;media=/wp-content/uploads/2017/06/wood-blog-placeholder.jpg" target="_blank" class="">
                                                    <i class="fa fa-pinterest"></i>
                                                    <span class="woodmart-social-icon-name">Pinterest</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entry-content woodmart-entry-content">
                                        {{item.brief}}
                                        <p class="read-more-section">
                                            <router-link :to="`/recipe/${item.id}`" class="btn-read-more more-link">去看看</router-link>
                                        </p>
                                    </div>
                                    <!-- .entry-content -->
                                </div>
                            </div>
                        </article>
                        <!-- #post -->
                    </div>
                </div>
                <!-- .site-content -->
            </div>
            <!-- .main-page-wrapper -->
        </div>
        <!-- end row -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      currPage: 1,
      currSize: 20,
      currCount: 0,
      recipeData: [],
      isLoad: false
    };
  },
  mounted() {
    const that = this;
    this.load_recipe_handle();
    $(window).scroll(function() {
      const path = that.$route.path;
      if (path == "/recipe") {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
          if (!that.isLoad) {
            that.isLoad = true;
            if (that.currPage * that.currSize < that.currCount) {
              that.currPage = that.currPage + 1;
              that.load_recipe_handle();
            } else that.isLoad = false;
          }
        }
      }
    });
    /* var waypoints = $("#_container").waypoint(
      () => {
        debugger;
        if (that.currPage * that.currSize < that.currCount) {
          that.currPage = that.currPage + 1;
          that.load_recipe_handle();
        }
      },
      {
        offset: "50%"
      }
    ); */
  },
  methods: {
    load_recipe_handle() {
           this.$store.dispatch('showLoding', true)
      api
        .get("/api/posts", { page: this.currPage, size: this.currSize })
        .then(res => {
               this.$store.dispatch('showLoding', false)
          this.currCount = res.data.count;
          this.recipeData = this.recipeData.concat(res.data.docs);
          this.isLoad = false;
          setTimeout(() => {
            var $container = $(".recipe").isotope({});
            $container.imagesLoaded(function() {
              $container.isotope("layout");
            });
          }, 1);
        });
    },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe_bg {
    height: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    background-image: url(/static/images/recipe.jpg);
}
.Recipe_title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .entry-title{
        color: #fff;
        font-size: 68px;
    }
}
</style>
