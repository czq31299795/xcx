<template>
    <div class="lesson_all">
      <img :src="img" alt="" />
      <div class="cell_text">
        <h4>{{title}}</h4>
        <p>
          <span class="level">{{level}}</span>
          <span class="learn_count">{{count}}人学习</span>
        </p>
      </div>
    </div>
</template>
<script>
    export default {
      props:{
        img:String,
        title:String,
        level:String,
        count:String,
        url:String
      }
      ,
        data() {
            return {}
        },
        methods: {},
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
