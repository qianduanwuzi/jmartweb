<template>
    <div>
        <div class="container">
			<div class="row content-layout-wrapper">
                <div class="site-content col-sm-12" role="main">
					<article id="post-9" class="post-9 page type-page status-publish hentry">
					<div class="entry-content">
						<div class="woocommerce">
                            <div class="woodmart-registration-page woodmart-register-tabs">
                                <div class="u-columns col2-set" id="customer_login">
                                    <div class="u-column1 col-6 col-login" :style="{display: showLogin? 'block' : 'none'}">
                                        <h2>登录</h2>
                                        <form method="post" onsubmit="return false" action="##" class="login woocommerce-form woocommerce-form-login ">
                                            <div class="close-login-form"><span>Close</span></div>
                                            <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide form-row-username login_p" >
                                                <label for="username">用户名&nbsp;<span class="required">*</span></label>
                                                <input type="text" v-model="loginForm.username" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="username" autocomplete="username" value="">
                                                <label v-show="logErr.email_err" class="reg_err">{{logErr.email_err}}</label>
                                            </p>
                                            <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide form-row-password login_p">
                                                <label for="password">密码&nbsp;<span class="required">*</span></label>
                                                <input v-model="loginForm.password" class="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password" id="password" autocomplete="current-password">
                                                <label v-show="logErr.pw_err" class="reg_err">{{logErr.pw_err}}</label>
                                            </p>
                                            <p class="">
                                                <div style="color: red; line-height: 16px;cursor: pointer;margin-bottom: 5px" @click="$router.push('/my-account/reg-val')">{{loginerr}}</div>
                                                <input type="hidden" id="woocommerce-login-nonce" name="woocommerce-login-nonce" value="957cae8c61"><input type="hidden" name="_wp_http_referer" value="/my-account">										
                                                <button type="submit" @click="login" @keyup.enter="login" class="button woocommerce-Button" name="login" value="Log in">登录</button>
                                            </p>
                                            <div class="login-form-footer">
                                                <router-link to="/my-account/lost-password/" class="woocommerce-LostPassword lost_password">忘记密码?</router-link>
                                                <label for="rememberme" class="remember-me-label inline">
                                                    <input style="appearance: checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" value="forever" v-model="remember"> 
                                                    <span>记住我</span>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="u-column2 col-6 col-register" :style="{display: showLogin? 'none' : 'block'}">
                                        <h2>注册</h2>
                                        <form method="post"  onsubmit="return false" action="##" class="woocommerce-form woocommerce-form-register register " >
                                            <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_email">电邮地址&nbsp;<span class="required">*</span></label>
                                                <input type="email" v-model.trim="registForm.email" class="woocommerce-Input woocommerce-Input--text input-text " name="email"  value="" id="reg_email" aria-describedby="inputGroupPrepend3" >
                                                <label v-show="regErr.email_err" class="reg_err">{{regErr.email_err}}</label>
                                            </p>
                                            <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_phone">手机号&nbsp;<span class="required">*</span></label>
                                                <input type="text" v-model.trim="registForm.phone" class="woocommerce-Input woocommerce-Input--text input-text " name=""  value="" id="reg_phone" >
                                                <label v-show="regErr.phone_err" class="reg_err">{{regErr.phone_err}}</label>
                                            </p>
                                            <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_pw">密码&nbsp;<span class="required">*</span></label>
                                                <input type="password" v-model.trim="registForm.password" class="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_pw" autocomplete="password" value="" >
                                                <label v-show="regErr.pw_err"  class="reg_err">{{regErr.pw_err}}</label>
                                            </p>
                                             <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_email">确认密码&nbsp;<span class="required">*</span></label>
                                                <input type="password" v-model.trim="confirmPwd" class="woocommerce-Input woocommerce-Input--text input-text" name="confirm_password" id="reg_cpsw" autocomplete="" value="">
                                                <label v-show="regErr.cpw_err"  class="reg_err">{{regErr.cpw_err}}</label>
                                            </p>
                                             <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_email">用户名&nbsp;<span class="required">*</span></label>
                                                <input type="text" v-model="registForm.username" class="woocommerce-Input woocommerce-Input--text input-text" name="name" id="reg_name" autocomplete="name" value="">
                                                <label v-show="regErr.name_err"  class="reg_err">{{regErr.name_err}}</label>
                                            </p>
                                              <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                                                <label for="reg_pw">性别&nbsp;<span class="required">*</span></label>
                                                <select name="" id="" v-model="registForm.sex">
                                                    <option value="FEMALE">男</option>
                                                    <option value="MALE">女</option>
                                                </select>
                                                <!--<input type="password" v-model.trim="registForm.sex" class="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_pw" autocomplete="" value="" >-->
                                                <label v-show="regErr.sex_err"  class="reg_err">{{regErr.sex_err}}</label>
                                            </p>
                                            <!-- Spam Trap -->
                                            <div style="left: -999em; position: absolute;">
                                                <label for="trap">Anti-spam</label><input type="text" name="email_2" id="trap" tabindex="-1">
                                            </div>
                                            <div class="woocommerce-privacy-policy-text">
                                                <p>您的个人数据将用于支持您在整个网站上的体验，管理对您帐户的访问权限。</p>
                                            </div>
                                            <p class="woocommerce-FormRow form-row">
                                                <input type="hidden" id="_wpnonce" name="_wpnonce" value="dc2b896dfc"><input type="hidden" name="_wp_http_referer" value="/my-account">
                                                <button type="submit" class="woocommerce-Button button" name="register" value="注册" @click="register" @keyup.enter="register">注册</button>
                                            </p>
                                        </form>
                                    </div>
                                    <div class="col-6 col-register-text">
                                        <span class="register-or">Or</span>
                                        <h2>注册</h2>
                                        <div class="registration-info">
