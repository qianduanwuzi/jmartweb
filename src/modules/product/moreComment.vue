<template>
    <div class="more_comment_box">
        <!--<div class="header">
            <div @click="$router.back()"><</div>
            <div class="tit">商品评价</div>
        </div>-->
        <!-- <div id="mescroll" class="mescroll">  -->
            <div class="more_comment_in_box">
                <div v-for="(one, index) in comment.docs" :key="index" class="each_comment_box">
                    <div class="name_data" style="display: flex;justify-content: space-between;color:#999">
                        <div>{{secret(one.username)}}</div>
                        <div>{{moment(one.created_at).format('YYYY-MM-DD')}}</div>
                    </div>
                    <div>
                        <div>{{one.content}}</div>
                        <div class="row">
                            <div class="col-2 " v-for="sone in one.media_list.slice(0,5)" :key="sone">
                                <img :src="sone" alt="" style="margin-right: 10px;" @click="showComImg(one)">
                                <!-- <img src="../../assets/logo.png" alt=""> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div>   -->
           <div class="zz" v-show="showImg">
                <div class="" style="height: 10%;position: relative;padding-top: 10px">
                <i class="fa fa-close" style="color: #fff;font-size: 26px" @click="showImg = false"></i>
                <div style="position: absolute;color: #fff;top: 10px;left: 50%;transform: translateX(-50%)"> {{$refs.mySwiper && $refs.mySwiper.swiper? ($refs.mySwiper.swiper.activeIndex+1) +'/'+ curCom.media_list.length : ''}}</div> 
                </div>
                <div class="" style="height: 75%">
                <swiper :options="swiperOption" class="swiper-container" style="width: 100%" ref="mySwiper">
                        <swiper-slide v-for="(slide, index) in curCom.media_list" :key="index" >
                        <img :src="slide" alt="" style="width: 100%; max-height: 75vh">
                            <!-- <img :src="slide" alt="" style="width: 100%; max-height: 80vh"> -->
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="" style="height: 15%;color: #fff;overflow-y: auto">
                <div>{{secret(curCom.username || '')}}</div> 
                <div style="color: rgb(153, 153, 153)">{{detailData.name}}</div> 
                <div>{{curCom.content}}</div>
                </div>
            </div>
    </div>
</template>


<script>
import moment from "moment"
import seturl from "@/mixins/setbaseurl";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
      mixins: [seturl],
      components: {swiper, swiperSlide},
    data() {
        return {
            comment: [],
            curPage: 0,
            moment,
            pdlist: [],
            showImg: false,
            swiperOption: {},
            curCom:  {username: '',media_list: [] } ,
            detailData: {},
        }
    },
    mounted() {
        let curId = this.$route.fullPath.match(/\d{1,}/)[0];
        this.getComment();
        this.getProductDetail();
//         var mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
//             // down: {
//             //     callback: downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
//             // },
//             up: {
//                 auto: false,
//                 callback: this.upCallback, //上拉加载回调,简写callback:function(page){upCallback(page);}
// //                 empty:{ //配置列表无任何数据的提示
// // 							warpId:this.comment,
// // 							icon : "" , 
// // 						  	tip : "亲,暂无相关数据哦~" , 
// // //						  	btntext : "去逛逛 >" , 
// // //						  	btnClick : function() {
// // //						  		alert("点击了去逛逛按钮");
// // //						  	} 
// // 						},
//             }
//         });

    },
    methods: {
          showComImg(d) {
      this.curCom = Object.assign(d)
      //遮罩 img放大展示
      this.showImg = true
    },
        //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
				// upCallback: function(page) {
				// 	//联网加载数据
				// 	var self = this;
				// 	getListDataFromNet(page.num, page.size, function(curPageData) {
				// 		//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
						
				// 		//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
				// 		if(page.num == 1) self.pdlist = [];
						
				// 		//更新列表数据
				// 		self.pdlist = self.pdlist.concat(curPageData);
						
				// 		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 		//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
				// 		console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.pdlist.length==" + self.pdlist.length);
						
				// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 		//self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
						
				// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 		//self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
						
				// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 		//self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
						
				// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
				// 		self.mescroll.endSuccess(curPageData.length);
					
				// 	}, function() {
				// 		//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
				// 		self.mescroll.endErr();
				// 	});
				// },
        upCallback() {
            this.curPage = this.curPage + 1
            this.getComment(this.curPage)
        },
         // get 评价
        getComment(page  = 1) {
            api.get('/api/product-comments/list', {page: page, productId: this.$route.params.id, size: 10}).then(res => {
                this.comment = res.data
            })
        },
          // get 产品详情
    getProductDetail() {
      // if(id)
      api.get("/api/products/" + this.$route.params.id).then(res => {
        document.title = res.data.name+'-Jmart8'
        this.detailData = Object.assign({}, res.data);
      });
    },
        secret(name) {
      if (name.length == 1) return name;
      if (name.length == 2) return name.slice(0, 1) + "*";
      // if(name.length == 3) return name.slice(0,1) + '*' + name.slice(2,3)
      if(name.length)
      return (
        name.slice(0, 1) +
        "*".repeat(name.length - 2) +
        name.slice(name.length - 1)
      );
      return ''
    },
    }
}
	/*联网加载列表数据
		 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
		 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
		 * */
// 		function getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
// 			//延时一秒,模拟联网
//             setTimeout(function () {
//          	api.get('/api/product-comments/list', {
//                         productId: this.$route.params.id,
// 						num: pageNum, //页码
// 						size: pageSize //每页长度
// 					}
// 				)
// 				.then(function(res) {
//                      this.comment = res.data
// 					// var data=pdlist1; // 模拟数据: ../res/pdlist1.js
//                 	// var listData=[];//模拟分页数据
// 					// for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
// 	            	// 	if(i==data.length) break;
// 	            	// 	listData.push(data[i]);
// 	            	// }
//                 	// successCallback&&successCallback(listData);//成功回调
// //				})
// //				.catch(function(error) {
// //					errorCallback&&errorCallback()//失败回调
// //				});
//             },500)
// 		}
//             )}
</script>


<style lang="scss">
@media all and(max-width: 1200px){
  .portal_header_box, .portal_footer_box, .sus_box, .single-post-navigation, .woodmart-single-footer{
      display: none;
  }
  .more_comment_box{
      .header{
          display: flex;
          position: fixed;
          top:0;
          padding-left: 10px;
          line-height: 28px;
          width: 100%;
           border-bottom: 1px solid rgba(122, 122, 122, .4);
           .tit{
               flex: 1;
               text-align: center;
           }
      }
        .more_comment_in_box {
            margin-top: 8px;
            padding: 10px;
                .each_comment_box {
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(122, 122, 122, .1);
                }
            }

  }
   .zz{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    background: #333;
  }

}
    
</style>