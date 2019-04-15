<template>
      <div class="container">
		<div class="row content-layout-wrapper">
            <div class="site-content col-sm-12" role="main">
				<article id="post-9" class="post-9 page type-page status-publish hentry">
					<div class="entry-content">
						<div class="woocommerce">
                            <form method="post" onsubmit="return false" action="##" class="woocommerce-ResetPassword lost_reset_password">
                                <p>没收到？请输入您的电邮地址。您将会收到一封带有激活链接的邮件。</p>
                                <p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first" style="position: relative">
                                    <label for="user_login">电子邮件</label>
                                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="text" v-model="form.email" name="user_login" id="user_login" autocomplete="username">
                                    <label class="err">{{err}}</label>
                                </p>
                                <div class="clear"></div>
                                 <p class="woocommerce-form-row form-row">
                                    <input  type="hidden" name="wc_reset_password" value="true">
                                    <button type="submit" class="woocommerce-Button button" value="确定" @click="reviewEmail">确定</button>
                                </p>
                            </form>
                        </div>
				    </div> 
				</article>
            </div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
        form: {email: ''},
        err: '',
    }
  },
  methods: {
      reviewEmail() {
          this.err = ''
          if(!this.form.email || !this.form.email.includes('@')){
              this.err = '请输入合法的email'
              return
          }
           this.$store.dispatch('showLoding', true)
          api.get('/api/renew-active-email?email='+this.form.email).then(res => {
            if(res) {
               this.$store.dispatch('showLoding', false)
               this.$router.push('/my-account/reg-middle')
            }
          })
      }
  }
}

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