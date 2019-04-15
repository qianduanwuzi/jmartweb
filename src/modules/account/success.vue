<template> 
      <div class="successBox">
          <i class="fa fa-check-square-o success" ></i>
          <div @click="$router.push('/my-account/login')" class="suc">您已激活成功！点此去登录<span class="theme_font_color" style="margin-left:2px ">{{time}}</span>秒后自动跳转至登录页</div>
      </div>
</template>

<script>
export default {
  data() {
    return {
        time: 10,
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

<style>
.successBox{
    width: 1192px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
}

.successBox .success{
     font-size: 200px;
    color: rgb(237, 237, 237);
}
.suc{
    cursor: pointer;
}

@media (max-width: 1200px) {
  .portal_header_box, .portal_footer_box, .page-title{
      display: none;
  }

  .successBox{
      width: 100%;
      text-align: center;
  }

  .successBox .success{
     font-size: 150px;
    color: rgb(237, 237, 237);
}
}
</style>