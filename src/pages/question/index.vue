<template>
  <div class="question">
    <img src="/static/imgs/test.jpg" alt="" />
    <div class="qs_content" v-if="questions.length > 0">
      <div v-if="!startqs">
        <p class="title">温馨提示:</p>
        <div class="warn_tag">
          为了更好地为您制定学习计划，请首先回答一下问题，我们会为您量身推荐相关课程
        </div>
      </div>
      <div v-if="startqs">
        <p class="title">
          {{questions[currentIndex].title}}
        </p>
        <div @click="selectAnswer(index)" class="response" v-for="(item,index) in questions[currentIndex].option" :key="index">
          <img v-if="item.select" src="/static/imgs/selected.jpg"/>
          <img v-if="!item.select" src="/static/imgs/unselect.jpg"/>
          <span>{{item.label}}</span>
        </div>
      </div>
      <button class="qs_btn" :disabled="disabled" @click="btnClick">{{btn_title}}</button>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        questions:[],
        startqs:false,//是否显示问题列表
        currentIndex:0,//记录当前回答到第几到道题，
        btn_title:"开始答题",//按钮的title
        lesson:"",//记录提交的问题
      }
    },
    computed:{
      disabled(){
        console.log(1111);
        if(!this.startqs){
          return false
        }else{
          const option=this.questions[this.currentIndex].option;
          let select=false;
          option.forEach(item=>{
            if(item.select){
              select=true;
            }
          });
          return !select;
        }
      }
    },
    onLoad(){
      this.getData();
    },
    methods:{
//      获取数据
      getData(){
        this.$https.request({
          url:this.$interfaces.getQuestions,
          method:"get"
        }).then(res=>{
          console.log(res);
          this.questions=res.questions;
        }).catch(err=>{
          console.log(err)
        })
      },
//      按钮
      btnClick(){
        if(!this.startqs){
          this.startqs=true;
          this.btn_title="下一题"
        }else {
          this.lesson += this.getSelectOption();
          if(this.currentIndex<this.questions.length-1){
            this.btn_title="下一题";
            this.currentIndex++;
            this.lesson += ",";
            if(this.currentIndex==this.questions.length-1){
              this.btn_title="完成";
            }
          }else{
//            完成按钮
            console.log(this.lesson);
            this.sendQuestions();
          }
        }
      },
      selectAnswer(index){
        const option = this.questions[this.currentIndex].option;
        // 将列表中的是否选项都只为未选中
        option.forEach(item=>{
          item.select=false;
        });
        //将点击的选项选中
        option[index].select=true;
      },
      getSelectOption(){
        const option = this.questions[this.currentIndex].option;
        let label="";
        option.forEach(item=>{
          if(item.select){
            label=item.label;
          }
        });
        return label;
      },
//      提交
      sendQuestions(){
        this.$https.request({
          url:this.$interfaces.myLesson,
          method:"post",
          data:{
            lesson:this.lesson,
            userId:this.$store.getters.openid
          }
        }).then(res=>{
          console.log(res.mylessons);
          this.$store.dispatch("setLessonInfo",res);
          // 跳转到学习页面
          wx.switchTab({
            url:'../learn/main'
          })
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .question {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .question .bg {
    width: 100%;
    height: 100%;
  }
  .qs_content {
    position: absolute;
    width: 80%;
    height: 50%;
    background: #fff;
    top: 36%;
    left: 10%;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    color: rgb(13, 28, 51);
  }
  .qs_btn {
    position: absolute;
    top: 90%;
    left: 10%;
    width: 80%;
    background-color: #009eef;
    color: white;
  }
  .title {
    font-weight: bold;
    margin-bottom: 20px;
    word-break: break-all;
  }
  .warn_tag {
    padding: 40px 10px;
  }
  .response {
    padding: 10px;
  }
  .response img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>
