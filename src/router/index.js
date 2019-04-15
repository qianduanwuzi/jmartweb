import Vue from "vue";
import Router from "vue-router";
import Portal from "@/portal";
import Index from "@/modules/index";
import AccountIndex from "@/modules/account"
import Account from "@/modules/account/account"
import OrderIndex from "@/modules/account/orderIndex"
import Order from "@/modules/account/order"
import orderDetail from "@/modules/account/orderDetail"
import Address from "@/modules/account/address"
import CommentCenter from "@/modules/account/commentCenter"
import Detail from "@/modules/account/detail"
import Card from "@/modules/account/card"
import EditPw from "@/modules/account/editPw"
import Login from "@/modules/account/login"
import LostPassword from "@/modules/account/lostPassword"
import RegVal from "@/modules/account/RegVal"
import Success from "@/modules/account/success"
import RegMiddle from "@/modules/account/regMiddle"
 
import ProductIndex from "@/modules/product/index"
import ProductList from "@/modules/product/list"
import ProductDetailIndex from "@/modules/product/detailIndex"
import ProductDetail from "@/modules/product/detail"
import MoreComment from "@/modules/product/moreComment"

import CartIndex from "@/modules/cart"

import Recipe from '@/modules/recipe/index'
import RecipeDetail from '@/modules/recipe/detail'

import Checkout from '@/modules/checkout'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "",
      component: Portal,
      children: [
        {
          name: "Jmart8-新世界超市",
          path: "",
          component: Index
          // meta:{requireAuth: true}
        },
        { 
          name: "My account",
          path: "my-account",
          component: AccountIndex,
          children: [
            {
              name: "My account",
              path: "account",
              component: Account,
              children: [
                {
                  name: "订单",
                  path: "order",
                  component: OrderIndex,
                  children: [
                    {
                      name: "订单-Jmart8",
                      path: '',
                      component: Order,
                    },
                    {
                      name: "订单详情-Jmart8",
                      path: ':id',
                      component: orderDetail,
                    },
                  ]
                },
                {
                  name: "我的信用卡",
                  path: "bank-card",
                  component: Card,
                }, 
                {
                  name: "地址-Jmart8",
                  path: "address",
                  component: Address,
                }, {
                  name: "账户详情-Jmart8",
                  path: "detail",
                  component: Detail,
                },
                 {
                  name: "评价中心-Jmart8",
                  path: "comment-center",
                  component: CommentCenter,
                },
                {
                  name: "修改密码-Jmart8",
                  path: "edit-pw",
                  component: EditPw,
                },
              ]
            },
            {
              name: "登陆-Jmart8",
              path: "login",
              component: Login
            },
            {
              name: "注册-Jmart8",
              path: "register",
              component: Login
            },
            {
              name: "忘记密码-Jmart8",
              path: "lost-password",
              component: LostPassword
            },
             {
              name: "注册验证-Jmart8",
              path: "reg-val",
              component: RegVal
            },
            {
              name: "激活成功-Jmart8",
              path: "success",
              component: Success
            },
            {
               name: "注册-Jmart8",
              path: "reg-middle",
              component: RegMiddle
            }
          ]
          // meta:{requireAuth: true}
        },
        {
          name: 'product-category',
          path: 'product-category',
          component: ProductIndex,
          children: [
            {
              name: "",
              path: ":id",
              component: ProductList
            },
            {
              name: '',
              path: 'detail/:id',
              component: ProductDetailIndex,
              children: [
                {
                  name: '',
                  path: '',
                  component: ProductDetail
                },
                // {
                //   name:'更多评论',
                //   path: 'detail/:id/more-comment',
                //   component: MoreComment
                // },
              ]
            },
            {
              name: '更多评论',
              path: 'detail/:id/more-comment',
              component: MoreComment
            }
          ]
        }, {
          name: "专题-Jmart8",
          path: "/recipe",
          component: Recipe,

        },
        {
          name: "",
          path: "/recipe/:id",
          component: RecipeDetail
        },
        {
          name: "购物车-Jmart8",
          path: 'cart',
          component: CartIndex
        }, {
          name: "checkout-Jmart8",
          path: "checkout",
          component: Checkout
        }
      ]
    }
  ]
});
