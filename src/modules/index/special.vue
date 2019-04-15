<template>
    <div class="special_box vc_row wpb_row vc_row-fluid bg-bottom vc_custom_1496402498927 woodmart-disable-overflow">
        <div class="wpb_column vc_column_container vc_col-sm-12">
            <div class="vc_column-inner vc_custom_1496220821354">
                <div class="wpb_wrapper">
		            <div id="woodmart-title-id-5b3ded52c8f6a" class="title-wrapper  woodmart-title-color-default woodmart-title-style-default woodmart-title-size-medium woodmart-title-width-100 text-center ">
						<div class="title-subtitle  font-default style-default"></div>
                            <div class="liner-continer">
                                <span class="left-line"></span>
                                <h4 class="woodmart-title-container title  title_tip  woodmart-font-weight-">今日特价</h4>
                                <span class="right-line"></span>
                            </div>
                            <div>
                                SPECIAL
                            </div>
		                </div>
		                <div class="products woocommerce row categories-style-masonry-first categories-masonry woodmart-spacing-20 products-spacing-20 columns-4" style="position: relative; height: 606px;"><div class=" col-xs-6 col-sm-4 col-md-6 first  category-grid-item cat-design-default categories-with-shadow product-category product first" data-loop="1" style="position: absolute; left: 0px; top: 0px;">
                            <div class="wrapp-category">
                                <div class="category-image-wrapp">
                                    <router-link :to="`/product-category/detail/${list[0].id}`" class="category-image">
                                        <img :src="list[0].cover" :alt="list[0].name" width="1200" height="1200">
                                    </router-link>
                                </div>
                                <!--<div class="hover-mask">
                                    <h3 class="category-title">
                                        火锅专区 <mark class="count">(4)</mark>
                                    </h3>
                                    <div class="more-products">
                                        <a href="/product-category/hot-pot">4 products</a>
                                    </div>
                                </div>
                                        <a href="/product-category/hot-pot" class="category-link"></a>-->
                                </div>
                        </div>
                        <div v-for="(one,index) in list.slice(1, 5)" :key="index"  :style="abs[index]" class="col-xs-6 col-sm-4 col-md-3 category-grid-item cat-design-default categories-with-shadow product-category product">
                              <div class="wrapp-category">
                                <div class="category-image-wrapp">
                                    <router-link :to="`/product-category/detail/${one.id}`" class="category-image">
                                        <img :src="one.cover" :alt="one.name" width="600">
                                    </router-link>
                                </div>
                                <!--<div class="hover-mask">
                                    <h3 class="category-title">
                                        {{one.title}} <mark class="count">(1)</mark>			
                                    </h3>
                                    <div class="more-products">
                                        <router-link :to="one.url">1 product</router-link>
                                    </div>
                                </div>
                                <router-link :to="one.url" class="category-link"></router-link>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {left: '606', top: '0', url:"", imgUrl: '/wp-content/uploads/2018/06/produce.jpg', alt:'农产直供', title: '农产直供'},
                {left: '909', top: '0', url:"", imgUrl: '/wp-content/uploads/2018/06/meat.jpg', alt:'精选肉类', title: '精选肉类'},
                {left: '606', top: '303', url:"", imgUrl: '/wp-content/uploads/2018/06/snacks.jpg', alt:'零食小吃', title: '零食小吃'},
                {left: '909', top: '303', url:"", imgUrl: '/wp-content/uploads/2018/06/frozen.jpg', alt:'冷冻食品', title: '冷冻食品'},
            ],
            abs: [
                {left: '606px', top: '0', position: 'absolute'},
                {left: '909px', top: '0', position: 'absolute'},
                {left: '606px', top: '303px', position: 'absolute'},
                {left: '909px', top: '303px', position: 'absolute'}
            ]
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            api.get('/api/products',{promote: true}).then(res => {
                this.list = res.data.docs
            })
            
        }
    }
}
</script>


<style lang="scss" scoped>
@import "@/scss/com.scss";
.special_box {
  @include view_layout;
  margin-top: 8vh !important;
} 
</style>

