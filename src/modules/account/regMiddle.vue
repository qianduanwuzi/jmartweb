<template> 
      <div class="successBox">
          <!--<i class="fa fa-check-square-o success" ></i>-->
          <div>包含激活链接的邮件已发至你的邮箱，但是邮件有时会需要几分钟才显示。注意2小时内有效!</div>
          <div><span class="theme_font_color" style="margin-left:2px ">{{time}}</span>秒后自动跳转至登录页</div>
      </div>
</template>

<script>
export default {
  data() {
    return {
        time: 20,
    }
  },
  mounted() {
      var timer = setInterval(() => {
          this.time -= 1;
          if(this.time == 0)  {
              clearInterval(timer)
              this.$router.push('/my-account/login')
        }
      }, 1000)
  },
  methods: {
     
  }
}

</script>

<style lang="scss" scoped>
.successBox{
    width: 1192px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
    .success{   
        font-size: 200px;
        color: rgb(237, 237, 237);
    }
    .suc{
        cursor: pointer;
    }
}
</style>