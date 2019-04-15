<template>
    <div class="page_box">
        <div v-if="pageNum <= 9" style="display: flex">
            <div :class="['each_box','pre']" @click="reduce"><</div>   
            <div v-for="one in pageNum" :key="one" :class="['each_box', curPageNo == one? 'selected' : '']" @click="changePageNo(one)">
                {{one}}
            </div> 
             <div :class="['each_box','next']" @click="add">></div>   
        </div>
        <div v-else>
            <div>
                <div :class="['each_box','pre']" @click="reduce"><</div>   
                <div class="each_box" v-show="curPageNo > 7" @click="changePageNo(1)">
                    1
                </div>
                <div class="each_box" v-show="curPageNo > 7" @mouseover="left = '<<'" @mouseout="left = '...'" @click="clickPre">
                    {{left}}
                </div>

                <div v-for="one in middleList" :key="one" :class="['each_box', curPageNo == one? 'selected' : '']" @click="changePageNo(one)">
                    {{one}}
                </div>
                <div class="each_box"  v-show="middleNo <= pageNum-7" @mouseover="right = '>>'" @mouseout="right = '...'" @click="clickMore">{{right}}</div>
                <div v-show="middleNo <= pageNum-7" :class="['each_box', curPageNo == (pageNum-1)? 'selected' : '']" @click="changePageNo(pageNum-1)">{{pageNum-1}}</div>
                <div v-show="middleNo <= pageNum-7" :class="['each_box', curPageNo == pageNum? 'selected' : '']" @click="changePageNo(pageNum)">{{pageNum}}</div>
                <div :class="['each_box','next']" @click="add">></div>   
            </div>
        </div>
            
    </div>
</template>

<script>
export default {
    props: {
        total: Number, 
        size: {
            default: 10,
            type: Number
        }, 
    },
    data() {
        return {
            curPageNo: 1, // 当前页码
            middleNo: 4, // 中间展开栏中间页码，影响middleList
            middleList: [1,2,3,4,5,6,7],
            right: '...',
            left: '...',
        }
    },
    computed: {
        // 总页码
        pageNum() {
            return parseInt(this.total/this.size) + (this.total%this.size? 1 : 0) 
        }
    },
    methods: {
        reduce() {
            if(this.curPageNo <=1) {
                return 
            }else {
                this.curPageNo -=1
            }
        },
        add() {
             if(this.curPageNo < this.pageNum) {
               this.curPageNo +=1
            }else {
                return 
            }
        },
        changePageNo(pageNo) {
            this.curPageNo = pageNo;
            this.$emit('pageChange', pageNo)
        },
        clickMore() {
            if(this.middleNo + 7 < this.pageNum) { // middleNo小于最大页码
                this.middleNo = this.middleNo  + 7;
                this.curPageNo = this.middleNo;
            }else { // 否则定死middleNo(watch监听了middleNo，影响middleList)
                this.middleNo = this.pageNum - 3;
            }
          
        },
        // 向前事件
        clickPre() {
            this.middleNo = this.middleNo  - 7;
            this.curPageNo = this.middleNo;
        }
    },
    watch:{
        curPageNo(t) {
            if(t > 7) {
                if(t <= this.pageNum - 7) this.middleNo = t
                else this.middleNo = this.pageNum - 3
            }
            else this.middleNo = 4;
            this.$emit('pageChange', t)
        },
        middleNo(t) {
            if(t > 7) this.middleList = [t-3, t-2, t-1, t, t+1, t+2, t+3]
            else this.middleList = [1,2,3,4,5,6,7]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/com.scss';
    .page_box{
        .each_box{
            // border: 1px solid #ccc;
            display: inline-block;
            margin-left: 5px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            background-color: #f4f4f5;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            @include set_font(14px, #999);
        }
        .selected{
            @include set_bg_color;
            color: #fff;
            //  border: 1px solid #fff;
        }
        .each_box:hover{
            @include set_bg_color;
            color: #fff;
        }
        .pre:hover, .next:hover{
            font-size: 18px;
            @include set_theme_color;
             background-color: #f4f4f5;
        }
    }
</style>


