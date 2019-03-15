<template>
  <div class="container">
    <div class="login">
      <img src="/static/imgs/guide_bg.jpg"/>
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
      let _this=this;
      const appid='wx4724df1cb3fe0ea1';
      const secret='4db1130d8ccdf23fa6212607e048c5ec';
      const l=_this.$interfaces.getOpenid+appid+"/"+secret+"/"+code;
      _this.$https.request({
        url:l,
        method:'get'
      }).then(res=>{
//        将openid存储到vuex
        _this.$store.dispatch("setOpenId",res.openid);
//        请求课程数据
        _this.isLearned(res.openid);
      }).catch(err=>{
        console.log(err)
      })
    },
    isLearned(openid){
      this.$https.request({
        url:this.$interfaces.getMyLesson+openid,
        method:'get'
      }).then(res=>{
//        已经答题测试过了
        console.log(res);
        wx.switchTab({
          url:"../learn/main"
        })
      }).catch(err=>{
//        没有答题，需要答题
        console.log(err);
        wx.redirectTo({
            url:'../question/main'
        })
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
