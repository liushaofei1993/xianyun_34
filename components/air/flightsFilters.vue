<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 声明组件可以接受哪些属性
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小

      // 自定义机型大小数据列表
      airSizeList:[
        {label:"大",value:"L"},
        {label:"中",value:"M"},
        {label:"小",value:"S"}
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
       // 用数组的 filter 方法过滤出符合选择条件的数据组成新数组
      const arr = this.data.flights.filter(v=>{
        return v.org_airport_name === value   // 若v.airline_name = value为真,则将this.data.flights中符合条件的对象过滤出添加到arr中
      })
        // console.log(arr)
        // 然后调用传到本组件中的父组件中的setListData方法修改列表数据
        this.$emit("setListData", arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // value = "6,12"  结构赋值数组
      const [from,to] = value.split(",")
       // 用数组的 filter 方法过滤出符合选择条件的数据组成新数组
      const arr = this.data.flights.filter(v=>{
        // 获取选择条件中的时的数值
        const start = v.dep_time.split(":")[0]
        // + 符号是将字符串强行转换成数字再进行比较判断
        return +start >= +from && +start < +to
        // 若 start >= from && start <to 为真,则将this.data.flights中符合条件的对象过滤出添加到arr中
      })
        // console.log(arr)
        // 然后调用传到本组件中的父组件中的setListData方法修改列表数据
        this.$emit("setListData", arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // 用数组的 filter 方法过滤出符合选择条件的数据组成新数组
      const arr = this.data.flights.filter(v=>{
        return v.airline_name === value   // 若v.airline_name = value为真,则将this.data.flights中符合条件的对象过滤出添加到arr中
      })
        // console.log(arr)
        // 然后调用传到本组件中的父组件中的setListData方法修改列表数据
        this.$emit("setListData", arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
       // 用数组的 filter 方法过滤出符合选择条件的数据组成新数组
      const arr = this.data.flights.filter(v=>{
        return v.plane_size === value   // 若v.airline_name = value为真,则将this.data.flights中符合条件的对象过滤出添加到arr中
      })
        // console.log(arr)
        // 然后调用传到本组件中的父组件中的setListData方法修改列表数据
        this.$emit("setListData", arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      // 恢复条件选项
      this.airport = ""
      this.flightTimes =""
      this.company = ""
      this.airSize = ""

      // 恢复列表数据
      this.$emit("setListData",this.data.flights)
    }
  },
  mounted(){
    // console.log(this.data)
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>