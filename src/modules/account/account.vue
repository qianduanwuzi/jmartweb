<template>
    <div class="account_box">
        <div class="left_box">
            <div class="title">我的账户</div>
            <div class="tab_box">
                <a @click="clickHandler(one)" v-for="one in tabList" :key="one.name" :class="[curPath == one.url? 'active':'']">
                    {{one.name}}
                </a>
            </div>
        </div>
        <div class="right_box">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                 {name: '账户详情', url: '/my-account/account/detail'},
                 {name: '我的信用卡', url: '/my-account/account/bank-card'},
                 {name: '订单', url: '/my-account/account/order'},
                 {name: '评价中心', url: '/my-account/account/comment-center'},
                 {name: '地址', url: '/my-account/account/address'},
                 {name: '修改密码', url: '/my-account/account/edit-pw'}
                 
            ],
            curPath: '/my-account/account/detail',
        }
    },
    mounted() {
        // 防刷新
        this.$nextTick(() => {
            this.curPath = this.$route.path
        })
    },
    methods: {
        clickHandler(d) {
            this.curPath = d.url;
            this.$router.push({path: d.url})
        }
    },
    watch:{
        $route:{
            deep: true,
            handler(v) {
                this.curPath = v.path
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/com.scss";
    .account_box {
        @include view_layout;
        display: flex;
        .left_box {
            width: 220px;
            padding-left: 10px;
            padding-right: 20px;
            .title {
                font-weight: 600;
                font-size: 16px;
                padding-bottom: 10px;
                padding-left: 10px;
                border-bottom: 1px solid rgba(122, 122, 122, .2)
            }
            .tab_box {
                a {
                    padding-left: 10px;
                    display: block;
                    line-height: 30px;
                    height: 30px;
                    font-weight: 600;
                }
                a:hover{
                    background-color: rgba(122, 122, 122, .2)
                }
                .active{
                    background-color: rgba(122, 122, 122, .2)
                }
            }
        }
        .right_box{
            width: 100%;
            padding-left: 20px;
            border-left: 1px solid rgba(122, 122, 122, .2);
        }
    }
</style>