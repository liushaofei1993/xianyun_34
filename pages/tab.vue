<template>
  <div class="content">
    <!-- tab的按钮 -->
    <div class="ctrl">
      <span v-for="(item,index) in [`新闻`,`娱乐`,`体育`]" 
      :key="index"
      @click="handleClick(index)" 
      :class="{active:current===index}">
      {{item}}
      </span>
    </div>
    <div v-if="current === 0">
      <p>文章离婚了跟我们没关系</p>
      <p>文章离婚了跟我们没关系</p>
      <p>文章离婚了跟我们没关系</p>
    </div>
    <div v-if="current === 1">
      <p>文章离婚了</p>
      <p>文章离婚了</p>
      <p>文章离婚了</p>
    </div>
    <div v-if="current === 2">
      <p>国足居然进球了</p>
      <p>国足居然进球了</p>
      <p>国足居然进球了</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      current:0
    }
  },
  methods:{
    handleClick(index){
      this.current=index
    }
  }
};
</script>
<style lang="less" scoped>
  .active{
    color:red;
    border-color:red;
  }
  .content{
    margin: 50px 300px;
  }
  .ctrl{
    margin:20px 0;
  }
  .ctrl span{
    cursor:pointer;
    margin:10px;
    padding:5px;
    border:1px solid #ddd;

  }
</style>

