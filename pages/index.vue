<template>
  <div class="container">
        <!-- 幻灯片 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
                <div class="banner-image" 
                :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;
                `">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  data(){
    return{
      banners:[]
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners'
    }).then(res=>{
      // this.banners=res.data.data
      // 解构赋值
      const {data} = res.data
      this.banners = data
    })
  }
}
</script>

<style scoped lang="less">

/deep/.el-carousel__container{
  height: 700px;
}
.banner-image{
    height: 700px;
  }
</style>
