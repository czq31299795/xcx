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
        <card-header title="我的课程" :lessonCount="lessonCount"></card-header>
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
        <card-header title="今日热门课程" @backClick="switchToHotLesson" :lessonCount="lessonCount"></card-header>
        <div v-for="(item,index) in hotLesson" :key="index">
          <!--<lesson-cell-->
            <!--:img="item.img"-->
            <!--:title="item.title"-->
            <!--:level="item.level"-->
            <!--:count="item.count"-->
            <!--:url="item.url">-->
          <!--</lesson-cell>-->
          <div class="lesson_cell" @click="switchWebview(item.url)">
            <img :src="item.img" alt>
            <div class="cell_text">
              <h4>{{item.title}}</h4>
              <p>
                <span class="level">{{item.level}}</span>
                <span class="learn_count">{{item.count}}人学习</span>
              </p>
            </div>
          </div>



        </div>
      </div>
    </scroll-view>
</template>
<script>
  import cardHeader from "../../components/cardHeader/index"
//  import lessonCell from "../../components/lessonCell/index"
  export default {
    components:{
      cardHeader,
//      lessonCell
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
          this.hotLesson=res;
        }).catch(err=>{
          console.log(err)
        })
      },
      switchToHotLesson(){
        wx.switchTab({
          url:"../lesson/main"
        })
      },
      switchWebview(data){
        console.log(data);
        wx.navigateTo({
          url:"../webview/main?url="+data
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
  .lesson_cell {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    height: 240rpx;
    padding: 20rpx 32rpx;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
  }
  .lesson_cell img {
    width: 40%;
    height: 200rpx;
    margin-right: 10px;
    border-radius: 5px;
  }
  .cell_text {
    width: 60%;
  }
  .cell_text h4 {
    margin-top: 10px;
    height: 60px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .cell_text p {
    font-size: 14px;
  }
  .cell_text p .level {
    color: #eb8831;
    margin-right: 20px;
  }
  .cell_text p .learn_count {
    color: #ccc;
  }
</style>
