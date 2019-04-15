<template>
    <div class="commentBox">
        <!--评价中心-->
        <div class="tabBox">   
            <div class="eachTab" v-for="one in tabList" :key="one.name">
                <div @click="clickHandler(one.com)" :class="[curCom == one.com? 'active': '']">{{one.name}}</div>
            </div>
        </div>
         <div class="contentBox">
                <component :is="curCom"></component>
            </div>
     
    </div>
</template>

<script>
import OnComment  from "./onComment"
import Commented  from "./commented"
export default {
    components: {OnComment, Commented},
    data() {
        return {
            tabList: [
                {name: '待评价',com: 'on-comment'},
                {name: '已评价',com: 'commented'},
            ],
            curCom: 'on-comment'
        }
    },
    mounted() {
        // 防刷新
        this.$nextTick(() => {
        })
    },
    methods: {
      clickHandler(comname) {
          this.curCom = comname
      }
    },
    watch:{
        
    }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/com.scss";
    .commentBox {
       .tabBox{
            display: flex;
            height: 60px;
            line-height: 60px;
           .eachTab{
               width: 100px;
               text-align: center;
               cursor: pointer;
               .active{
                   position: relative;
                   color: #119f3c;
               }
               .active::after{
                   content: '';
                   position: absolute;
                   top: 47px;
                   width: 45px;
                   height: 2px;
                   background: #119f3c;
                   left: 27px;
               }
           }
       }
    }
</style>