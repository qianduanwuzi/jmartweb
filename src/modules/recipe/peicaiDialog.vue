<template>
    <div v-show="show">
        <div class="woodmart-close-side woodmart-close-side-opened" @click="$emit('update:show', false)"></div>
        <div class="cart-widget-side woodmart-cart-opened">
            <div class="widget-heading">
                <h3 class="widget-title">专题</h3>
                <a @click="$emit('update:show', false)" class="close-side-widget">close</a>
            </div>
            <div class="widget woocommerce widget_shopping_cart">
                <div class="widget_shopping_cart_content" style="opacity: 1;">
                    <div class="shopping-cart-widget-body woodmart-scroll has-scrollbar">
                        <div class="woodmart-scroll-content" tabindex="0" style="right: -17px;">
                            <ul class="cart_list product_list_widget woocommerce-mini-cart ">
                                <li class="woocommerce-mini-cart-item mini_cart_item" v-for="(one,index) in products" :key="index">

                                    <div class="_check" @click.self="$router.push({path: `/product-category/detail/${one.product_id}`})" style="display:flex;">
                                        <div style="margin-right:20px;">
                                            <input type="checkbox" class="input_check" :id="`check${index}`" v-model="one.is_check">
                                            <label :for="`check${index}`"></label>
                                        </div>
                                        <!--  <a class="cart-item-link">显示</a> -->
                                        <!--  <a class="remove remove_from_cart_button" aria-label="移除此物品" @click.self="remove(index)">
                                            ×
                                        </a> -->
                                        <a href="/product/eames-plastic-side-chair" class="cart-item-image">
                                            <img width="525" height="600" :src="one.cover" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image" alt="">
                                        </a>
                                        <div class="cart-info">
                                            <span class="product-title">{{one.product_name}}</span>
                                            <span class="quantity">{{one.num}} ×
                                                <span class="woocommerce-Price-amount amount" style="color: #119f3c">
                                                    <!-- <span class="woocommerce-Price-currencySymbol">$</span>                                            -->
                                                    <span v-if="one.is_promote">$
                                                        <span style="color: #777777; text-decoration: line-through">{{one.price}}</span>
                                                        <span> {{one.promote_price}}</span>
                                                    </span>
                                                    <span v-else style="color: #119f3c">
                                                        <span>${{one.price}}</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="woodmart-scroll-pane" style="display: none;">
                            <div class="woodmart-scroll-slider" style="height: 322px; transform: translate(0px, 0px);"></div>
                        </div>
                    </div>
                    <div class="shopping-cart-widget-footer">
                        <p class="woocommerce-mini-cart__total total">
                            <strong>小计:</strong>
                            <span class="woocommerce-Price-amount amount theme_font_color">
                                <span class="woocommerce-Price-currencySymbol">$</span>{{total}}
                            </span>
                        </p>
                        <p class="woocommerce-mini-cart__buttons buttons">
                            <a class="button checkout wc-forward  theme_bg_color" @click="AddToCart">确定加入购物车</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean
    },
    products: Array
  },
  data() {
    return {
      realPro: []
    };
  },
  computed: {
    total() {
      let total = 0;

      if (this.products && this.products.length) {
        this.products.map(one => {
          if (one.is_check) {
            total =
              total +
              (one.num || 1) * (one.is_promote ? one.promote_price : one.price);
          }
        });
      }
      return total;
    }
  },
  mounted() {},
  methods: {
    remove(i) {
      let arr = [];
      this.products.forEach((one, index) => {
        if (index != i) {
          arr.push(one);
        }
      });
      this.$emit("update:products", arr);
    },
    AddToCart() {
      if (this.products && this.products.length) {
        let arr = [];
        this.products.map(one => {
          if (one.is_check) arr.push({ product_id: one.product_id, num: 1 });
        });
        if (arr.length == 0) {
          this.$store.dispatch("setTip", {
            type: "err",
            msg: "Please check the side dishes"
          });
          return;
        }
         this.$store.dispatch('showLoding', true)
        api.post("/api/carts/batch-create", arr).then(res => {
          new Promise((resolve, reject) => {
            this.$store.dispatch("getCart");
            resolve("ok");
          }).then(res => {
            setTimeout(() => {
              this.$store.dispatch('showLoding', true)
              this.$emit("update:show", false);
            }, 1500);
          });
        });
      }
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.products.forEach((item, index) => {
          this.$set(item, "is_check", true);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
    left: 20px;
    top: 20px;
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
</style>
