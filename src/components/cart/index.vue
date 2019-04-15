<template>
    <div v-show="show && cartList.show">
        <div class="woodmart-close-side woodmart-close-side-opened" @click="show = false"></div>
        <div class="cart-widget-side woodmart-cart-opened">
            <div class="widget-heading">
                <h3 class="widget-title">购物车</h3>
                <a @click="show = false" class="close-side-widget">关闭</a>
            </div>
            <div class="widget woocommerce widget_shopping_cart">
                <div class="widget_shopping_cart_content" style="opacity: 1;">
                    <div class="shopping-cart-widget-body woodmart-scroll has-scrollbar">
                        <div class="woodmart-scroll-content" tabindex="0" style="right: -17px;">
                            <ul class="cart_list product_list_widget woocommerce-mini-cart ">
                                <li class="woocommerce-mini-cart-item mini_cart_item" v-for="(one,index) in cartList.carts" :key="index">
                                    <div @click.self="$router.push({path: `/product-category/detail/${one.product_id}`})" style="display: flex">
                                        <a class="cart-item-link">显示</a>
                                        <a class="remove remove_from_cart_button" aria-label="移除此物品" @click.self="remove(one.id)">
                                            ×
                                        </a>
                                        <a href="/product/eames-plastic-side-chair" class="cart-item-image">
                                            <img width="525" height="600" :src="one.cover" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image" alt="">
                                        </a>
                                        <div class="cart-info">
                                            <span class="product-title">{{one.product_name}}</span>
                                            <span class="quantity">{{one.num}} ×
                                                <span class="woocommerce-Price-amount amount" style="color: #119f3c">
                                                    <!-- <span class="woocommerce-Price-currencySymbol">$</span> -->
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
                            <a to="/cart" class="button btn-cart wc-forward" @click="seeCart">查看购物车</a>
                            <a to="/checkout" class="button checkout wc-forward theme_bg_color" @click="checkout">结算</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      show: false,
      total: "" // 总价
    };
  },
  computed: {
    ...mapGetters({
      cartList: "getCarts"
    })
  },
  methods: {
    remove(id) {
      api.delete("/api/carts/" + id).then(res => {
        this.$store.dispatch("getCart");
      });
    },
    seeCart() {
      this.show = false;
      this.$router.push({ path: "/cart" });
    },
    checkout() {
      this.show = false;
      sessionStorage.setItem(
        "checkout_list",
        JSON.stringify(this.cartList.carts)
      );

      this.$router.push({ path: "/checkout" });
    }
  },
  watch: {
    cartList: {
      deep: true,
      handler(val, oldval) {
        // 重新获取cart num
        // this.$store.dispatch("getCartsNum");
        // 计算总价
        this.total = 0;
        var arr = val.carts.map(one => {
          return one.num * (one.is_promote ? one.promote_price : one.price);
        });
        arr.forEach(one => {
          this.total = this.total + one;
        });
        this.show = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


