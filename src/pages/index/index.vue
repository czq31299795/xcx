<template>
  <div class="container">
    <div class="login">
      <img src="/static/images/m1.jpg"/>
      <div class="learn">
        <button open-type="getUserInfo" @getuserinfo="getUserinfo">开始学习</button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {

    }
  },
  methods: {
    getUserinfo(e){
      // 判断授权是否成功
      if(e.mp.detail.userInfo){
        this.$store.dispatch("setisAuthenticated",true);
        this.$store.dispatch("setUser",e.mp.detail.userInfo);
        //获取Code
        this.getCode();
      }
      console.log(this.$store.state);
    },
    getCode(){
      // mpvue,提供了一个全局小程序 wx
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            console.log(res);
          }
        }
      })
    }
  },

  created () {

  }
}
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
  }
  .login{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .login img{
    width: 100%;
    height: 100%;
  }
  .login .learn{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
  }
</style>
