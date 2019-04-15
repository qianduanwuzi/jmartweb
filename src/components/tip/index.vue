<template>
    <div :class="['tip_box', tipInfo.type]" v-show="show">
        <i class="fa fa-check-circle" v-show="tipInfo.type == 'success'"></i>
        <i class="fa fa-times-circle" v-show="tipInfo.type == 'err'"></i>
        {{tipInfo.msg}}
    </div>
</template>

<script>
// tipInfo.type  err:红色错误提示！  success:pc成功提示 m_success: H5成功提示
import { mapGetters } from 'vuex'; 
export default {
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters({
            tipInfo: "getTipInfo"
        })
    },
    watch: {
        tipInfo: {
            deep: true,
             handler(val, oldval) {
                 this.show = true
                 setTimeout(() => {
                     this.show = false
                 },2000)
             }
        }
    }
}
</script>

<style lang="scss" scoped>
.tip_box{
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding:10px 30px;
    border-radius: 5px;
}
.err{
    color: #f56c6c;
    /*font-weight: bold;*/
    /*background: rgba(51, 51, 51, .8);*/
    background: #fef0f0,
}
.success{
    color: #67c23a;
    /*font-weight: bold;*/
    background: #e1f3d8;
}
.m_success{
    // width: 
    background: #333;
    color: #fff;
}
</style>


