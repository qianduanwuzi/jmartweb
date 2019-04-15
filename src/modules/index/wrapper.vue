<template>
<div>
    <div class="wrapper_box">
        <div class="in_box">
            <swiper :options="swiperOption" class="swiper-container" style="width: 100%">
                <swiper-slide v-for="(slide, index) in sliderList" :key="index" >
                    <a :href="slide.url" target="_blank">
                        <img :src="slide.picture" alt="">
                    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            </swiper>
        </div>
    </div>
    <div class="five_adv_box">
        <div class="row justify-content-around">
            <div class="col-sm-2" v-for="one in advList" :key="one.label" style="display: flex;align-items: center">
                <img :src="one.url" alt="">
                <div style="margin-left: 20px">
                    <div class="label">{{one.label}}</div>
                    <div class="label1">{{one.label1}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import CategoryList from "./categoryList";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
    components: {CategoryList, swiper, swiperSlide},
    data() {
        return {
            sliderList: [],
            swiperOption: { //轮播配置
                  pagination :{
                    el: '.swiper-pagination',
                    clickable :true,
                },
              
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                 navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            advList: [
                {url: "/statics/2018/07/25/1532497812_cate_one.png", label: '食品安全', label1: '精选生鲜 严格质检'},
                {url: "/statics/2018/07/25/1532497830_cate_two.png", label: '全程冷链', label1: '自营物流 安全可控'},
                {url: "/statics/2018/07/25/1532497845_cate_three.png", label: '鲜活天然', label1: '绿色生态 京东精选'},
                {url: "/statics/2018/07/25/1532497861_cate_four.png", label: '产地直采', label1: '限定采源 质量保证'},
                {url: "/statics/2018/07/25/1532497877_cate_five.png", label: '无忧售后', label1: '优先赔 售后通道'},
            ]
        }
    },
    mounted() {
        this.getSliderList()
    },
    methods: {
        // 轮播图
        getSliderList() {
            api.get('/api/slides', {type: 'PC'}).then(res => {
                this.sliderList = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.wrapper_box{
    background-color: rgb(248, 248, 248);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .in_box{
        // display: flex;
        height: 495px;
        .cate_box{
            @include view_layout;
        }
        img{
            width: 100%;
            height: 495px;
        }
    }
}
.five_adv_box{
     @include view_layout;
    margin-top: 10px;
     .label{
         color: rgb(115, 115, 115)
     }
     .label1{
         color: rgb(191, 191, 191)
     }
}
</style>


