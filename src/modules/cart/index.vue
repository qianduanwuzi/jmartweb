<template>
    <div class="main-page-wrapper cart_out_box">
        <div class="page-title-default title-size-default title-design-centered color-scheme-light" style="background: black">
            <div class="container">
                <header class="entry-header">
                    <div class="woodmart-checkout-steps">
                        <ul>
                            <li class="step-cart step-active">
                                <a href="#/cart">
                                    <span>购物车</span>
                                </a>
                            </li>
                            <li class="step-checkout step-inactive">
                                <a href="#/checkout">
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
        <div class="content_box row">
            <div class="col-sm-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>产品</th>
                            <th>价格</th>
                            <th>数量</th>
                            <th>合计</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="one in cartList.carts" :key="one.id">
                            <td @click="remove(one.id)">
                                <i class="fa fa-times close_icon"></i>
                            </td>
                            <td>{{one.product_name}}</td>
                            <td>
                                <span v-if="one.is_promote">$
                                    <span style="color: #777777; text-decoration: line-through">{{one.price}}</span>
                                    <span> {{one.promote_price}}</span>
                                </span>
                                <span v-else>
                                    <span>${{one.price}}</span>
                                </span>
                            </td>
                            <td>
                                <div class="quantity">
                                    <input type="button" value="-" class="minus re_hover" @click="one.num = one.num -1">
                                    <input type="number" class="input-text qty text" v-model="one.num">
                                    <input type="button" value="+" class="plus re_hover" @click="one.num = one.num + 1">
                                </div>
                            </td>
                            <td style="color: #119f3c;font-weight: 600">${{one.is_promote? one.promote_price*one.num : one.price*one.num}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cart_total col-sm-4">
                <h2>购物车总计</h2>
                <div class="det">
                    <label for="">小计</label>
                    <div>${{total}}</div>
                </div>
                <div class="det">
                    <label for="">配送</label>
                    <div class="theme_font_color">计算运费</div>
                </div>
                <div class="det total">
                    <label for="">合计</label>
                    <div class="theme_font_color">${{total}}</div>
                </div>
                <button type="button" class="btn btn-success theme_bg_color" style="width: 100%;color: #fff" @click="balance_handle">去结算</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cartList: "getCarts"
    }),
    total() {
      let total = 0;
      var arr = this.cartList.carts.map(one => {
        return one.num * (one.is_promote ? one.promote_price : one.price);
      });
      arr.forEach(one => {
        total = total + one;
      });
      return total;
    }
  },
  mounted() {
    this.$store.dispatch("getCart", { show: false });
  },
  methods: {
    remove(id) {
      api.delete("/api/carts/" + id).then(res => {
        this.$store.dispatch("getCart", { show: false });
      });
    },
    balance_handle() {
      var order_item = [];
      this.cartList.carts.forEach(item => {
        if (item.num > 0) order_item.push(item);
      });
      if (order_item.length > 0) {
        sessionStorage.setItem("checkout_list", JSON.stringify(order_item));
        this.$router.push("/checkout");
      } else {
        this.$store.dispatch("setTip", {
          type: "err",
          msg: "Please choose the settlement goods"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/com.scss";
.cart_out_box {
  .content_box {
    @include view_layout;
    margin-top: 40px;
    table th {
      border-top: none;
    }
    table td {
      line-height: 35px;
    }
    .close_icon:hover {
      cursor: pointer;
      transform: scale(1.25, 1.25);
    }
    .cart_total {
      border: 3px solid #efefef;
      padding: 25px;
      .det {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(230, 230, 230);
        line-height: 50px;
        font-weight: 600;
        label {
          font-weight: 600;
        }
      }
      .total {
        font-size: 18px;
        label {
          font-size: 18px;
        }
      }
    }
  }
}
</style>


