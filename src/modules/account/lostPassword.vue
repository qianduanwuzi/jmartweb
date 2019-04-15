<template>
<div>
    <div class="container" v-if="showForget">
		<div class="row content-layout-wrapper">
            <div class="site-content col-sm-12" role="main">
				<article id="post-9" class="post-9 page type-page status-publish hentry">
					<div class="entry-content">
						<div class="woocommerce">
                            <form method="post" onsubmit="return false" action="##" class="woocommerce-ResetPassword lost_reset_password">
                                <p>忘记密码了？请输入您的用户名或电邮地址。您将会收到一封带有验证码的邮件。</p>
                                <p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first" style="position: relative">
                                    <label for="user_login">电子邮件</label>
                                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="text" v-model="form.email" name="user_login" id="user_login" autocomplete="username">
                                    <label class="err">{{err}}</label>
                                </p>
                                <div class="clear"></div>
                                <p class="woocommerce-form-row form-row">
                                    <input  type="hidden" name="wc_reset_password" value="true">
                                    <button type="submit" class="woocommerce-Button button" value="密码重置" @click="resetPW">密码重置</button>
                                </p>
                                <input type="hidden" id="woocommerce-lost-password-nonce" name="woocommerce-lost-password-nonce" value="269268657a"><input type="hidden" name="_wp_http_referer" value="/my-account/lost-password">
                            </form>
                        </div>
				    </div>
				</article>
            </div>
		</div>
	</div>
    <div class="container" v-else>
        <div class="row content-layout-wrapper">
            <div class="site-content col-sm-12" role="main">
                <article id="post-9" class="post-9 page type-page status-publish hentry">
                    <div class="entry-content">
                        <div class="woocommerce">
                            <!-- <div class="woocommerce-message" role="alert" @click="show = false" v-show="show">邮件已送出。</div> -->
                            <p class="tip-txt">包含验证码的邮件已发至你的邮箱，但是邮件有时会需要几分钟才显示。注意验证码2小时内有效！</p>
                            <div class="reset_box">
                                <div>
                                    <label for="">验证码</label>
                                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="text" placeholder="请输入邮件中的验证码" v-model="form.code" name="" id="" >
                                     <label v-show="lostErr.code_err"  class="reg_err">{{lostErr.code_err}}</label>
                                </div>
                                <div class="same_box_st">
                                    <label for="">新密码</label>
                                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="password" placeholder="请输入新密码" v-model="form.password" name="" id="" >
                                     <label v-show="lostErr.pw_err"  class="reg_err">{{lostErr.pw_err}}</label>
                                </div>
                                 <div class="same_box_st">
                                    <label for="">确认密码</label>
                                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="password" placeholder="确认新密码" v-model="conpw" name="" id="" >
                                     <label v-show="lostErr.cpw_err"  class="reg_err">{{lostErr.cpw_err}}</label>
                                </div>
                                <div>
                                    <button type="submit" class="woocommerce-Button button theme_bg_color" name="register" value="确认" @click="confirm">确认</button>
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
export default {
  data() {
    return {
      form: { email: "", code: "", password: "" },
      showForget: true, //
      err: "",
      show: true,
      conpw: "", // 再次确认密码
      lostErr: {
        //忘记err
        code_err: "",
        pw_err: "",
        cpw_err: ""
      }
    };
  },
  methods: {
    resetPW() {
        this.err = '';
      if (this.form.email == "") {
        this.err = "请输入邮箱";
        return false;
      }
        this.$store.dispatch('showLoding', true)
      api.get("/api/captcha-for-reset-password",{email: this.form.email}).then(res => {
        if (res.code != 200) {
          this.err = res.msg;
        } else this.showForget = false;
           this.$store.dispatch('showLoding', false)
      });
    },
    confirm() {
      if (this.form.code == "") {
        this.lostErr.code_err = "请输入验证码";
        return false;
      }
      if (this.form.password == "") {
        this.lostErr.pw_err = "请输入新密码";
        return false;
      }
      if (this.conpw == "") {
        this.lostErr.cpw_err = "请确认新密码";
        return false;
      }
      if (this.form.password != this.conpw) {
        this.lostErr.cpw_err = "2次密码不一致";
        return false;
      }
        this.$store.dispatch('showLoding', true)
      api.post("/api/reset-password", this.form).then(res => {
          this.$store.dispatch('showLoding', false)
          this.$store.dispatch('setTip', { type: 'success', msg: '重置成功，请登录！'})
          this.$router.push({path: '/my-account/login'})
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.woocommerce {
  .tip-txt {
    max-width: 470px;
    margin: auto;
    font-size: 110%;
    text-align: center;
  }
  .tip-txt::before {
    content: "\f11f";
    font-family: woodmart-font;
    display: block;
    color: rgba(135, 135, 135, 0.15);
    font-size: 180px;
    line-height: 180px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .err {
    color: red;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .reset_box {
    max-width: 470px;
    margin: 20px auto;
    .same_box_st {
      margin-top: 20px;
    }
    .reg_err {
      color: red;
    }
    .button{
        margin-top: 20px;
        width: 100%;
        color: #fff;
    }
  }
}
</style>


