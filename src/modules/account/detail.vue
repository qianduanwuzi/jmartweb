<template>
	<div class="woocommerce-MyAccount-content" style="width: 100%;max-width: 100%">
		<div class="woocommerce-EditAccountForm edit-account">
			<div style="display: flex;align-items: flex-start;position: relative">
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide  after-st" style="align-items: flex-start">
					<label for="account_display_name"><span class="required">*</span>头像&nbsp;</label>
					<img :src="form.avatar" alt="" class="avator" style="margin-left: 5px">
					<input type="file" id="uploadAv" class="uploadAv" style="padding-left: 72px" />
					<div class="uploadBtn" @click="uploadFAV">上传头像</div>
				</p>
				<p class="woocommerce-form-row woocommerce-form-row--first form-row after-st">
					<label for="account_first_name"><span class="required">*</span>用户名&nbsp;</label>
					<input type="text" v-model="form.username" class="woocommerce-Input woocommerce-Input--text input-text" disabled="true">
					<i class="fa fa-user-o in-icon"></i>
				</p>
			</div>
			<div style="display: flex;margin-top: 20px">
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide after-st">
					<label for="account_display_name"><span class="required">*</span>昵称&nbsp;</label>
					<input type="text" v-model="form.nick_name" class="woocommerce-Input woocommerce-Input--text input-text">
					<i class="fa fa-vcard-o  in-icon"></i> 
				</p>
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide after-st">
					<label for="account_email"><span class="required">*</span>电邮地址&nbsp;</label>
					<input type="email" v-model="form.email" class="woocommerce-Input woocommerce-Input--email input-text">
					<i class="fa fa-envelope-o in-icon"></i>
				</p>
			</div>
			<div style="display: flex;margin-top: 20px">
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide after-st">
					<label><span class="required">*</span>手机号&nbsp;</label>
					<input type="text" v-model="form.phone" class="input-text">
					<i class="fa fa-phone in-icon"></i>
				</p>
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide after-st">
					<label><span class="required">*</span>性别&nbsp;</label>
					<select name="" id="" v-model="form.sex" style="width: 250px;margin-left: 5px;border-radius: 5px;padding-left: 30px">
						<option value="FEMALE">女性</option>
						<option value="MALE">男性</option>
					</select>
				</p>
			</div>
			<div class="clear"></div>
			<p style="margin-top: 20px">
				<button type="submit" class="woocommerce-Button button theme_bg_color" name="save_account_details" value="保存更改" @click="save" style="margin-left: 550px;color: #fff;border-radius: 4px">保存更改</button>
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					email: '',
					username: '', // 账户
					nick_name: '',// 显示名称
					phone: '', // 手机号
					sex: 'FEMALE',//性别
					avatar: '', // 头像
				}
			}
		},
		mounted() {
			this.getUserInfo();
			let _this = this
			var inputBox = document.getElementById("uploadAv");
			inputBox.addEventListener("change",function(){
				var reader = new FileReader();
				reader.readAsDataURL(inputBox.files[0]);//发起异步请求
				reader.onload = function(){
					//读取完成后，数据保存在对象的result属性中
					_this.form.avatar = this.result;
				}
			})
		},
		methods: {
			//  fileElem.click();
			uploadFAV() {
				document.getElementById("uploadAv").click();
			},
			getUserInfo() {
				api.get('/api/users/profile').then(res => {
					Object.assign(this.form, res.data.data)
				})
			},
			save() {
				if(document.getElementById("uploadAv").files[0]) {
					this.$store.dispatch('showLoding', true)
					let omyform = new FormData();
					omyform.append('file', document.getElementById("uploadAv").files[0])
					api.post('/api/upload', omyform).then(res => {
						this.form.avatar = res.data.data[0]
						api.put('/api/users',this.form).then(res => {
							this.$store.dispatch('showLoding', false)
							this.$store.dispatch('setTip', { type: 'success', msg: '修改成功!'})
						})
					})
				}else {
					this.$store.dispatch('showLoding', true)
					api.put('/api/users',this.form).then(res => {
							this.$store.dispatch('showLoding', false)
							this.$store.dispatch('setTip', { type: 'success', msg: '修改成功!'})
					})
				}
				
			
			}

		}
	}
</script>

<style lang="scss" scoped>
	.uploadBtn{
			cursor: pointer;
			position: absolute;
			top: 160px;
			left: 65px;
			width: 150px;
			background: rgba(129, 129, 129, 0.2);
			text-align: center;
			border-radius: 5px;
			line-height: 30px;
			opacity: .7;
		}
.woocommerce-MyAccount-content{
	.avator{
		height: 150px;
		width: 150px;
		border: 1px solid rgba(122, 122, 122, .2);
		border-radius: 5px;
	}
	.uploadAv{
		display: block;
		margin-top: 5px;
		width: 180px;
		opacity: 0;
	}
	.after-st{
		width: 340px;
		align-items: center;
		position: relative;
		
		.input-text{
			width: 250px;
			margin-left: 5px;
			border-radius: 5px;
			padding-left: 30px;
		}
		label{
			width: 66px;
			text-align: right;
		}
		.in-icon{
			position: absolute;
			left: 78px;
			color: rgba(129, 129, 129, 0.5);
		}
		/*.female{
			position: relative
		}
		.female::after{
			content: "\f182";
			position: absolute;
			font-size: 16px;
		}*/
	}
}
</style>