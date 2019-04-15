<template>
    <div class="portal_header_box" @click="clickHandler">
        <div class="headers_box whb-main-header">
            <div class="container">
                <span class="wel_txt">欢迎光临新世界超市</span>
                <!-- <div class="right_box">
                    <div :class="['share_box', 'border_right']">
                        <div class="icon_each">
                            <a href="" target="_blank"><i class="fa fa-facebook"></i></a>
                        </div>
                        <div class="icon_each">
                            <a href="" target="_blank"><i class="fa fa-twitter"></i></a>
                        </div>
                        <div class="icon_each">
                            <a href="" target="_blank"> <i class="fa fa-google-plus"></i></a>
                        </div>
                        <div class="icon_each">
                            <a href="" target="_blank"> <i class="fa fa-envelope"></i></a>
                        </div>
                        <div class="icon_each">
                            <a href="" target="_blank"><i class="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                    <div :class="['border_right', 'tar_box']">
                        <a href="" target="_blank" style="display: flex;align-items: center;"><i class="fa fa-envelope-o"></i><span class="news_txt">NEWSLETTER</span></a>
                    </div>
                    <div :class="['border_right', 'tar_box']" style="margin-top: -4px">
                        <a href=""><span>CONTACT US</span></a>
                    </div>
                    <div :class="['border_right', 'tar_box']" style="margin-top: -4px">
                        <a href=""><span>FAQS</span></a>
                    </div>
                </div> -->
            </div>
        </div> 
        <search :showCategory.sync="showcate"></search>  
        <category></category>
    </div>
    
</template>

<script>
import Category from './category'
import Search from "./search";
export default {
  components: { Search, Category },
  props: {
    // showcate: {
    //   default: false,
    //   type: Boolean
    // }
  },
  data() {
    return {
      showcate:false,
    };
  },
  methods: {
    clickHandler() {
      this.showcate = false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
//  @include set_font(14px, #333);
//   @include view_layout;
// @include set_bg_color
.headers_box {
  @include set_bg_color;
  .container {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wel_txt {
      @include set_font(12px, #fff, bold);
    }
    .right_box {
      display: flex;
      align-items: center;
      .border_right {
        border-right: 1px solid rgba(255, 255, 255, 0.25);
        height: 40px;
        a {
          color: #fff;
          transition: all 0.25s ease;
        }
        span {
          font-size: 12px;
        }
      }
      .share_box {
        display: flex;
        align-items: center;
        padding-right: 10px;
        .icon_each {
          padding: 6px;
          a {
            letter-spacing: 0;
          }
        }
        .icon_each:hover a {
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .tar_box {
        // display: flex;
        // align-items: center;
        padding: 10px;
        span {
          // font-weight: bold;
        }
        .news_txt {
          margin-left: 7px;
        }
      }
      .tar_box:hover a {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}
</style>

