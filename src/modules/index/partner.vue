<template>
    <!--{{list.partners}}-->
    <div class="partner_box" v-if="list.partners">
        <h4 class="title_tip">我们的合作伙伴</h4>
        <div class="fu_title_tip">OUR PARTNER</div>
        <swiper :options="swiperOption" class="swiper-container swiper_re" style="width: 100%" @mouseover.native="showBtn = true"  @mouseout.native="showBtn = false">
                <swiper-slide v-for="(slide, index) in pageNo" :key="index" style="background-color: rgb(251, 251, 251)">
                    <div class="row" style="width: 1100px;margin: auto">
                         <div class="col-sm-2 each_img_box" v-for="sone in list.partners.slice(0+6*index, 6+6*index)" :key="sone.normal">
                            <img :src="sone.normal" alt="" class="normal_img">
                            <img :src="sone.hover" alt="" class="hover_img">
                        </div>
                    </div>
                </swiper-slide>
                <!--<div class="swiper-pagination" slot="pagination"></div>-->
                <div v-show="showBtn" class="swiper-button-next swiper-button-black" slot="button-next"></div>
                <div v-show="showBtn" class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            </swiper>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper/dist/js/swiper.min.js";
import im from "../../assets/logo.png";
export default {
  components: { swiper, swiperSlide },
  data() {
    return {
      showBtn: false,
      swiperOption: {
        //轮播配置
        //   pagination :{
        //     el: '.swiper-pagination',
        //     clickable :true,
        // },

        // autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: true,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
    //   list: {partners:[{normal: im,hover: im }]}
    };
  },
  computed: {
    ...mapGetters({
      list: "getFooter"
    }),
    pageNo() {
      if (this.list.partners && this.list.partners.length) {
        if (this.list.partners.length <= 6) return 1;
        else
          return (
            parseInt(this.list.partners.length / 6) +
            (this.list.partners.length % 6 ? 1 : 0)
          );
      } else return 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.partner_box {
  margin-top: 20px;
  .title_tip {
    width: 187px;
  }
  .swiper_re {
    @include view_layout;
  }
  .each_img_box {
    .normal_img {
      display: block;
    }
    .hover_img {
      display: none;
    }
  }
  .each_img_box:hover {
    cursor: pointer;
    .normal_img {
      display: none;
    }
    .hover_img {
      display: block;
    //   animation: imghover 5s linear;
    }
  }

  @keyframes imghover {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>