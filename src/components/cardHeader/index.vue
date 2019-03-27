<template>
    <div class="lesson_all">
      <span>{{title}}</span>
      <span v-if="lessonCount > 0">({{lessonCount}})</span>
      <!--<span @click="$emit('backClick')" class="look_all">查看全部</span>-->
      <span @click="upData" class="look_all">查看全部</span>
    </div>
</template>
<script>
    export default {
      props:{
        title:String,
        lessonCount:{
          type:Number,
          default:0
        }
      },
        data() {
            return {}
        },
        methods: {
          upData(){
            console.log(111);
          }
        },
        mounted() {

        }
    }
</script>
<style scoped>
  .lesson_all {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
  }
  .lesson_all .look_all {
    font-size: 12px;
    color: #aaa;
    float: right;
  }
</style>
