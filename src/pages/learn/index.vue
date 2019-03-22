<template>
    <scroll-view class="learn" scroll-y>
      <div class="learn_info">
        <img src="/static/imgs/plan.jpg"/>
        <div class="info_text">
          <h4>已学习</h4>
          <span>{{minutes}}</span>分钟
          <p>今日目标已完成 <span>{{percetage}}</span></p>
        </div>
      </div>
      <!--我的课程-->
      <div class="my_lesson" v-if="mylessons.length>0">
        <cardHeader title="我的课程" :lessonCount="lessonCount"></cardHeader>
        <div class="warp-r">
          <scroll-view scroll-x class="warp-r-box">
            <div
              class="lesson_card"
              v-for="(item,index) in mylessons"
              :key="index"
              @click="switchMyLesson"
            >
              <img :src="item.img"/>
              <p>{{item.title}}</p>
            </div>
            <div class="lesson_card" @click="switchMyLesson">
              <img src="/static/imgs/lookall.jpg" />
            </div>
          </scroll-view>
        </div>
      </div>
      <!--进入课程按钮-->
      <div class="start_lesson">
        <button @click="switchToWatchLesson">进入课程</button>
      </div>
      <!--热门-->
      <div class="hot_lesson">
        <cardHeader title="今日热门课程" @click="switchToHotLesson" :lessonCount="lessonCount"></cardHeader>
      </div>
    </scroll-view>
</template>
<script>
  import cardHeader from "../../components/cardHeader/index"
    export default {
      components:{
        cardHeader
      },
      data() {
        return {
          minutes:0,
          percetage:"0%",
          lessonCount:0,
          hotLesson:[]
        }
      },
      computed:{
        mylessons(){
          let lessons=[];
          const myLesson=this.$store.getters.lessonInfo.mylessons;
          console.log(myLesson);
//          课程个数

          this.lessonCount=myLesson.length;
//              判断是否大于5，如果大于5显示前五个，否则显示所有课程
          const count=myLesson.length >5 ? 5 : myLesson.length;
          for(let i=0;i<count;i++){
            lessons.push(myLesson[i]);
          }
          return lessons;
        }
      },
      methods: {
        switchMyLesson(){
          wx.navigateTo({
            url:"../myLesson/main"
          })
        },
        switchToWatchLesson(){
          wx.navigateTo({
            url:"../watchLesson/main"
          })
        },
//        获取热门数据
        getData(){
          this.$https.request({
            url:this.$interfaces.getHotLessons,
            method:"get"
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        },
        switchToHotLesson(){
          wx.switchTab({
            url:"../lesson/main"
          })
        }
      },
      onLoad(){
        this.getData();
      }
    }
</script>
<style scoped>
  .learn {
    height: 100%;
    box-sizing: border-box;
  }
  .learn_info {
    padding: 10px;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
  }
  .learn_info img {
    width: 85px;
    height: 85px;
  }
  .info_text {
    padding: 10px;
  }
  .info_text h4 {
    font-weight: bold;
  }
  .info_text h4 span {
    color: #009eef;
  }
  .info_text p {
    color: #ccc;
    font-size: 14px;
    margin-top: 10px;
  }
  .info_text p span {
    color: #85c646;
  }

  .my_lesson,.hot_lesson {
    width: 100%;
    margin-top: 16px;
    background-color: #fff;
    border: 1px solid #ebeef5;
  }
  .warp-r{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
   }
  .warp-r-box{
    width: auto;
    overflow: hidden;
  }
  .lesson_card{
    width: 120px;
    display: inline-block;
    padding: 10px 5px;
    vertical-align:top
  }
  .lesson_card img {
    width: 100%;
    height: 100px;
    border-radius: 5px;
    display: block;

  }
  .lesson_card p {
    font-size: 14px;
    color: #333;
    overflow: hidden;
    padding: 5px 0;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .start_lesson {
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .start_lesson button {
    background-color: #fff;
    color: #009eef;
    width: 150px;
    border-radius: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .start_lesson button::after {
    border: none;
  }
</style>
