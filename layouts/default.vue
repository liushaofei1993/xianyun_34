<template>
  <div>
    <Header />
    <!-- 组件占位符,相当于router-view -->
    <nuxt />
    <Footer/>
  </div>
</template>

<script>
// 引入组件
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  // 注册组件
  components:{
    Header,
    Footer
  }
}
</script>

<style>
/* 公共样式,不要加scoped */
*{
  margin:0;
  padding:0;
}
ul,li,ol{
  list-style:none;
}
a{
  color:inherit;
  text-decoration:none;
}
em,i{
  font-style:none;
}
</style>
