<template>
    <!--悬浮nav-->
    <div v-show="show" class="sus_box">
        <div class="container in_box">
            <div class="logo">
                <router-link to="/">
                    <img :src="baseurl+'/statics/2018/07/25/1532496567_logo.png'" alt="Jmart8" style="max-width: 250px;">
                </router-link>
            </div>
            <product></product>
            <personal></personal>
        </div>
    </div>
</template>

<script>
import seturl from "@/mixins/setbaseurl";
import Product from './product';
import Personal from './personal';
export default {
    mixins: [seturl],
    components: {Product, Personal},
    props: {
        show: {
            default: false,
            type: Boolean
        }
    },
    mounted() {
        // api.get('/api/categories').then(res => {

        // })
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.sus_box{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: #fff;
    width: 100%;
    border-color: rgba(232, 232, 232, 1);
    transition: background-color .3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    animation: wd-fadeInDownBig .3s ease;
    .in_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
            img{
                max-width: 250px;
                padding:5px 0;
            }
        }
    }
}
</style>


