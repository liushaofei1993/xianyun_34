<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setListData ="setListData"/>
                              <!-- 上面这个是缓存的大数据,一旦赋值将不能修改,可解决修改过滤数据时flightsData被arr覆盖的问题 -->
        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in listData" :key="index" :data="item" />
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from '@/components/air/flightsFilters'

import moment from "moment";

export default {
  data() {
    return {
      // 从后台返回的最大的数据
      flightsData: {
        // 为了实现向过滤组件的传值,需要为对象添加属性和默认值
        info:{},
        options:{}

      },
      // 先定义一个变量准备存储拆分大数据后的每页列表
      listData: [],

      pageIndex: 1,
      pageSize: 4,
      total: 0,

      // 提前缓存一份大的数据
      cacheFlightsData:{
        info:{},
        options:{}
      }
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  methods: {
    // 设置数据库listData
    setListData(arr) {
      // 添加子组件flightsFilters的需求操作: 修改列表数据flightsData.flights
      if(arr){
        this.pageIndex = 1
        this.flightsData.flights = arr
        this.total = arr.length
      }

      // 获取截取大数据时需要的参数
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      // 截取当前页面的数据后赋值给当前页面的数据库listData
      this.listData = this.flightsData.flights.slice(start, end);
    },

    handleSizeChange(value) {
      // 修改分页条数时触发
      this.pageSize = value;

      // 获取分页数据
      this.setListData();
    },
    handleCurrentChange(value) {
      // 修改页数时触发
      this.pageIndex = value;

      // 获取分页数据
      this.setListData();
    }
  },
  mounted() {
    // console.log(this.$route)
    this.$axios({
      url: "airs",
      params: this.$route.query // 获取IP地址中的参数
    }).then(res => {
      console.log(res.data);
      // 保存总的大数据
      this.flightsData = res.data;

      // 另外缓存一份总的大数据,赋值之后将不能被修改
      this.cacheFlightsData = {...res.data}

      // 总和赋值
      this.total = this.flightsData.flights.length;
      // 切割出当前页面需要的数据
       this.setListData()
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>