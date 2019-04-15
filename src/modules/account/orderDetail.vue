<template>
  <div class="order_box">
    <div class="order_info">
      <div class="header">订单信息</div>
      <div class="content">
        <div class="form_item">
          <span>订单号：</span>{{form.order_no}}
        </div>
        <div class="form_item">
          <span>状态：</span> {{form.status_text}}
        </div>
         <div class="form_item" v-show="form.status == 'IN_DISTRIBUTION' && form.delivery_method == 'SELF' && new Date().getTime() <= new Date(form.expected_arrival_time).getTime()">
          <span>预计时间：</span><span class="yjddsj theme_font_color" v-html="formatDate(form.expected_arrival_time)"></span>
        </div>

      </div>
    </div>
    <div class="order_info">
      <div class="header">商品列表</div>
      <div class="content_pro">
        <div class="pro_item" v-for="(item,index) in form.product_list" :key="index">
          <div class="img">
            <img :src="item.cover">
          </div>
          <div class="title">{{item.name}}
          </div>
          <div class="no">
            x{{item.num}}
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    </div>
    <div class="total">
      商品总价：
      <span> ${{form.total_price}}</span>
    </div>
    <div class="order_info">
      <div class="header">收货人</div>
      <div class="content">
        <div class="form_item">
          <span>姓名：</span>{{form.first_name}} {{form.last_name}}
        </div>
        <div class="form_item">
          <span>电话：</span>{{form.phone}}
        </div>
        <div class="form_item">
          <span>邮箱：</span>{{form.email}}
        </div>
        <div class="form_item">
          <span>地址：</span>{{form.nation+" "+form.province+" "+form.city+" "+form.area+" "+form.jmart_address}}
        </div>
        <div class="form_item">
          <span>邮编：</span>{{form.zip_code}}
        </div>
        <div class="form_item">
          <span>公司：</span>{{form.company}}
        </div>
        <div class="form_item">
          <span>备注：</span>{{form.remark}}
        </div>
      </div>
    </div>
    <button @click="$router.back()" class="theme_bg_color" style="color: #fff;border-radius: 5px;float: right"><i class="fa fa-reply"style="margin-right: 5px"></i>返回</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  mounted() {
    var id = this.$route.params.id;
     this.$store.dispatch('showLoding', true)
    api.get("/api/orders/" + id).then(res => {
      this.form = res.data;
          this.$store.dispatch('showLoding', false)
    });
  },
  methods: {
       formatDate(time) {
      if (time) {
        var date1 = new Date(); //开始时间
        var date2 = new Date(time); //结束时间
        var date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        return (
          "<span style='color:#009933'>" +
          days +
          "</span><span style='color:#000'> 天</span> <span>" +
          hours +
          "</span> <span style='color:#000'>时</span> <span>" +
          minutes +
          "</span> <span style='color:#000'>分</span>"
        );
      } else return "";
    },
  }
};
</script>

<style lang="scss" scoped>
.order_box {
  min-height: 300px;
  .no_order_box {
    color: #fff;
    line-height: 40px;
    height: 40px;
    width: 950px;
    padding-left: 30px;
    a {
      color: #fff;
      font-weight: 600;
      text-decoration: underline;
      margin-right: 30px;
      margin-left: 30px;
    }
  }
}
.order_info {
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  .header {
    background: #f5f5f5;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }
  .content {
    border-top: 1px solid #e5e5e5;
    padding: 10px 0;
    .form_item {
      padding: 10px 20px;
      span {
      }
    }
  }
  .pro_item {
    border-top: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    .img {
      margin-left: 20px;
      width: 80px;
      img {
        max-width: 60px;
        max-height: 60px;
      }
    }
    .title {
      line-height: 22px;
      margin-left: 20px;
      flex: 1;
      height: 60px;
      padding: 15px 0;
    }
    .no {
      width: 60px;
    }
  }
}
.total {
  margin-top: -20px;
  text-align: right;
  height: 50px;
  line-height: 50px;
  span {
    color: #f00;
    font-size: 18px;
  }
}
</style>
