<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
                departCity:'',
                departCode:'',
                destCity:'',
                destCode:'',
                departDate:''
            },
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$alert("展示不支持往返","温馨提示",{type:"warning"})
            }
        },
        
        // 出发城市输入值的时候触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, cb){
           if(!value){
               cb([]);
               return
           }

           // 获取城市列表
           this.$axios({
               url:'/airs/city',
               params:{
                  name:value
                   }
           }).then(res=>{
               console.log(res)
            const {data} = res.data
            // 给每一个对象添加一个value属性
            const newData = [];
            data.forEach(v => {
                v.value = v.name.replace('市','')
                newData.push(v)
                // console.log(newData)
            })  
            // 1设置第一个城市为默认值
            this.form.departCity = newData[0].value
            this.form.departCode = newData[0].sort

            cb(newData)       
           })
        },

        // 目标城市输入值的时候触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            if(!value){
               cb([])
               return
           }

           // 获取城市列表
           this.$axios({
               url:'/airs/city',
               params:{
                   name:value
                   }
           }).then(res=>{
               console.log(res)
            const {data} = res.data
            // 给每一个对象添加一个value属性
            const newData = []
            data.forEach(v => {
                v.value = v.name.replace('市','')
                newData.push(v)
                // console.log(newData)

            })  
             // 设置第一个城市为默认值
            this.form.destCity = newData[0].value
            this.form.destCode = newData[0].sort
            
            cb(newData)       
           })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // console.log(item)
            // 赋值给出发城市
            this.form.departCity = item.value
            // 赋值给出发城市代码
            this.form.departCode = item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value
            this.form.destCode = item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
        //    console.log(moment(value).format('YYYY-MM-DD'))
            this.form.departDate = moment(value).format('YYYY-MM-DD')
        },

        // 出发和目标城市切换时触发
        handleReverse(){
            // 解构出四个属性
            const {departCity,departCode,destCity,destCode} = this.form
            // 进行赋值
            this.form.departCity = destCity
            this.form.departCode = destCode
            this.form.destCity = departCity
            this.form.destCode = departCode
        },

        // 提交表单时触发
        handleSubmit(){
        //    console.log(this.form)
           // 自定义表单验证
           if(!this.form.departCity){
               this.$alert('出发城市不能为空','提示',
               {type:'warning'})
               return
           }
           if(!this.form.destCity){
               this.$alert('到达城市不能为空','提示',
               {type:'warning'})
               return
           }
           if(!this.form.departDate){
               this.$alert('出发时间不能为空','提示',
               {type:'warning'})
               return
           }
           // 跳转到机票列表页
           this.$router.push({
               // 路径
               path:'/air/flights',
               // 参数
               query:this.form
        })
            // 思路:先将store中的数据提取出来,将搜索框的数据添加到其中,再将新的数据存储到store中
            const arr = [...this.$store.state.air.history]
            // unshift 前添加      为了新的记录添加到第一个
            arr.unshift(this.form)

            // 当历史记录超过5个时,删除第六个
            if(arr.length>5){
                arr.length = 5
            }

            this.$store.commit('air/setHistory', arr)
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
