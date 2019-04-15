<template>
    <div class="onBox">
        <div v-for="(one, index) in list" :key="index" class="eachBox" >
            <!--<div class="header">
                <img src="/statics/2018/07/25/1532496567_logo.png" alt="">
                <span class="order_id">订单号：{{one.order_no}}</span>
            </div>-->
            <div class="box">
                <div class="left">
                     <img :src="one.cover" alt="">
                    <div class="det">
                        <div>{{one.name}}</div>
                        <div>{{one.description}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="gotoComment" @click="gotoComment(one)">查看评价</div>
                </div>
                
            </div>
        </div>
         <self-page v-if="currCount>0" :total="currCount" class="rs_page_box" :size="currSize" @pageChange="pageChange"></self-page>
         <div class="dialog" v-show="is_evaluate">
            <div class="header">Evaluate</div>
            <div class="close" @click="evaluate_close_handle">×</div>
            <div>
                <div class="form">
                <div class="pro_info">
                    <img :src="evaluate_form.cover" alt="">
                    <div class="title">{{evaluate_form.name}}</div>
                </div>
                <div class="eva_score">
                    <div class="header1">商品评分：</div>
                    <div>
                    <page-star :star="evaluate_form.stars" :disabled="is_disabled" @starchange="star_change_handle"></page-star>
                    </div>
                </div>
                <div>
                    <div class="header1">商品评价：</div>
                    <div>
                    <textarea v-model="evaluate_form.content" :disabled="is_disabled" rows="4"></textarea>
                    </div>
                </div>
                <div>
                    <div class="header1" v-if="!is_disabled">上传图片</div>
                    <div class="header1" v-else>图片</div>
                    <div>
                    <div class="upload_img" v-for="(item,index) in evaluate_form.media_list" :key="index">
                        <img :src="item" alt="">
                    </div>
                    <div class="upload" v-if="!is_disabled">
                        <div>+</div>
                        <input class="change" @change='uplaod_img_handle' type="file">
                    </div>
                    </div>
                    <div class="clear"></div>
                </div>
                </div>
            </div>
            <div class="button_bottom" v-if="!is_disabled">
                <input type="button" class="save woocommerce-Button button theme_bg_color" value="确定" @click="is_evaluate = false">
            </div>
        </div>
    </div>
</template>

<script>
import pageStar from "@/components/star";
export default {
     components: {
    pageStar
  },
    data() {
        return {
           list: [],
           currCount: 0,
           currSize: 10,
           is_evaluate: false,
               is_disabled: true,
                 imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
             evaluate_form: {
                select: [],
                cover: "",
                name: "",
                content: "",
                id: "",
                media_list: [],
                order_id: "",
                product_id: "",
                stars: 0
            },
            baseurl: '',
            
        }
    },
    mounted() {
        this.baseurl = baseurl
       this.getList()
    },
    methods: {
        pageChange(val) {
            this.getList(val);
        },
        getList(page = 1) {
             this.$store.dispatch('showLoding', true)
            api.get('/api/orders/products', {comment: true, size: 10, page: page}).then(res => {
                 this.$store.dispatch('showLoding', false)
                this.currCount = res.data.count;
                this.list = res.data.docs
                setTimeout(() => {
                },100)
            })
        },
    //      () {
    //   if (this.evaluate_form.stars == 0) {
    //     this.$store.dispatch("setTip", {
    //       type: "err",
    //       msg: "请选择商品评分"
    //     });
    //     return;
    //   }
    //   if (this.evaluate_form.content == 0) {
    //     this.$store.dispatch("setTip", {
    //       type: "err",
    //       msg: "请输入商品评价"
    //     });
    //     return;
    //   }
    //   var postaData = Object.assign({}, this.evaluate_form);
    // //   delete postaData.select;
    //   delete postaData.cover;
    //   delete postaData.name;
    //    this.$store.dispatch('showLoding', true)
    //   api.post("/api/product-comments", postaData).then(res => {
    //     if (res.data.code == 200) {
    //       this.isShowDialog = false;
    //       this.is_evaluate = false;
    //       this.$store.dispatch("setTip", {
    //         type: "success",
    //         msg: '评价成功'
    //       });
    //       this.getList()
    //     //   var select = this.evaluate_form.select;
    //     //   this.list[select[0]].product_list[select[1]].is_comment = true;
    //     } else {
    //       this.$store.dispatch("setTip", {
    //         type: "err",
    //         msg: res.data.msg
    //       });
    //     }
    //     this.$store.dispatch('showLoding', false)
    //   });
    // },
    evaluate_close_handle() {
      this.isShowDialog = false;
    //   this.is_disabled = false;
      this.is_evaluate = false;
    },
      star_change_handle(num) {
      this.evaluate_form.stars = num;
    },
      uplaod_img_handle(event) {
      let reader = new FileReader();
      let img1 = event.target.files[0];
      let type = img1.type; //文件的类型，判断是否是图片
      let size = img1.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 3145728) {
        alert("请选择3M以内的图片！");
        return false;
      }
      var uri = "";
      let form = new FormData();
      form.append("file", img1, img1.name);
      api.post("/api/upload", form).then(res => {
        this.evaluate_form.media_list.push(res.data.data[0]);
      });
    },
        gotoComment(d) {
            api.get('/api/product-comments/order', {productId: d.product_id, orderId: d.order_id}).then(res => {
                this.is_evaluate = true;
                this.evaluate_form = Object.assign({}, res.data, {name: d.name, cover: d.cover})
                    // this.evaluate_form = {
                    //     // select: select,
                    //     cover: d.cover,
                    //     name: d.name,
                    //     content: "",
                    //     id: "",
                    //     media_list: [],
                    //     order_id: d.order_id,
                    //     product_id: d.product_id,
                    //     stars: d.num
                    // };
            })
        },
            
    },
    watch:{
        
    }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/com.scss";
    .onBox{
        .eachBox{
            border: 1px solid #e5e5e5;
            margin-top: 10px;
            border-radius: 5px;
          .box{
               display: flex;
              .left{
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  border-right: 1px solid #e5e5e5;
                  img{
                      width: 100px;
                      height: 100px;
                  }
                  .det{
                      padding-left: 10px;
                      width: 660px;
                  }
              }
              .right{
                  .gotoComment{
                        width: 100px;
                        padding: 5px 21px;
                        border-radius: 3px;
                        background-color: #119f3c;
                        color: #fff;
                        font-size: 13px;
                        font-weight: 600;
                        text-align: center;
                        margin-top: 45px;
                        margin-left: 50px;
                        cursor: pointer;
                  }
              }
          }
        }
        .rs_page_box{
            display: flex;
            justify-content: flex-end; 
            margin-top: 30px
        }
    }
    .dialog {
  position: fixed;
  padding: 0 20px;
  left: 50%;
  top: 20vh;
  margin-left: -300px;
  width: 600px;
  background: #fff;
  z-index: 1000;
  .close {
    position: absolute;
    right: 9px;
    margin-top: -43px;
  }
  .header {
    height: 40px;
    line-height: 40px;
    margin-left: -20px;
    margin-right: -20px;
    padding: 0 20px;
    background-color: #f5f5f5;
    margin-bottom: 10px;
  }
  .form {
    margin-bottom: 20px;
    .pro_info {
      display: flex;
      align-items: center;
      height: 80px;
      img {
        max-width: 60px;
        max-height: 60px;
      }
      .title {
        padding: 0 20px;
      }
    }
    .eva_score {
      display: flex;
      align-items: center;
    }
    textarea {
      min-height: 70px !important;
    }
    .header1 {
      height: 30px;
      line-height: 30px;
    }
    .upload {
      position: relative;
      cursor: pointer;
      height: 60px;
      width: 60px;
      border: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #e1e1e1;
      float: left;
      margin-bottom: 10px;
      .change {
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 0;
        width: 60px;
        height: 60px;
        opacity: 0;
      }
    }
    .upload_img {
      height: 60px;
      width: 60px;
      border: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      img {
        max-width: 60px;
        max-height: 60px;
      }
    }
  }
  .button_bottom {
    margin-bottom: 20px;
    text-align: right;
    .save {
      margin-left: 10px;
      width: 100px;
      color: #fff;
      text-align: center;
      padding: 10px 20px !important;
    }
  }
}
</style>