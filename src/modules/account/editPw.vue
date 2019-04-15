<template>
	<div class="woocommerce-MyAccount-content edit_pw_box" style="width: 100%;max-width: 100%">
		<div class="woocommerce-EditAccountForm edit-account">
			<p class="woocommerce-form-row woocommerce-form-row--first form-row">
				<label for="account_first_name">原密码&nbsp;<span class="required">*</span></label>
				<input type="password" v-model.trim="form.old_password" class="woocommerce-Input woocommerce-Input--text input-text">
			</p>
            <div class="err">{{oldErr}}</div>
			<div class="clear"></div>

			<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
				<label for="account_display_name">新密码&nbsp;<span class="required">*</span></label>
				<input type="password" v-model.trim="form.new_password" class="woocommerce-Input woocommerce-Input--text input-text"> 
			</p>
             <div class="err">{{newErr}}</div>
			<div class="clear"></div>

			<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
				<label for="account_display_name">确认密码&nbsp;<span class="required">*</span></label>
				<input type="password" v-model.trim="cpw" class="woocommerce-Input woocommerce-Input--text input-text"> 
			</p>
             <div class="err">{{cErr}}</div>
			<div class="clear"></div>
			<p>
				<button type="submit" class="woocommerce-Button button theme_bg_color" name="save_account_details" value="保存更改" @click="save" style="margin-left: -3px;color: #fff">保存更改</button>
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
                    old_password: '',
                    new_password: '',
                },
                cpw: '',
                oldErr: '',
                newErr: '',
                cErr:'',
			}
		},
		mounted() {
			
		},
		methods: {
			save() {
                this.oldErr =  '';
                this.newErr =  '';
                this.cErr =  '';
                if(!this.form.old_password) {
                    this.oldErr = '请输入原密码'
                    return 
                }
                 if(!this.form.new_password) {
                    this.newErr = '请输入新密码'
                    return 
                }
                 if(!this.cpw) {
                    this.cErr = '请确认密码'
                    return 
                }
                if(this.form.new_password != this.cpw){
                    this.cErr = '确认密码不一致';
                    return
                }
                this.$store.dispatch('showLoding', true)
                api.post('/users/update-password', this.form).then(res => {
                    if(res){
                        this.$store.dispatch('showLoding', false)
                        this.$store.dispatch('setTip', { type: 'success', msg: '密码修改成功!请重新登录'})
                        this.form.old_password = ''
                        this.form.new_password = ''
                        this.cpw =  ''
                        this.$router.push({path: '/my-account/login'})
                    }
                   
                })
			}

		},
	}
</script>

<style lang="scss" scoped>
.edit_pw_box{
    .err{
        color: red;
        line-height: 20px;
        height: 20px;
        margin-top: -15px;
    }
}
</style>