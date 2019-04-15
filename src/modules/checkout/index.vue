<template>
  <div class="main-page-wrapper cart_out_box">
    <div class="page-title-default title-size-default title-design-centered color-scheme-light" style="background: black">
      <div class="container">
        <header class="entry-header">
          <div class="woodmart-checkout-steps">
            <ul>
              <li class="step-cart step-inactive">
                <a href="#/cart">
                  <span>购物车</span>
                </a>
              </li>
              <li class="step-checkout step-active">
                <a>
                  <span>结算</span>
                </a>
              </li>
              <li class="step-complete step-inactive">
                <span>订单完成</span>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
    <div class="content_box">
      <div class="centent">
        <div class="order-tip">确认订单信息</div>
        <div class="card">
          <div class="header">
            <div style="width:850px;">收货人</div>
            <div class="add-but" @click="showAddress_handle">选择地址</div>
          </div>
          <div class="con">
            <div class="addr-item" v-if="is_address">
              <div class="no-address">没有地址</div>
            </div>
            <div class="addr-item" v-else>
              <div class="name">{{defalut_address.first_name}} {{defalut_address.last_name}}</div>
              <div class="address">{{defalut_address.province}} {{defalut_address.city}} {{defalut_address.area}} {{defalut_address.street}}</div>
            </div>

          </div>
          <div class="header">商品列表</div>
          <div class="con">
            <div class="product-item" v-for="(item,index) in product_list" :key="index">
              <img :src="item.cover" alt="">
              <div class="pro_name">{{item.product_name}}</div>
              <div class="pro_price">${{item.price}}</div>
              <div>x{{item.num}}</div>
            </div>
            <div class="total">
              商品总金额：
              <span>${{totalPrice}}</span>
            </div>
          </div>
          <div class="" style="color: #333;display: flex; align-items: flex-start">
            <div>结账方式</div>
            <div class="pay-item">
              <div v-show="!cardInfo.length">   
                <button @click="$router.push('/my-account/account/bank-card')" class="theme_bg_color" style="color: #fff;border-radius: 5px">添加信用卡</button>
              </div>
              <div v-show="cardInfo.length && !defaultObj.id">   
                <button @click="$router.push('/my-account/account/bank-card')" class="theme_bg_color" style="color: #fff;border-radius: 5px">设置默认支付信用卡</button>
              </div>
               <div v-show="cardInfo.length && defaultObj.id" :style="{'display': !showAll? 'flex' : ''}">
                <div v-for="(one, index) in cardInfo" :key="one.id" style="display: flex;align-items: center">
                   <input v-show="showAll" type="radio"  :value="one.is_default" :checked="one.is_default" :style="{appearance: 'radio', 'margin-top': showAll? index? '20px':'0' : '0' }" @click="setDefault(one)">
                   <div class="card_info" v-if="showAll? true : defaultObj.id == one.id" :style="{'margin-top': showAll? index? '20px':'0' : '0'}">
                      <span class="brand">{{one.account.brand}}</span>
                      <span class="card_no">**** **** **** {{one.account.last4}}</span>
                      <span class="ex_date">{{one.account.exp_month}} / {{one.account.exp_year}}</span>
                  </div>
                </div>
                <button v-show="!showAll && cardInfo.length>1" class="theme_bg_color" style="color: #fff;border-radius: 5px;margin-left: 20px" @click="changeCard">切换信用卡</button>
            </div>
            </div>
          </div>

          <div class="header">标注</div>
          <div class="con">
            <textarea rows="3" v-model="form.remark" style="min-height:80px;"></textarea>
          </div>

        </div>
        <div class="submit_but" @click="submit_handle">
          确认并支付
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <div class="cover" v-if="isShowDialog">

    </div>
    <div class="dialog_addr_list" v-show="isShowDialog" :style="`z-index:${is_Edit?998:1000}`">
      <div class="header">My address</div>
      <div class="close" @click="isShowDialog=false">×</div>
      <div class="new">
        <div class="btn" @click="add_address_handle">New address</div>
      </div>
      <div class="dialog_con">
        <div class="addr_item" v-for="(item,index) in addr_list" :key="index">
          <div :class="`name ${item.active?'active':''}`" @click="change_address_handle(index)">{{item.first_name}} {{item.last_name}}</div>
          <div class="address"> {{item.province}} {{item.city}} {{item.area}} {{item.street}}
            <div class="default" v-if="item.is_default">Defalut address</div>
          </div>
          <div class="opear">
            <div class="default" v-if="!item.is_default" @click="default_address_handle(item.id)">Defalut</div>
            <div class="edit" @click="edit_address_handle(index)">Edit</div>
          </div>
        </div>

      </div>
      <div class="dialog_bottom">
        <div class="btn" @click="confirm_address_handle">Confirm</div>
      </div>
    </div>

    <div class="dialog" v-if="is_Edit">
      <div class="header">Address</div>
      <div class="close" @click="close_form_handle">×</div>
      <div>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="First name">
            First name&nbsp;
            <span class="required">*</span>
          </label>
          <input type="text" v-model="addr_form.first_name" class="input-text" placeholder="First name">
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="Last name">
            Last name&nbsp;
            <span class="required">*</span>
          </label>
          <input type="text" v-model="addr_form.last_name" class="input-text" placeholder="Last name">
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="Mobile">
            Mobile&nbsp;
            <span class="required">*</span>
          </label>
          <input type="text" v-model="addr_form.phone" class="input-text" placeholder="Mobile">
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label>
            State/Province&nbsp;
            <span class="required">*</span>
          </label>
          <select v-model="addr_form.province2" @change="province_change_handle">
            <option v-for="(item,index) in stateList" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label>
            City/Area&nbsp;
            <span class="required">*</span>
          </label>
          <select v-model="addr_form.area2" @change="area_change_handle">
            <option v-for="(item,index) in areaList" :key="index" :value="item.id">{{item.city}}/{{item.county}}</option>
          </select>
        </p>

        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="Detail address">
            Detail address&nbsp;
            <span class="required">*</span>
          </label>
          <input type="text" v-model="addr_form.street" class="input-text" placeholder="Detail address">
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide _check">
          <label for="Detail address">
            Default address&nbsp;
          </label>
          <span>
            <input type="checkbox" class="input_check" v-model="addr_form.is_default" id="check3">
            <label for="check3"></label>
          </span>
        </p>
      </div>
      <div class="button_bottom">
        <input type="button" class="cance" value="取消" @click="close_form_handle">
        <input type="button" class="save woocommerce-Button button theme_bg_color" value="保存" @click="save_handle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: false,
      is_Edit: false,
      defalut_address: {},
      is_address: false,
      product_list: [],
      totalPrice: 0,
      form: {
        product_list: [],
        remark: ""
      },
      addr_list: [],
      stateList: [],
      areaList: [],
      addr_form: {
        id: "",
        first_name: "",
        last_name: "",
        phone: "",
        province: "",
        province2: "",
        city: "",
        area: "",
        area2: "",
        street: "",
        is_default: false
      },
      cardInfo: [],
      defaultObj: {},  // 默认支付卡信息
      showAll: false, // 显示全部
    };
  },
  mounted() {
    this.getCard()
    api.get("/api/my-addresses/default").then(res => {
      // debugger;
      this.defalut_address = res.data || {};
      if (!this.defalut_address.id) this.is_address = true;
    });
    var pro_list_str = sessionStorage.getItem("checkout_list");
    if (pro_list_str) {
      this.product_list = JSON.parse(pro_list_str);
      this.product_list.forEach(item => {
        this.totalPrice += item.price * item.num;
      });
    }
    api.get("/api/region/states").then(res => {
      this.stateList = res.data;
    });
    
  },
  methods: {
    setDefault(d) {
      this.showAll = false;
      this.defaultObj = Object.assign({}, d);
    },
    changeCard() {
      this.showAll = true;
    },
      // 获取已绑定卡信息
    getCard() {
       this.$store.dispatch('showLoding', true)
        api.get('/api/users/my-card').then(res => {
            if(res && res.data.length) {
                this.isBind = true;
                this.cardInfo = res.data;
                this.defaultObj = Object.assign({}, res.data.find(one => one.is_default))
            }
            this.$store.dispatch('showLoding', false)
        })
    },
    submit_handle() {
      if(!this.cardInfo.length){
         this.$store.dispatch("setTip", {
          type: "err",
          msg: "请先绑定信用卡"
        });
        return;
      }
      if(!this.defaultObj.id){
         this.$store.dispatch("setTip", {
          type: "err",
          msg: "请先设置一张默认支付的信用卡"
        });
        return;
      }
      if (this.is_address) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please select the address"
        });
        return;
      }
      this.$store.dispatch('showLoding', true)
      this.form = Object.assign(this.form, this.defalut_address);
      delete this.form.id;
      delete this.form.created_at;
      delete this.form.updated_at;
      delete this.form.is_default;

      this.product_list.forEach(item => {
        this.form.product_list.push({
          num: item.num,
          product_id: item.product_id
        });
      });
      api.post("/api/orders", this.form).then(res => {
        if (res.data.code == 200) {
          this.$store.dispatch("getCart", { show: false });
          api.post("/api/orders/pay", {order_id: res.data.data.id, card_id: this.defaultObj.id})
            .then(res => {
            if(res){
              this.$store.dispatch('showLoding', false)
                this.$store.dispatch('setTip', { type: 'success', msg: '支付成功!'})
                this.$router.push('/my-account/account/bank-card')
                this.$router.push({ path: "/my-account/account/order" });
              }
            });
        }
      });
    },
    showAddress_handle() {
      this.isShowDialog = true;
      this.load_address_list_handle();
    },
    load_address_list_handle() {
      api.get("/api/my-addresses").then(res => {
        this.addr_list = res.data;
        if (this.defalut_address.id) {
          this.addr_list.forEach(item => {
            if (item.id == this.defalut_address.id)
              this.$set(item, "active", true);
            else this.$set(item, "active", false);
          });
        }
      });
    },
    add_address_handle() {
      this.is_Edit = true;
      this.clear_form_handle();
    },
    default_address_handle(id) {
      api.post("/api/my-addresses/default?id=" + id).then(res => {
        this.addr_list.forEach(item => {
          if (item.id == id) item.is_default = true;
          else item.is_default = false;
        });
      });
    },
    edit_address_handle(index) {
      this.addr_form = Object.assign({}, this.addr_list[index]);
      var p_item = this.stateList.filter(
        x => x.name == this.addr_form.province
      );
      if (p_item.length > 0) {
        this.addr_form.province2 = p_item[0].id;
        api
          .get("/api/region/cities", { stateId: this.addr_form.province2 })
          .then(res => {
            this.areaList = res.data;
            var a_list = this.areaList.filter(
              x =>
                x.city == this.addr_form.city && x.county == this.addr_form.area
            );
            if (a_list.length > 0) this.addr_form.area2 = a_list[0].id;
          });
      }
      this.is_Edit = true;
    },
    change_address_handle(index) {
      this.addr_list.forEach((item, idx) => {
        if (index == idx) this.$set(item, "active", true);
        else this.$set(item, "active", false);
      });
      // console.log("index=>", index, this.addr_list);
    },
    confirm_address_handle() {
      debugger;
      var isFlag = false;
      var active_item = {};
      this.addr_list.forEach(item => {
        if (item.active) {
          active_item = Object.assign({}, item);
          isFlag = true;
        }
      });
      if (isFlag) {
        delete active_item.active;
        this.$nextTick(() => {
          this.defalut_address = active_item;
          this.is_address=false;
          this.isShowDialog = false;
        });
      } else {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the receiving address"
        });
      }
    },
    clear_form_handle() {
      this.addr_form = {
        id: "",
        first_name: "",
        last_name: "",
        phone: "",
        province: "",
        area2: "",
        city: "",
        area: "",
        street: "",
        is_default: false
      };
    },
    close_form_handle() {
      this.is_Edit = false;
      this.clear_form_handle();
    },
    province_change_handle() {
      // debugger;
      this.addr_form.province = this.stateList.filter(
        x => x.id == this.addr_form.province2
      )[0].name;

      api
        .get("/api/region/cities", { stateId: this.addr_form.province2 })
        .then(res => {
          this.areaList = res.data;
        });
    },
    area_change_handle() {
      var area_f = this.areaList.filter(x => x.id == this.addr_form.area2)[0];
      this.addr_form.city = area_f.city;
      this.addr_form.area = area_f.county;
    },
    save_handle() {
      if (!this.addr_form.first_name) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the first name"
        });
        return;
      }
      if (!this.addr_form.last_name) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last name"
        });
        return;
      }
      if (!this.addr_form.phone) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last mobile"
        });
        return;
      }
      if (!this.addr_form.province2) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the State/Province"
        });
        return;
      }
      if (!this.addr_form.area2) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the City/Area"
        });
        return;
      }
      if (!this.addr_form.street) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last detail addres"
        });
        return;
      }
      var postData = Object.assign({}, this.addr_form);
      delete postData.area2;
      delete postData.province2;
      if (this.addr_form.id == "") {
        api.post("/api/my-addresses", postData).then(res => {
          this.is_Edit = false;
          this.clear_form_handle();
          this.load_address_list_handle();
        });
      } else {
        api.put("/api/my-addresses", postData).then(res => {
          this.is_Edit = false;
          this.clear_form_handle();
          this.load_address_list_handle();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content_box {
  .centent {
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
    .order-tip {
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
    }
    .card {
      padding: 0 20px 20px 20px;
             .pay-item {
          margin-left: 20px;
          /*height: 30px;*/
          /*line-height: 19px;*/
          /*padding: 5px 10px;*/
          /*width: 120px;*/
          text-align: center;
          cursor: pointer;
          /*border: 1px solid #ddd;*/
          .card_info{
            /*padding-left: 20px;*/
            line-height: 40px;
            height: 40px;
            border-radius: 5px;
            color: #fff;
            width: 350px;
            background: linear-gradient(to right, rgb(17, 159, 60),#00DB00); /* Safari 5.1 - 6.0 */
            .brand{
                font-style:italic;
                font-size: 16px;
                display: inline-block;
                text-align: left;
                width: 110px;
            }
            .card_no{
                margin-left: 10px;
            }
            .ex_date{
                margin-left: 10px;
            }
}
        }
      .header {
        line-height: 40px;
        height: 40px;
        color: #333;
        display: flex;
        align-items: center;
        .add-but {
          cursor: pointer;
          color: #119f3c;
        }
        .add-but:hover {
          color: #f00;
        }
 
      }
      .con {
        padding: 0 20px;
        .addr-item {
          height: 30px;
          margin: 6px 0;
          display: flex;
          align-items: center;
          .no-address {
            width: 100%;
            color: #f00;
            text-align: center;
          }
          div {
            margin-right: 20px;
          }
          .name {
            display: block;
            height: 30px;
            line-height: 18px;
            padding: 5px 10px;
            width: 120px;
            text-align: center;
            cursor: pointer;
            border: 1px solid #ddd;
          }
          .active {
            border: 2px solid #f00;
          }
          .address {
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            margin-left: -10px;
            flex: 1;
            display: flex;
            .default {
              margin: 5px 10px;
              background-color: #999;
              color: #fff;
              padding: 0 3px;
              line-height: 20px;
            }
          }
        }
        /*  .addr-item:hover {
          .address {
            background-color: #fff3f3;
          }
        } */
        .addr-switch {
          height: 18px;
          line-height: 18px;
          padding: 5px 20px;
          cursor: pointer;
        }
        .product-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.125);
          img {
            max-width: 60px;
            max-height: 60px;
          }
          div {
            margin-left: 20px;
          }
          .pro_name {
            width: 700px;
          }
          .pro_price {
            width: 100px;
          }
        }
        .total {
          text-align: right;
          span {
            color: #f00;
            font-size: 18px;
          }
        }
      }
    }
  }
  .submit_but {
    float: right;
    text-align: center;
    margin-top: 20px;
    width: 135px;
    height: 36px;
    line-height: 36px;
    margin: 8px 10px 0 0;
    padding: 0;
    background-color: #e00;
    overflow: hidden;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    font-family: arial, "Microsoft YaHei";
    border-radius: 3px;
    cursor: pointer;
    border: 0;
  }
}
.cover {
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 999;
}
.dialog_addr_list {
  position: fixed;
  padding: 0 20px;
  left: 50%;
  top: 20vh;
  margin-left: -500px;
  width: 1000px;
  background: #fff;
  min-height: 500px;
  padding-bottom: 20px;
  z-index: 1000;
  .close {
    position: absolute;
    right: 9px;
    margin-top: -43px;
  }
  .new {
    text-align: right;
    .btn {
      background-color: #119f3c;
      color: #fff;
      width: 130px;
      text-align: center;
      height: 30px;
      line-height: 8px;
    }
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
  .dialog_con {
    margin-bottom: 50px;
    .addr_item {
      display: flex;
      height: 40px;
      align-items: center;
      div {
        margin-right: 10px;
      }
      .name {
        display: block;
        height: 30px;
        line-height: 18px;
        padding: 5px 10px;
        width: 120px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
      }
      .active {
        border: 2px solid #f00;
      }
      .address {
        flex: 1;
        padding-left: 10px;
        display: flex;
        align-items: center;
        .default {
          margin: 5px 10px;
          background-color: #999;
          color: #fff;
          padding: 0 3px;
          line-height: 20px;
        }
      }
      .opear {
        display: none;
        width: 150px;
        margin: 0 -10px;
        height: 30px;
        align-items: center;
        justify-content: flex-end;
        .default {
          color: #119f3c;
          cursor: pointer;
        }
        .edit {
          cursor: pointer;
          color: #119f3c;
        }
        .edit:hover {
          color: #f00;
        }
      }
    }
    .addr_item:hover .address {
      background-color: #fff3f3;
    }
    .addr_item:hover .opear {
      display: block;
      display: flex;
      align-items: center;
      background-color: #fff3f3;
    }
  }
  .dialog_bottom {
    position: absolute;
    bottom: 10px;
    right: 20px;
    .btn {
      background-color: #e00;
      color: #fff;
      width: 120px;
      text-align: center;
    }
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
}
._check {
  span {
    position: relative;
  }
  .input_check {
    position: absolute;
    visibility: hidden;
  }
  .input_check + label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #ffd900;
  }
  .input_check:checked + label:after {
    content: "";
    position: absolute;
    left: 5px;
    bottom: 16px;
    width: 12px;
    height: 6px;
    border: 2px solid #e92333;
    border-top-color: transparent;
    border-right-color: transparent;
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    transform: rotate(-45deg);
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
  }
}
</style>
