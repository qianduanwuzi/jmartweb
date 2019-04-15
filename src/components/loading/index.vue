<template>
    <div class="loading">
        <hour-glass v-show="show"></hour-glass>
    </div>
</template>

<script>
// tipInfo.type  err:红色错误提示！  success:pc成功提示 m_success: H5成功提示
import { mapGetters } from 'vuex'; 
import {HourGlass} from 'vue-loading-spinner'
export default {
    components: {HourGlass},
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters({
            loadInfo: "loadInfo"
        })
    },
    watch: {
        loadInfo: {
            deep: true,
             handler(val, oldval) {
                 console.log(val.show)
                 this.show = val.show
                //  setTimeout(() => {
                    //  this.show = false
                //  },2000)
             }
        }
    }
}
</script>

<style lang="scss" scoped>
.loading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>


