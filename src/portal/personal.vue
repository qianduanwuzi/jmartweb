<template>
<div class="whb-column whb-col-right whb-visible-lg per_box">
    <div class="whb-header-links woodmart-navigation woodmart-header-links">
	    <ul class="menu">
			<li class="item-level-0 my-account-with-text menu-item-my-account menu-simple-dropdown item-event-hover">
				<router-link :to="mes == '我的账户' ? '/my-account/account/detail' : '/my-account/login'" >
					<span style="font-size: 16px">{{mes}}</span>
				</router-link>
				<div class="sub-menu-dropdown color-scheme-dark" v-show="mes == '我的账户'">
						<ul class="sub-menu">
                            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders">
                                <router-link to="/my-account/account/order"><span>订单</span></router-link>
                            </li>
                          
                            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-address">
                                <router-link to="/my-account/account/address"><span>地址</span></router-link>
                            </li>
                            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
                                <router-link to="/my-account/account/detail"><span>账户详情</span></router-link>
                            </li>
                            <!--<li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--wishlist  is-active">
                                <a href="/"><span>Home base</span></a>
                            </li>-->
                            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
                                <router-link to="/my-account/login"><span>退出</span></router-link>
                            </li>
                        </ul>
				</div>
			</li>
		</ul>		
    </div>
    <div class="woodmart-wishlist-info-widget whb-wishlist-icon">
        <router-link to="/product-category/wish">
             <span class="wishlist-info-wrap">
                <span class="wishlist-icon">
                    <span class="wishlist-count">{{Store.get('token')? (wish && wish.count)? wish.count : 0 : 0}}</span>
                </span>
                <span class="wishlist-label">Wishlist</span>
            </span>
        </router-link>
</div>
    <div class="woodmart-shopping-cart woodmart-cart-design-2 woodmart-cart-alt cart-widget-opener">
        <router-link to="/cart">
            <span class="woodmart-cart-wrapper">
                <span class="woodmart-cart-icon"></span>
                <span class="woodmart-cart-totals">
                    <span class="woodmart-cart-number">{{Store.get('token')? cartList.cartsNum || 0 : 0}}<span>items</span>
                </span>
                <span class="subtotal-divider">/</span> 
                    <span class="woodmart-cart-subtotal"><span class="woocommerce-Price-amount amount font_sixteen"><span class="woocommerce-Price-currencySymbol " >$</span>{{Store.get('token')? total : 0}}</span></span>
                </span>
            </span>
        </router-link>
	</div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'; 
import Store from "storejs";
export default {
    data() {
        return {
            mes: '我的账户',
            Store,
        }
    },
    computed: {
        ...mapGetters({
            // cartsNum: "getCartsNum",
            cartList: "getCarts",
            wish: "getWishs",
        }),
        total() {
            let total = 0;
            var arr = this.cartList.carts.map(one => {
                return one.num*(one.is_promote? one.promote_price : one.price)
            })
            arr.forEach(one => {
                total = total + one
            })
            return total
        },
  },
    mounted() {
        // 防手动刷新造成无数据状态
        if(this.$route.path.includes('login')) {
            this.mes = '登录/注册' 
        }else {
            if(Store.get('token')) {
                this.$store.dispatch("getCart", { show: false });
                this.mes = '我的账户' 
            }else this.mes = '登录/注册' 
        }
    },
    methods: {
      isLogin() {
          
      }
    },
    watch: {
        $route:{
            deep: true,
            handler(val, oldval) {
                if(Store.get('token')) {
                    if(val.path.includes('login')) {
                        this.mes = '登录/注册'
                    } else this.mes = '我的账户' 
                }else this.mes = '登录/注册'
              
            }
        },
     
    }
}
</script>

<style lang="scss" scoped>
.per_box{
    .font_sixteen{
        font-size: 16px;
    }
}
</style>