注册此站点可让您访问订单状态和历史记录。 只需填写下面的字段，我们即可立即为您设置新帐户。 我们只会向您询问必要的信息，以便更快，更轻松地完成购买流程。
                                        </div>
                                        <a class="btn woodmart-switch-to-register" data-login="登录" data-register="注册" @click="showLogin = !showLogin">{{showLogin? '注册' : '登录'}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
				</article>
            </div>
		</div>
	</div>
</div>
</template>

<script>
import Store from "storejs";
import commerce from "@/config/commerce"
export default {
  data() {
    return {
      remember: false, // 记住密码
      showLogin: true, // 默认登录
      loginerr: '',
      prePath: '',
      registForm: {
        //注册表单
        email: "",
        password: "",
        username: "",
        phone: "",
        sex: '',
      },
      confirmPwd: "",
      loginForm: {
        // 登录表单
        username: "",
        password: ""
      },
      regErr: {
        //注册err
        email_err: "",
        pw_err: "",
        cpw_err: "",
        name_err: "",
        phone_err: '',
        sex_err: ""
      },
      logErr: {
        email_err: "",
        pw_err: ""
      }
    };
  },
  computed: {
    
  },
  mounted() {
        Store.remove('token')
        this.$store.dispatch("getCart", { logout:true });
        if(Store.get('ac')) {
            this.remember = true
            this.loginForm.username = Store.get('ac').username
            this.loginForm.password = Store.get('ac').password
        }
  },
  methods: {
    // 注册
    register() {
      Object.keys(this.regErr).forEach(item => (this.regErr[item] = ""));
      //   validate
      if (this.registForm.email == "" || !this.registForm.email.includes("@")) {
        this.regErr.email_err = "请输入邮箱且包含@";
        return 
      }
      if (this.registForm.phone == "") {
        this.regErr.phone_err = "请输入手机号";
        return 
      }
      if (this.registForm.password == "") {
        this.regErr.pw_err = "请输入密码";
        return 
      }
      if (this.confirmPwd == "") {
        this.regErr.cpw_err = "请确认密码";
        return 
      }
      if (this.registForm.password != this.confirmPwd) {
        this.regErr.cpw_err = "2次密码不一致";
        return 
      }
      if (this.registForm.username == "") {
        this.regErr.name_err = "请输入用户名";
        return 
      }
       if (this.registForm.sex == "") {
        this.regErr.sex_err = "请选择性别";
        return 
      }
      this.$store.dispatch('showLoding', true)
      api.post("/api/registry", this.registForm).then(res => {
          console.log('194', res)
          if(res.code == 500 || res.data.code == 500){
          }else {
               this.$router.push('/my-account/reg-middle')
          }
          this.$store.dispatch('showLoding', false)
      })
    },
    login() {
      Object.keys(this.logErr).forEach(item => (this.logErr[item] = ""));
      if (this.loginForm.username == "") {
        this.logErr.email_err = "请输入用户名";
        return false;
      }
      if (this.loginForm.password == "") {
        this.logErr.pw_err = "请输入密码";
        return false;
      }
         this.$store.dispatch('showLoding', true)
      api.get("/api/login", this.loginForm).then(res => {
          this.loginerr = '';
        //   console.log('188',    res)
          if(res && res.code == 200) {
            if(this.remember) {
                Store.set('ac', {checked:true, username:this.loginForm.username, password: this.loginForm.password})
            }else {
                Store.remove('ac')
            }
            this.$store.dispatch('setTip', { type: 'success', msg: '登录成功!'})
            Store.set("token", res.data.token);
            // 按需引流跳转
            this.$store.dispatch("getCart", { show: false });
            this.$store.dispatch("getWish");
            if(this.prePath) this.$router.push({ path: this.prePath});
            else this.$router.push({ path: "/my-account/account/detail" });
          }else if(res && res.code == '403'){
            //   未激活状态
              this.loginerr = '没收到邮件？点这重新发送'
            }
               this.$store.dispatch('showLoding', false)
       
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log('-------------------------------------------', to, from, commerce)
     next(vm => {
        if(commerce.find(one => from.fullPath.includes(one))) {
            vm.prePath = from.fullPath
        }else vm.prePath = ''
    });
  },
  watch: {
     showLogin(v) {
         if(v) document.title = '登陆-Jmart8'
         else document.title = '注册-Jamrt8'
     }
  }
};
</script>

<style>
.login_p{
    position: relative;
}
.reg_err {
  color: red;
  position: absolute;
  top: 100%;
  left: 0;
}

@media (max-width: 1200px) {
  .portal_header_box, .portal_footer_box, .page-title, .col-register-text{
      display: none;
  }

  
}
</style>


