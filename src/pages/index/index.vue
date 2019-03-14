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
        //存储到vuex
        this.$store.dispatch("setisAuthenticated",true);
        this.$store.dispatch("setUser",e.mp.detail.userInfo);
        //获取Code
        this.getCode();
        console.log(this.$store.state);
      }

    },
    getCode(){
      let _this=this;
      // mpvue,提供了一个全局小程序 wx
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            console.log(res);
            _this.getOpenid(res.code)
          }
        }
      })
    },
    getOpenid(code){
      // 三个参数 appid secret code
      const appid='wx4724df1cb3fe0ea1';
      const secret='4db1130d8ccdf23fa6212607e048c5ec';
      var l='https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
      wx.showLoading({
        title:"加载中..."
      })
      wx.request({
        url:l,
        method:"get",
        success(res){
          console.log(res.data);
          wx.hideLoading();
        },
        fail(err){
          console.log(err);
          wx.hideLoading();
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
