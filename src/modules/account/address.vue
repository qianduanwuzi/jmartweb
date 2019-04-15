<template>
  <div>
    <div class="top_button" @click="show_form_handle">
      添加地址
    </div>
    <div class="card" v-for="(item,index) in list" :key="index">
      <div class="close" @click="del_addr_handle(index)">×</div>
      <div v-if="item.is_default" class="default_status">默认地址</div>
      <div class="addr_info">
        <div class="addr_item">
          <span class="head">收货人</span>{{item.first_name}} {{item.last_name}}
        </div>
        <div class="addr_item">
          <span class="head">地址：</span>{{item.area}} {{item.city}} {{item.province}}
        </div>
        <div class="addr_item">
          <span class="head">街道：</span> {{item.street}}
        </div>
        <div class="addr_item">
          <span class="head">电话：</span>{{item.phone}}
        </div>
        <!--   <div class="addr_item">
          <span class="head">Email：</span>{{item.email}}
        </div> -->
      </div>
      <div class="addr_bottom">
        <div v-if="!item.is_default" class="defaut_addr" @click="default_setting_handle(index)">
          Default
        </div>
        <div class="edit" @click="edit_handle(item)">
          Edit
        </div>
      </div>
    </div>

    <div class="cover" v-show="isShowDialog">
      <div class="dialog">
        <div class="header">Address</div>
        <div class="close" @click="close_form_handle">×</div>
        <div>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="First name">
              First name&nbsp;
              <span class="required">*</span>
            </label>
            <input type="text" v-model="form.first_name" class="input-text" placeholder="First name">
          </p>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="Last name">
              Last name&nbsp;
              <span class="required">*</span>
            </label>
            <input type="text" v-model="form.last_name" class="input-text" placeholder="Last name">
          </p>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="Mobile">
              Mobile&nbsp;
              <span class="required">*</span>
            </label>
            <input type="text" v-model="form.phone" class="input-text" placeholder="Mobile">
          </p>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label>
              State/Province&nbsp;
              <span class="required">*</span>
            </label>
            <select v-model="form.province2" @change="province_change_handle">
              <option v-for="(item,index) in stateList" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </p>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label>
              City/Area&nbsp;
              <span class="required">*</span>
            </label>
            <select v-model="form.area2" @change="area_change_handle">
              <option v-for="(item,index) in areaList" :key="index" :value="item.id">{{item.city}}/{{item.county}}</option>
            </select>
          </p>

          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="Detail address">
              Detail address&nbsp;
              <span class="required">*</span>
            </label>
            <input type="text" v-model="form.street" class="input-text" placeholder="Detail address">
          </p>
          <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide _check">
            <label for="Detail address">
              Default address&nbsp;
            </label>
            <span>
              <input type="checkbox" class="input_check" v-model="form.is_default" id="check3">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      stateList: [],
      areaList: [],
      isShowDialog: false,
      form: {
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
      }
    };
  },
  mounted() {
    this.load_addr_handle();
    api.get("/api/region/states").then(res => {
      this.stateList = res.data;
    });
  },
  methods: {
    load_addr_handle() {
      this.$store.dispatch('showLoding', true)
      api.get("/api/my-addresses").then(res => {
        this.$store.dispatch('showLoding', false)
        this.list = res.data;
      });
    },
    show_form_handle() {
      this.isShowDialog = true;
    },
    close_form_handle() {
      this.isShowDialog = false;
      this.areaList = [];
      this.clear_form_handle();
    },
    clear_form_handle() {
      this.form = {
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
    province_change_handle() {
      debugger;
      this.form.province = this.stateList.filter(
        x => x.id == this.form.province2
      )[0].name;

      api
        .get("/api/region/cities", { stateId: this.form.province2 })
        .then(res => {
          this.areaList = res.data;
        });
    },
    area_change_handle() {
      var area_f = this.areaList.filter(x => x.id == this.form.area2)[0];
      this.form.city = area_f.city;
      this.form.area = area_f.county;
    },
    default_setting_handle(index) {
      var id = this.list[index].id;
      api.post("/api/my-addresses/default?id=" + id).then(res => {
        this.load_addr_handle();
      });
    },
    del_addr_handle(index) {
      if (confirm("Do you want to delete this address information?")) {
        var id = this.list[index].id;
        api.delete("/api/my-addresses/" + id).then(res => {
          this.list.splice(index, 1);
        });
      }
    },
    edit_handle(row) {
      this.form = Object.assign({}, row);
      var p_item = this.stateList.filter(x => x.name == row.province);
      if (p_item.length > 0) {
        this.form.province2 = p_item[0].id;
        api
          .get("/api/region/cities", { stateId: this.form.province2 })
          .then(res => {
            this.areaList = res.data;
            var a_list = this.areaList.filter(
              x => x.city == this.form.city && x.county == this.form.area
            );
            if (a_list.length > 0) this.form.area2 = a_list[0].id;
          });
      }
      this.isShowDialog = true;
    },
    save_handle() {
      if (!this.form.first_name) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the first name"
        });
        return;
      }
      if (!this.form.last_name) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last name"
        });
        return;
      }
      if (!this.form.phone) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last mobile"
        });
        return;
      }
      if (!this.form.province2) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the State/Province"
        });
        return;
      }
      if (!this.form.area2) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the City/Area"
        });
        return;
      }
      if (!this.form.street) {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please enter the last detail addres"
        });
        return;
      }
      this.$store.dispatch('showLoding', true)
      var postData = Object.assign({}, this.form);
      delete postData.area2;
      delete postData.province2;
      if (this.form.id == "") {
        api.post("/api/my-addresses", postData).then(res => {
          this.$store.dispatch('showLoding', false)
          this.isShowDialog = false;
          this.clear_form_handle();
          this.load_addr_handle();
        });
      } else {
        api.put("/api/my-addresses", postData).then(res => {
          this.$store.dispatch('showLoding', false)
          this.isShowDialog = false;
          this.clear_form_handle();
          this.load_addr_handle();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.top_button {
  height: 35px;
  line-height: 30px;
  width: 120px;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #119f3c;
  color: #fff;
  margin-bottom: 20px;
  cursor: pointer;
}
.card {
  padding: 20px;
  margin-bottom: 20px;
  .default_status {
    width: 115px;
    background-color: #ffaa45;
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .close {
    position: absolute;
    right: 9px;
    margin-top: -10px;
  }
  .close:hover {
    color: #f00;
  }
  .addr_info {
    .addr_item {
      height: 30px;
      line-height: 30px;
    }
  }
  .addr_bottom {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    .defaut_addr {
      cursor: pointer;
      color: #119f3c;
      margin-right: 20px;
    }
    .edit {
      color: #005ea7;
      cursor: pointer;
    }
    .edit:hover {
      color: #f00;
    }
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
