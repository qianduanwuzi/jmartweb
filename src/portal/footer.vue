<template>
	<div class="portal_footer_box">
		<footer class="footer_box">
			<div class="slogan_box">
				<div>
					<router-link to="/"><img :src="baseurl+'/statics/2018/07/25/1532496567_logo.png'" alt=""></router-link>
				</div>
				<div class="slogan">
					{{list.slogan}}
				</div>
			</div>
			<div class="contact each_box">
				<div class="txt">联系方式</div>
				<div><img :src="baseurl+'/statics/2018/07/25/1532499423_footer_location.png'" alt="" style="margin-right: 12px">{{list.address}}</div>
				<div style="line-height: 30px;"><img :src="baseurl+'/statics/2018/07/25/1532499491_footer_phone.png'" style="margin-right: 14px" alt="">电话： {{list.phone}}</div>
				<div><img :src="baseurl+'/statics/2018/07/25/1532499513_footer_mail.png'" style="margin-right: 7px" alt="">传真： {{list.fax}}</div>
			</div>
			<div class="each_box">
				<div class="link_title txt">Jmart超市APP</div>
				<img :src="list.app_url" alt="" style="width: 120px">
			</div>
			<div class="each_box">
				<div class="link_title txt">Jmart公众号</div>
				<img :src="list.wechat_url" alt="" style="width: 120px">
			</div>
		</footer>
		<footer class="copy_box" style="padding-top: 40px;">
			<div>所有图片均受著作权保护，未经许可任何单位与个人不得使用、复制、转载、摘编，违者必究法律责任。</div>
			<div>ICP备09007561号 Copyright <i class="fa fa-copyright"></i> 2018-2018 Jmart新世界超市版权所有。 </div>
		</footer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'; 
import seturl from "@/mixins/setbaseurl";
export default {
	    mixins: [seturl],
  data() {
    return {
	};
  },
   computed: {
        ...mapGetters({
            list: "getFooter"
        })
    },
  mounted() {
  },
  methods: {
	 
  }
};
</script>

<style lang="scss" scoped>
	@import "@/scss/com.scss";
	.footer_box {
		display: flex;
		justify-content: space-between;
		padding-right: 100px;
		padding: 20px 0;
		@include view_layout;
		color: rgb(122, 122, 122);
		.each_box{
			padding-top: 10px;
		}
		.slogan_box {
			.slogan {
				margin-top: 5px;
				display: inline-block;
				width: 250px;
			}
		}
		.contact {
			font-size: 12px;
			.txt{
				font-weight: bold;
			}
		}
		.link_title {
			@include set_theme_color;
			font-size: 16px;
			text-align: center;
		}
		.txt{
			font-size: 16px;
			margin-bottom: 10px;
		}
	}
	
	.copy_box {
		height: 120px;
		font-size: 12px;
		text-align: center;
		@include set_bg_color;
		color: #fff;
	}
</style>