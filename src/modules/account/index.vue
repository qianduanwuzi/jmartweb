<template>
    <div class="main-page-wrapper" style="margin-top:0">
        <div style="position: relative">
            <div class="page-title page-title-default title-size-default title-design-centered color-scheme-light account_bg">
             </div>
            <div class="container account_title">
                    <header class="entry-header">
                        <h1 class="entry-title">我的账户</h1>								
                    </header>
            </div>
        </div>
      
        <router-view></router-view>
        <div class="woodmart-prefooter" style="padding-bottom: 0">
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  background-image: url(/static/images/account.png);
  background-size: cover;
  background-position: center center;
}

 .account_bg{
    height: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    background: url("https://jmart8.qixin.io/statics/2018/08/10/1533893961_account.png") 100%
} 
.vc_custom_bg{
    background-color: #f9f9f9 !important
}
.account_title{
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


